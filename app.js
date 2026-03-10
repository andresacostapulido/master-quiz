let currentUser = null;
let currentSubject = null;
let quizData = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let questionHistory = [];
const questionCache = {}; // Caché para preguntas cargadas

// Función para cargar preguntas dinámicamente
async function loadQuestions(subject) {
    if (questionCache[subject]) {
        return questionCache[subject];
    }
    
    try {
        const response = await fetch(`data/${subject}.json`);
        if (!response.ok) throw new Error('Error cargando preguntas');
        const questions = await response.json();
        questionCache[subject] = questions;
        return questions;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Autenticación Firebase
auth.onAuthStateChanged(user => {
    currentUser = user;
    updateAuthUI();
    if (user) {
        loadQuestionHistory();
    }
});

function updateAuthUI() {
    const userInfo = document.getElementById('user-info');
    if (!userInfo) return;
    
    if (currentUser) {
        const userName = currentUser.displayName || currentUser.email?.split('@')[0] || 'Usuario';
        userInfo.innerHTML = `
            <div class="flex items-center justify-center gap-3">
                <span class="text-sm">👤 ${userName}</span>
                <button onclick="signOut()" class="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Salir</button>
            </div>
        `;
    } else {
        userInfo.innerHTML = `
            <button onclick="signIn()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Iniciar Sesión con Google
            </button>
        `;
    }
}

async function signIn() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
    } catch (error) {
        alert('Error al iniciar sesión: ' + error.message);
    }
}

async function signOut() {
    try {
        await auth.signOut();
    } catch (error) {
        alert('Error al cerrar sesión: ' + error.message);
    }
}

// Theme toggle
const themeToggle = document.getElementById('theme-toggle-btn');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
    });
}

async function selectSubject(subject) {
    if (!currentUser) {
        alert('⚠️ Debes iniciar sesión con Google primero para guardar tu progreso');
        return;
    }
    
    currentSubject = subject;
    
    let numQuestions, mode, allQuestions, quizTitle;
    
    // Cargar preguntas dinámicamente
    try {
        allQuestions = await loadQuestions(subject);
    } catch (error) {
        alert('Error cargando las preguntas. Por favor, inténtalo de nuevo.');
        return;
    }
    
    numQuestions = parseInt(document.getElementById('num-questions-herramientas').value);
    mode = document.getElementById('quiz-mode-herramientas').value;
    quizTitle = 'Herramientas DevOps';
    
    if (mode === 'tema') {
        const selectedTema = document.getElementById('tema-select-herramientas').value;
        allQuestions = allQuestions.filter(q => q.tema.includes(selectedTema));
        if (allQuestions.length === 0) {
            alert('No hay preguntas para este tema');
            return;
        }
    }
    
    quizData = allQuestions.sort(() => Math.random() - 0.5).slice(0, Math.min(numQuestions, allQuestions.length));
    
    // Mezclar opciones de cada pregunta y guardar índice de respuesta correcta
    quizData.forEach(q => {
        const correctAnswer = q.answer;
        q.options = [...q.options].sort(() => Math.random() - 0.5);
        q.correctIndex = q.options.indexOf(correctAnswer);
    });
    
    document.getElementById('quiz-title').textContent = quizTitle;
    document.getElementById('subject-selector').classList.add('hidden');
    document.getElementById('main-quiz-content').classList.remove('hidden');
    
    startQuiz();
}

async function loadQuestionHistory() {
    if (!currentUser) return;
    try {
        const snapshot = await db.ref(`projects/${PROJECT_NAME}/users/${currentUser.uid}/history`).once('value');
        questionHistory = snapshot.val() || [];
    } catch (error) {
        console.error('Error cargando historial:', error);
    }
}

