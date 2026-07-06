let currentSubject = null;
let quizData = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
const questionCache = {};
const answeredQuestions = new Set();

// Mapa de nombres de asignaturas para mostrar
const SUBJECT_NAMES = {
    'herramientasdevops': 'Herramientas DevOps',
    'gestionproyectos': 'Gestión de Proyectos',
    'integracionentrega': 'Integración y Entrega Continua',
    'contenedores': 'Contenedores'
};

// Función para cargar preguntas dinámicamente con validación
async function loadQuestions(subject) {
    if (questionCache[subject]) {
        return questionCache[subject];
    }
    
    try {
        const response = await fetch(`data/${subject}.json`);
        if (!response.ok) throw new Error('Error cargando preguntas');
        const questions = await response.json();
        
        const validQuestions = questions.filter(q => {
            const isValid = q.options && q.answer && q.options.includes(q.answer);
            if (!isValid) {
                console.warn(`⚠️ Pregunta inválida descartada (answer no está en options): "${q.question}"`);
            }
            return isValid;
        });
        
        if (validQuestions.length === 0) {
            throw new Error('No hay preguntas válidas en este archivo');
        }
        
        if (validQuestions.length < questions.length) {
            console.warn(`⚠️ Se descartaron ${questions.length - validQuestions.length} preguntas inválidas de ${subject}`);
        }
        
        questionCache[subject] = validQuestions;
        return validQuestions;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function selectSubject(subject) {
    currentSubject = subject;
    
    let numQuestions, mode, allQuestions, quizTitle;
    
    try {
        allQuestions = await loadQuestions(subject);
    } catch (error) {
        alert('Error cargando las preguntas. Por favor, inténtalo de nuevo.');
        return;
    }
    
    const numInput = document.getElementById(`num-questions-${subject}`);
    const modeSelect = document.getElementById(`quiz-mode-${subject}`);
    
    numQuestions = numInput ? parseInt(numInput.value) : 10;
    mode = modeSelect ? modeSelect.value : 'normal';
    quizTitle = SUBJECT_NAMES[subject] || subject;
    
    if (mode === 'cortas') {
        startShortAnswerMode(subject);
        return;
    }
    
    if (mode === 'tema') {
        const temaSelect = document.getElementById(`tema-select-${subject}`);
        if (temaSelect && temaSelect.value) {
            const selectedTema = temaSelect.value;
            allQuestions = allQuestions.filter(q => q.tema.startsWith(selectedTema + ':') || q.tema.startsWith(selectedTema + '.'));
            if (allQuestions.length === 0) {
                alert('No hay preguntas para este tema');
                return;
            }
        }
    }
    
    quizData = allQuestions.sort(() => Math.random() - 0.5).slice(0, Math.min(numQuestions, allQuestions.length));
    
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

function backToSubjects() {
    document.getElementById('subject-selector').classList.remove('hidden');
    document.getElementById('main-quiz-content').classList.add('hidden');
    document.getElementById('short-answer-content').classList.add('hidden');
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
    answeredQuestions.clear();
    
    document.getElementById('result-container').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    document.getElementById('navigation-controls').classList.remove('hidden');
    
    displayQuestion();
}

function displayQuestion() {
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
    
    const questionKey = `${currentQuestionIndex}_${question.question}`;
    if (!answeredQuestions.has(questionKey)) {
        answeredQuestions.add(questionKey);
    }
    
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
                <p class="text-xs text-blue-600 mt-2 font-medium">📘 ${question.tema}</p>
                <div id="detail-btn-${currentQuestionIndex}" class="mt-3"></div>
            </div>
        </div>
    `;
    feedbackDiv.classList.add('show');
    
    // Agregar botón profundizar si existe
    if (question.detailedExplanation) {
        const container = document.getElementById(`detail-btn-${currentQuestionIndex}`);
        if (container) {
            const btn = document.createElement('button');
            btn.className = 'text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 font-medium';
            btn.textContent = '📖 Profundizar';
            const detail = document.createElement('div');
            detail.className = 'hidden mt-3 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-400 text-sm text-gray-700 whitespace-pre-line';
            detail.textContent = question.detailedExplanation;
            btn.addEventListener('click', () => {
                detail.classList.toggle('hidden');
                btn.textContent = detail.classList.contains('hidden') ? '📖 Profundizar' : '📖 Ocultar detalle';
            });
            container.appendChild(btn);
            container.appendChild(detail);
        }
    }
    
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
    
    // Mostrar resumen de errores
    const errors = quizData.filter((q, i) => userAnswers[i] !== q.answer);
    if (errors.length > 0) {
        const errorsHtml = errors.map((q) => {
            const idx = quizData.indexOf(q);
            const userAnswer = userAnswers[idx];
            return `
                <div class="mb-3 p-3 border-l-4 border-red-400 bg-red-50 rounded-r-lg text-left cursor-pointer hover:bg-red-100" onclick="goToQuestion(${idx})">
                    <p class="font-semibold text-gray-900 text-sm">${q.question}</p>
                    <p class="text-xs text-red-600 mt-1">❌ Tu respuesta: ${userAnswer}</p>
                    <p class="text-xs text-green-600">✅ Correcta: ${q.answer}</p>
                    <p class="text-xs text-blue-500 mt-1">Clic para revisar →</p>
                </div>
            `;
        }).join('');
        
        document.getElementById('stats-by-tema').innerHTML += `
            <div class="mt-4">
                <button onclick="document.getElementById('errors-detail').classList.toggle('hidden')" class="w-full bg-red-100 text-red-700 font-semibold py-2 px-4 rounded-lg hover:bg-red-200">
                    📋 Revisar errores (${errors.length})
                </button>
                <div id="errors-detail" class="hidden mt-4">
                    ${errorsHtml}
                </div>
            </div>
        `;
    }
}

function restartGame() {
    startQuiz();
}

function goToQuestion(index) {
    currentQuestionIndex = index;
    document.getElementById('result-container').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    document.getElementById('navigation-controls').classList.remove('hidden');
    displayQuestion();
}

// === Modo Respuestas Cortas ===
let shortData = [];
let shortIndex = 0;

async function startShortAnswerMode(subject) {
    try {
        const response = await fetch(`data/${subject}-cortas.json`);
        if (!response.ok) throw new Error('No hay preguntas cortas');
        shortData = await response.json();
        shortData.sort(() => Math.random() - 0.5);
    } catch (error) {
        alert('No hay preguntas de respuesta corta disponibles para esta asignatura.');
        return;
    }
    
    shortIndex = 0;
    document.getElementById('subject-selector').classList.add('hidden');
    document.getElementById('short-answer-content').classList.remove('hidden');
    renderShortQuestion();
}

function renderShortQuestion() {
    const q = shortData[shortIndex];
    document.getElementById('short-question').textContent = q.q;
    document.getElementById('short-ext').textContent = `Extensión: ${q.ext}`;
    document.getElementById('short-progress').textContent = `Pregunta ${shortIndex + 1} de ${shortData.length}`;
    document.getElementById('short-progress-bar').style.width = ((shortIndex + 1) / shortData.length * 100) + '%';
    document.getElementById('short-answer-input').value = '';
    document.getElementById('short-answer-ref').classList.add('hidden');
    document.getElementById('short-answer-body').innerHTML = q.a;
    document.getElementById('short-prev-btn').disabled = shortIndex === 0;
    document.getElementById('short-next-btn').textContent = shortIndex === shortData.length - 1 ? 'Finalizar' : 'Siguiente';
}

function showShortAnswer() {
    document.getElementById('short-answer-ref').classList.toggle('hidden');
}

function nextShortQuestion() {
    if (shortIndex < shortData.length - 1) {
        shortIndex++;
        renderShortQuestion();
    } else {
        backToSubjects();
    }
}

function prevShortQuestion() {
    if (shortIndex > 0) {
        shortIndex--;
        renderShortQuestion();
    }
}

// Cargar conteo de preguntas y temas al inicio
(async function loadQuestionCounts() {
    const subjects = ['herramientasdevops', 'gestionproyectos', 'integracionentrega', 'contenedores'];
    
    for (const subject of subjects) {
        try {
            const questions = await loadQuestions(subject);
            
            const countEl = document.getElementById(`question-count-${subject}`);
            if (countEl) {
                countEl.textContent = `${questions.length} preguntas disponibles`;
            }
            
            const numInput = document.getElementById(`num-questions-${subject}`);
            if (numInput) {
                numInput.max = questions.length;
                if (parseInt(numInput.value) > questions.length) {
                    numInput.value = questions.length;
                }
            }
            
            const temaSelect = document.getElementById(`tema-select-${subject}`);
            if (temaSelect && temaSelect.options.length === 0) {
                const temas = [...new Set(questions.map(q => q.tema))].sort();
                temas.forEach(tema => {
                    const option = document.createElement('option');
                    option.value = tema;
                    option.textContent = tema;
                    temaSelect.appendChild(option);
                });
            }
        } catch (error) {
            const countEl = document.getElementById(`question-count-${subject}`);
            if (countEl) countEl.textContent = 'Error cargando preguntas';
        }
    }
})();