async function saveQuestionResult(question, userAnswer, isCorrect) {
    if (!currentUser) return;
    try {
        const timestamp = Date.now();
        const timeSpent = questionStartTime ? Math.round((timestamp - questionStartTime) / 1000) : 0;
        const date = new Date(timestamp).toISOString().split('T')[0];
        
        await db.ref(`projects/${PROJECT_NAME}/users/${currentUser.uid}/history`).push({
            subject: currentSubject,
            tema: question.tema,
            question: question.question,
            userAnswer,
            correctAnswer: question.answer,
            isCorrect,
            timeSpent,
            timestamp,
            date
        });
        
        // Actualizar estadísticas
        const statsRef = db.ref(`projects/${PROJECT_NAME}/users/${currentUser.uid}/stats`);
        const snapshot = await statsRef.once('value');
        const stats = snapshot.val() || { totalQuestions: 0, correctAnswers: 0, totalTime: 0, byTema: {}, byDate: {}, bySubject: {} };
        
        stats.totalQuestions++;
        if (isCorrect) stats.correctAnswers++;
        stats.totalTime += timeSpent;
        
        // Por tema
        if (!stats.byTema[question.tema]) {
            stats.byTema[question.tema] = { total: 0, correct: 0, totalTime: 0 };
        }
        stats.byTema[question.tema].total++;
        if (isCorrect) stats.byTema[question.tema].correct++;
        stats.byTema[question.tema].totalTime += timeSpent;
        
        // Por fecha (para heatmap)
        if (!stats.byDate) stats.byDate = {};
        if (!stats.byDate[date]) {
            stats.byDate[date] = { total: 0, correct: 0 };
        }
        stats.byDate[date].total++;
        if (isCorrect) stats.byDate[date].correct++;
        
        // Por asignatura
        if (!stats.bySubject) stats.bySubject = {};
        if (!stats.bySubject[currentSubject]) {
            stats.bySubject[currentSubject] = { total: 0, correct: 0, totalTime: 0 };
        }
        stats.bySubject[currentSubject].total++;
        if (isCorrect) stats.bySubject[currentSubject].correct++;
        stats.bySubject[currentSubject].totalTime += timeSpent;
        
        await statsRef.set(stats);
    } catch (error) {
        console.error('Error guardando resultado:', error);
    }
}

let questionStartTime = null;

function backToSubjects() {
    document.getElementById('subject-selector').classList.remove('hidden');
    document.getElementById('main-quiz-content').classList.add('hidden');
    currentSubject = null;
    quizData = [];
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;
}

function startQuiz() {
    currentQuestionIndex = 0;
    userAnswers = new Array(quizData.length).fill(null);
    score = 0;
    
    document.getElementById('result-container').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    document.getElementById('navigation-controls').classList.remove('hidden');
    
    displayQuestion();
}

function displayQuestion() {
    questionStartTime = Date.now();
    
    const question = quizData[currentQuestionIndex];
    const container = document.getElementById('quiz-container');
    
    document.getElementById('question-level').textContent = question.tema;
    document.getElementById('progress-text').textContent = `Pregunta ${currentQuestionIndex + 1} de ${quizData.length}`;
    
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('progress-bar').textContent = `${Math.round(progress)}%`;
    
    const hasAnswered = userAnswers[currentQuestionIndex] !== null;
    const selectedAnswer = userAnswers[currentQuestionIndex];
    
    container.innerHTML = `
        <div class="bg-white p-6 rounded-xl shadow-lg">
            <h3 class="text-xl font-semibold mb-4">${question.question}</h3>
            <div class="space-y-3">
                ${question.options.map((option, index) => `
                    <button 
                        class="option-btn w-full text-left p-4 border-2 rounded-lg transition-all bg-white text-gray-900 border-gray-300 ${selectedAnswer === option ? 'selected' : ''}"
                        data-option-index="${index}"
                        ${hasAnswered ? 'disabled' : ''}
                    >
                        ${String.fromCharCode(65 + index)}. ${option}
                    </button>
                `).join('')}
            </div>
            <div id="feedback-${currentQuestionIndex}" class="feedback mt-4 p-4 rounded-lg bg-blue-50"></div>
        </div>
    `;
    
    // Agregar event listeners
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.disabled) {
                const optionIndex = parseInt(this.dataset.optionIndex);
                selectOption(optionIndex);
            }
        });
    });
    
    updateNavigationButtons();
    
    if (hasAnswered) {
        showFeedback();
    }
}

function selectOption(optionIndex) {
    const buttons = document.querySelectorAll('.option-btn');
    if (buttons[0]?.disabled) return;
    
    const selectedOption = quizData[currentQuestionIndex].options[optionIndex];
    userAnswers[currentQuestionIndex] = selectedOption;
    
    buttons.forEach(btn => btn.classList.remove('selected'));
    buttons[optionIndex].classList.add('selected');
    
    const checkBtn = document.getElementById('check-btn');
    if (checkBtn) checkBtn.disabled = false;
}

function checkAnswer() {
    if (userAnswers[currentQuestionIndex] === null) {
        alert('Por favor selecciona una respuesta');
        return;
    }
    
    showFeedback();
    document.getElementById('next-btn').disabled = false;
}

function showFeedback() {
    const question = quizData[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestionIndex];
    const isCorrect = userAnswer === question.answer;
    
    saveQuestionResult(question, userAnswer, isCorrect);
    
    const feedbackDiv = document.getElementById(`feedback-${currentQuestionIndex}`);
    feedbackDiv.innerHTML = `
        <div class="flex items-start gap-3">
            <i class="fas ${isCorrect ? 'fa-check-circle text-green-600' : 'fa-times-circle text-red-600'} text-2xl"></i>
            <div>
                <p class="font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'} mb-2">
                    ${isCorrect ? '¡Correcto!' : 'Incorrecto'}
                </p>
                ${!isCorrect ? `<p class="mb-2"><strong>Respuesta correcta:</strong> ${question.answer}</p>` : ''}
                <p class="text-sm text-gray-700">${question.explanation}</p>
            </div>
        </div>
    `;
    feedbackDiv.classList.add('show');
    
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        const btnText = btn.textContent.substring(3).trim();
        if (btnText === question.answer) {
            btn.classList.add('correct');
        } else if (btnText === userAnswer && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    document.getElementById('check-btn').disabled = true;
}

function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        showResults();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function updateNavigationButtons() {
    document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
    
    const hasAnswered = userAnswers[currentQuestionIndex] !== null;
    const checkBtn = document.getElementById('check-btn');
    const nextBtn = document.getElementById('next-btn');
    
    checkBtn.disabled = !hasAnswered;
    
    const isLastQuestion = currentQuestionIndex === quizData.length - 1;
    if (isLastQuestion && hasAnswered) {
        nextBtn.textContent = 'Ver Resultados';
    } else {
        nextBtn.textContent = 'Siguiente';
    }
    nextBtn.disabled = !hasAnswered;
}

function showResults() {
    score = userAnswers.reduce((acc, answer, index) => {
        return acc + (answer === quizData[index].answer ? 1 : 0);
    }, 0);
    
    const percentage = Math.round((score / quizData.length) * 100);
    
    // Calcular estadísticas por tema
    const statsByTema = {};
    quizData.forEach((q, i) => {
        const tema = q.tema;
        if (!statsByTema[tema]) {
            statsByTema[tema] = { correct: 0, total: 0 };
        }
        statsByTema[tema].total++;
        if (userAnswers[i] === q.answer) {
            statsByTema[tema].correct++;
        }
    });
    
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('navigation-controls').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');
    
    document.getElementById('score-percentage').textContent = `${percentage}%`;
    document.getElementById('result-details').textContent = `Has acertado ${score} de ${quizData.length} preguntas`;
    
    let message = '';
    if (percentage >= 90) {
        message = '¡Excelente! 🎉';
    } else if (percentage >= 70) {
        message = '¡Muy bien! 👏';
    } else if (percentage >= 50) {
        message = 'Bien, pero puedes mejorar 📚';
    } else {
        message = 'Necesitas repasar más 📖';
    }
    document.getElementById('result-message').textContent = message;
    
    // Mostrar estadísticas por tema
    const statsHtml = Object.entries(statsByTema).map(([tema, stats]) => {
        const pct = Math.round((stats.correct / stats.total) * 100);
        const color = pct >= 70 ? 'green' : pct >= 50 ? 'orange' : 'red';
        return `
            <div class="mb-2 text-left">
                <div class="flex justify-between mb-1">
                    <span class="text-sm font-medium">${tema}</span>
                    <span class="text-sm font-bold" style="color:${color}">${stats.correct}/${stats.total} (${pct}%)</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="h-2 rounded-full" style="width:${pct}%;background-color:${color}"></div>
                </div>
            </div>
        `;
    }).join('');
    
    document.getElementById('stats-by-tema').innerHTML = `
        <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="font-bold mb-3 text-center">Rendimiento por Tema</h3>
            ${statsHtml}
        </div>
    `;
}

function restartGame() {
    startQuiz();
}

async function viewHistory() {
    if (!currentUser) {
        alert('Debes iniciar sesión para ver el historial');
        return;
    }
    
    try {
        const snapshot = await db.ref(`projects/${PROJECT_NAME}/users/${currentUser.uid}/history`).limitToLast(50).once('value');
        const history = snapshot.val();
        
        if (!history) {
            document.getElementById('history-content').innerHTML = `
                <p class="text-center text-gray-500">No hay historial aún</p>
            `;
        } else {
            const entries = Object.entries(history).reverse();
            const grouped = {};
            
            entries.forEach(([key, entry]) => {
                const tema = entry.tema;
                if (!grouped[tema]) grouped[tema] = [];
                grouped[tema].push(entry);
            });
            
            let html = `
                <div class="mb-4 text-right">
                    <button onclick="clearHistory()" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        <i class="fas fa-trash"></i> Limpiar Historial
                    </button>
                </div>
            `;
            
            Object.entries(grouped).forEach(([tema, items]) => {
                const correct = items.filter(i => i.isCorrect).length;
                const total = items.length;
                const pct = Math.round((correct / total) * 100);
                
                html += `
                    <div class="mb-4 border rounded-lg p-4">
                        <h3 class="font-bold mb-2">${tema}</h3>
                        <p class="text-sm mb-2">Aciertos: ${correct}/${total} (${pct}%)</p>
                        <div class="space-y-2">
                            ${items.slice(0, 5).map(item => `
                                <div class="text-sm p-2 rounded ${item.isCorrect ? 'bg-green-50' : 'bg-red-50'}">
                                    <p class="font-medium">${item.question.substring(0, 80)}...</p>
                                    <p class="text-xs mt-1">
                                        ${item.isCorrect ? '✅' : '❌'} Tu respuesta: ${item.userAnswer.substring(0, 50)}...
                                    </p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            });
            
            document.getElementById('history-content').innerHTML = html;
        }
        
        document.getElementById('history-modal').classList.remove('hidden');
    } catch (error) {
        alert('Error cargando historial: ' + error.message);
    }
}

async function clearHistory() {
    if (!currentUser) return;
    
    if (confirm('¿Seguro que quieres eliminar todo el historial? Esta acción no se puede deshacer.')) {
        try {
            await db.ref(`projects/${PROJECT_NAME}/users/${currentUser.uid}/history`).remove();
            await db.ref(`projects/${PROJECT_NAME}/users/${currentUser.uid}/stats`).remove();
            closeHistory();
            alert('Historial eliminado correctamente');
        } catch (error) {
            alert('Error eliminando historial: ' + error.message);
        }
    }
}

function closeHistory() {
    document.getElementById('history-modal').classList.add('hidden');
}

async function viewStats() {
    if (!currentUser) {
        alert('Debes iniciar sesión para ver estadísticas');
        return;
    }
    
    try {
        const statsSnapshot = await db.ref(`projects/${PROJECT_NAME}/users/${currentUser.uid}/stats`).once('value');
        const historySnapshot = await db.ref(`projects/${PROJECT_NAME}/users/${currentUser.uid}/history`).once('value');
        
        const stats = statsSnapshot.val();
        const history = historySnapshot.val();
        
        if (!stats || stats.totalQuestions === 0) {
            document.getElementById('stats-content').innerHTML = '<p class="text-center text-gray-500">No hay estadísticas aún. Completa algunos quizzes primero.</p>';
        } else {
            const avgTime = Math.round(stats.totalTime / stats.totalQuestions);
            const accuracy = Math.round((stats.correctAnswers / stats.totalQuestions) * 100);
            
            // Estadísticas por asignatura
            const subjectStats = Object.entries(stats.bySubject || {}).map(([subject, data]) => ({
                subject,
                displayName: subject === 'secdevops' ? 'SecDevOps y Administración de Redes' : subject === 'adminsistemas' ? 'Administración de Sistemas Cloud' : subject === 'clouddevops' ? 'Cloud Computing, DevOps y Cultura DevOps' : subject === 'herramientasdevops' ? 'Herramientas DevOps' : subject === 'automatizacion' ? 'Herramientas de Automatización de Despliegues' : subject,
                accuracy: Math.round((data.correct / data.total) * 100),
                total: data.total,
                correct: data.correct,
                avgTime: Math.round(data.totalTime / data.total)
            }));
            
            // Temas más difíciles
            const temaStats = Object.entries(stats.byTema || {}).map(([tema, data]) => ({
                tema,
                accuracy: Math.round((data.correct / data.total) * 100),
                total: data.total,
                correct: data.correct,
                avgTime: Math.round(data.totalTime / data.total)
            })).sort((a, b) => a.accuracy - b.accuracy);
            
            // Curva de aprendizaje (últimos 30 días)
            const learningCurve = [];
            if (history) {
                const entries = Object.values(history).sort((a, b) => a.timestamp - b.timestamp);
                const windowSize = 10;
                for (let i = windowSize; i <= entries.length; i++) {
                    const window = entries.slice(i - windowSize, i);
                    const correct = window.filter(e => e.isCorrect).length;
                    const pct = Math.round((correct / windowSize) * 100);
                    learningCurve.push({ index: i, accuracy: pct });
                }
            }
            
            // Heatmap (últimos 15 días)
            const today = new Date();
            const heatmapData = [];
            for (let i = 14; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);
                const dateStr = date.toISOString().split('T')[0];
                const dayData = stats.byDate?.[dateStr] || { total: 0, correct: 0 };
                heatmapData.push({
                    date: dateStr,
                    day: date.getDate(),
                    month: date.getMonth(),
                    total: dayData.total,
                    accuracy: dayData.total > 0 ? Math.round((dayData.correct / dayData.total) * 100) : 0
                });
            }
            
            // Predicción de aprobación
            let prediction = '';
            let predictionColor = '';
            if (accuracy >= 80) {
                prediction = 'Alta probabilidad de aprobar 🎉';
                predictionColor = 'text-green-600';
            } else if (accuracy >= 60) {
                prediction = 'Probabilidad media - Sigue practicando 💪';
                predictionColor = 'text-orange-600';
            } else {
                prediction = 'Necesitas más práctica 📖';
                predictionColor = 'text-red-600';
            }
            
            let html = `
                <h3 class="font-bold text-xl mb-4">📚 Estadísticas por Asignatura</h3>
                <div class="mb-6 space-y-2">
                    ${subjectStats.map(s => `
                        <div class="p-4 border-2 rounded-lg bg-blue-50 border-blue-200">
                            <div class="flex justify-between mb-2">
                                <span class="font-bold text-lg">${s.displayName}</span>
                                <span class="font-bold text-xl" style="color:${s.accuracy >= 70 ? '#22c55e' : s.accuracy >= 50 ? '#f97316' : '#ef4444'}">${s.accuracy}%</span>
                            </div>
                            <div class="flex justify-between text-sm text-gray-600">
                                <span>📊 ${s.correct}/${s.total} correctas</span>
                                <span>⏱️ ${s.avgTime}s promedio</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div class="bg-blue-50 p-4 rounded-lg text-center">
                        <p class="text-sm text-gray-600">Preguntas Totales</p>
                        <p class="text-3xl font-bold text-blue-600">${stats.totalQuestions}</p>
                    </div>
                    <div class="bg-green-50 p-4 rounded-lg text-center">
                        <p class="text-sm text-gray-600">Precisión Global</p>
                        <p class="text-3xl font-bold text-green-600">${accuracy}%</p>
                        <p class="text-xs text-gray-500 mt-1">${stats.correctAnswers}/${stats.totalQuestions} correctas</p>
                    </div>
                    <div class="bg-purple-50 p-4 rounded-lg text-center">
                        <p class="text-sm text-gray-600">Tiempo Promedio</p>
                        <p class="text-3xl font-bold text-purple-600">${avgTime}s</p>
                        <p class="text-xs text-gray-500 mt-1">por pregunta</p>
                    </div>
                </div>
                
                <div class="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                    <h3 class="font-bold mb-2 text-center text-lg">🎯 Predicción de Aprobación</h3>
                    <p class="text-2xl font-bold text-center ${predictionColor}">${prediction}</p>
                </div>
                
                ${learningCurve.length > 0 ? `
                    <div class="mb-6 p-4 border rounded-lg">
                        <h3 class="font-bold mb-3 text-lg">📈 Curva de Aprendizaje (Últimas ${learningCurve.length} ventanas de 10 preguntas)</h3>
                        <div class="flex items-end justify-between h-40 gap-1">
                            ${learningCurve.map(point => `
                                <div class="flex-1 bg-blue-500 rounded-t" style="height:${point.accuracy}%;min-height:2px" title="${point.accuracy}%"></div>
                            `).join('')}
                        </div>
                        <div class="flex justify-between text-xs text-gray-500 mt-2">
                            <span>Inicio</span>
                            <span>Actual</span>
                        </div>
                    </div>
                ` : ''}
                
                <div class="mb-6 p-4 border rounded-lg">
                    <h3 class="font-bold mb-3 text-lg">🔥 Heatmap de Actividad (Últimos 15 días)</h3>
                    <div class="flex gap-1 justify-center">
                        ${heatmapData.map(day => {
                            let color = '#f3f4f6';
                            if (day.total > 0) {
                                if (day.accuracy >= 80) color = '#22c55e';
                                else if (day.accuracy >= 60) color = '#84cc16';
                                else if (day.accuracy >= 40) color = '#f59e0b';
                                else color = '#ef4444';
                            }
                            return `<div class="w-6 h-6 rounded" style="background-color:${color}" title="${day.date}: ${day.total} preguntas (${day.accuracy}%)"></div>`;
                        }).join('')}
                    </div>
                    <div class="flex justify-center gap-3 text-xs text-gray-500 mt-3">
                        <span>🟩 >80%</span>
                        <span>🟨 60-80%</span>
                        <span>🟧 40-60%</span>
                        <span>🟥 <40%</span>
                        <span>⬜ Sin actividad</span>
                    </div>
                </div>
                
                <div class="mb-6">
                    <h3 class="font-bold mb-3 text-lg">📉 Temas Más Difíciles (Menor % Acierto)</h3>
                    ${temaStats.slice(0, 5).map((t, i) => `
                        <div class="mb-3 p-4 border-2 rounded-lg ${i === 0 ? 'border-red-300 bg-red-50' : 'border-gray-200'}">
                            <div class="flex justify-between mb-2">
                                <span class="text-sm font-bold">${i + 1}. ${t.tema}</span>
                                <span class="text-sm font-bold px-2 py-1 rounded" style="background-color:${t.accuracy >= 70 ? '#dcfce7' : t.accuracy >= 50 ? '#fed7aa' : '#fee2e2'};color:${t.accuracy >= 70 ? '#166534' : t.accuracy >= 50 ? '#9a3412' : '#991b1b'}">
                                    ${t.accuracy}%
                                </span>
                            </div>
                            <div class="flex justify-between text-xs text-gray-600 mb-2">
                                <span>📊 ${t.correct}/${t.total} correctas</span>
                                <span>⏱️ ${t.avgTime}s promedio</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3">
                                <div class="h-3 rounded-full transition-all" style="width:${t.accuracy}%;background-color:${t.accuracy >= 70 ? '#22c55e' : t.accuracy >= 50 ? '#f97316' : '#ef4444'}"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="text-center mt-6">
                    <button onclick="clearHistory()" class="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 font-semibold">
                        <i class="fas fa-trash"></i> Limpiar Todas las Estadísticas
                    </button>
                </div>
            `;
            
            document.getElementById('stats-content').innerHTML = html;
        }
        
        document.getElementById('stats-modal').classList.remove('hidden');
    } catch (error) {
        alert('Error cargando estadísticas: ' + error.message);
    }
}

function closeStats() {
    document.getElementById('stats-modal').classList.add('hidden');
}