// Registrar Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}

let currentSubject = null;
let quizData = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let questionStartTime = null;
const questionCache = {};

// --- localStorage helpers ---
function getStats() {
  return JSON.parse(localStorage.getItem('quiz_stats') || '{"totalQuestions":0,"correctAnswers":0,"bySubject":{},"byTema":{},"byDate":{}}');
}
function saveStats(stats) {
  localStorage.setItem('quiz_stats', JSON.stringify(stats));
}

async function loadQuestions(subject) {
  if (questionCache[subject]) return questionCache[subject];
  const response = await fetch(`data/${subject}.json`);
  if (!response.ok) throw new Error('Error cargando preguntas');
  const questions = await response.json();
  questionCache[subject] = questions;
  return questions;
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

  if (subject === 'secdevops') {
    numQuestions = parseInt(document.getElementById('num-questions').value);
    mode = document.getElementById('quiz-mode').value;
    quizTitle = 'SecDevOps y Administración de Redes';
    if (mode === 'tema') {
      const selectedTema = document.getElementById('tema-select').value;
      allQuestions = allQuestions.filter(q => q.tema.includes(selectedTema));
    }
  } else if (subject === 'adminsistemas') {
    numQuestions = parseInt(document.getElementById('num-questions-admin').value);
    mode = document.getElementById('quiz-mode-admin').value;
    quizTitle = 'Administración de Sistemas Cloud';
    if (mode === 'tema') {
      const selectedTema = document.getElementById('tema-select-admin').value;
      allQuestions = allQuestions.filter(q => q.tema.includes(selectedTema));
    }
  } else if (subject === 'clouddevops') {
    numQuestions = parseInt(document.getElementById('num-questions-cloud').value);
    mode = document.getElementById('quiz-mode-cloud').value;
    quizTitle = 'Cloud Computing, DevOps y Cultura DevOps';
    if (mode === 'tema') {
      const selectedTema = document.getElementById('tema-select-cloud').value;
      allQuestions = allQuestions.filter(q => q.tema.includes(selectedTema));
    }
  } else if (subject === 'herramientasdevops') {
    numQuestions = parseInt(document.getElementById('num-questions-herramientas').value);
    mode = document.getElementById('quiz-mode-herramientas').value;
    quizTitle = 'Herramientas DevOps';
    if (mode === 'tema') {
      const selectedTema = document.getElementById('tema-select-herramientas').value;
      allQuestions = allQuestions.filter(q => q.tema.includes(selectedTema));
    }
  } else if (subject === 'automatizacion') {
    numQuestions = parseInt(document.getElementById('num-questions-automatizacion').value);
    mode = document.getElementById('quiz-mode-automatizacion').value;
    quizTitle = 'Herramientas de Automatización de Despliegues';
    if (mode === 'tema') {
      const selectedTema = document.getElementById('tema-select-automatizacion').value;
      allQuestions = allQuestions.filter(q => q.topic && q.topic.includes(selectedTema));
    }
  }

  if (allQuestions.length === 0) {
    alert('No hay preguntas para este tema');
    return;
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

function saveQuestionResult(question, userAnswer, isCorrect) {
  const stats = getStats();
  const date = new Date().toISOString().split('T')[0];
  const timeSpent = questionStartTime ? Math.round((Date.now() - questionStartTime) / 1000) : 0;

  stats.totalQuestions++;
  if (isCorrect) stats.correctAnswers++;

  if (!stats.bySubject[currentSubject]) stats.bySubject[currentSubject] = { total: 0, correct: 0 };
  stats.bySubject[currentSubject].total++;
  if (isCorrect) stats.bySubject[currentSubject].correct++;

  if (!stats.byTema[question.tema]) stats.byTema[question.tema] = { total: 0, correct: 0 };
  stats.byTema[question.tema].total++;
  if (isCorrect) stats.byTema[question.tema].correct++;

  if (!stats.byDate[date]) stats.byDate[date] = { total: 0, correct: 0 };
  stats.byDate[date].total++;
  if (isCorrect) stats.byDate[date].correct++;

  saveStats(stats);
}

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
          <button class="option-btn w-full text-left p-4 border-2 rounded-lg transition-all bg-white text-gray-900 border-gray-300 ${selectedAnswer === option ? 'selected' : ''}"
            data-option-index="${index}" ${hasAnswered ? 'disabled' : ''}>
            ${String.fromCharCode(65 + index)}. ${option}
          </button>
        `).join('')}
      </div>
      <div id="feedback-${currentQuestionIndex}" class="feedback mt-4 p-4 rounded-lg bg-blue-50"></div>
    </div>
  `;

  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      if (!this.disabled) selectOption(parseInt(this.dataset.optionIndex));
    });
  });

  updateNavigationButtons();
  if (hasAnswered) showFeedback();
}

function selectOption(optionIndex) {
  const buttons = document.querySelectorAll('.option-btn');
  if (buttons[0]?.disabled) return;
  userAnswers[currentQuestionIndex] = quizData[currentQuestionIndex].options[optionIndex];
  buttons.forEach(btn => btn.classList.remove('selected'));
  buttons[optionIndex].classList.add('selected');
  document.getElementById('check-btn').disabled = false;
}

function checkAnswer() {
  if (userAnswers[currentQuestionIndex] === null) { alert('Por favor selecciona una respuesta'); return; }
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
        <p class="font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'} mb-2">${isCorrect ? '¡Correcto!' : 'Incorrecto'}</p>
        ${!isCorrect ? `<p class="mb-2"><strong>Respuesta correcta:</strong> ${question.answer}</p>` : ''}
        <p class="text-sm text-gray-700">${question.explanation}</p>
      </div>
    </div>
  `;
  feedbackDiv.classList.add('show');

  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.disabled = true;
    const btnText = btn.textContent.substring(3).trim();
    if (btnText === question.answer) btn.classList.add('correct');
    else if (btnText === userAnswer && !isCorrect) btn.classList.add('incorrect');
  });
  document.getElementById('check-btn').disabled = true;
}

function nextQuestion() {
  if (currentQuestionIndex < quizData.length - 1) { currentQuestionIndex++; displayQuestion(); }
  else showResults();
}

function prevQuestion() {
  if (currentQuestionIndex > 0) { currentQuestionIndex--; displayQuestion(); }
}

function updateNavigationButtons() {
  document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
  const hasAnswered = userAnswers[currentQuestionIndex] !== null;
  document.getElementById('check-btn').disabled = !hasAnswered;
  const isLast = currentQuestionIndex === quizData.length - 1;
  document.getElementById('next-btn').textContent = isLast && hasAnswered ? 'Ver Resultados' : 'Siguiente';
  document.getElementById('next-btn').disabled = !hasAnswered;
}

function showResults() {
  score = userAnswers.reduce((acc, answer, i) => acc + (answer === quizData[i].answer ? 1 : 0), 0);
  const percentage = Math.round((score / quizData.length) * 100);

  const statsByTema = {};
  quizData.forEach((q, i) => {
    if (!statsByTema[q.tema]) statsByTema[q.tema] = { correct: 0, total: 0 };
    statsByTema[q.tema].total++;
    if (userAnswers[i] === q.answer) statsByTema[q.tema].correct++;
  });

  document.getElementById('quiz-container').classList.add('hidden');
  document.getElementById('navigation-controls').classList.add('hidden');
  document.getElementById('result-container').classList.remove('hidden');
  document.getElementById('score-percentage').textContent = `${percentage}%`;
  document.getElementById('result-details').textContent = `Has acertado ${score} de ${quizData.length} preguntas`;
  document.getElementById('result-message').textContent =
    percentage >= 90 ? '¡Excelente! 🎉' : percentage >= 70 ? '¡Muy bien! 👏' : percentage >= 50 ? 'Bien, pero puedes mejorar 📚' : 'Necesitas repasar más 📖';

  document.getElementById('stats-by-tema').innerHTML = `
    <div class="bg-gray-50 p-4 rounded-lg">
      <h3 class="font-bold mb-3 text-center">Rendimiento por Tema</h3>
      ${Object.entries(statsByTema).map(([tema, s]) => {
        const pct = Math.round((s.correct / s.total) * 100);
        const color = pct >= 70 ? 'green' : pct >= 50 ? 'orange' : 'red';
        return `<div class="mb-2 text-left">
          <div class="flex justify-between mb-1">
            <span class="text-sm font-medium">${tema}</span>
            <span class="text-sm font-bold" style="color:${color}">${s.correct}/${s.total} (${pct}%)</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="h-2 rounded-full" style="width:${pct}%;background-color:${color}"></div>
          </div>
        </div>`;
      }).join('')}
    </div>
  `;
}

function restartGame() { startQuiz(); }

function viewHistory() {
  const stats = getStats();
  const subjectNames = {
    secdevops: 'SecDevOps', adminsistemas: 'Admin Sistemas',
    clouddevops: 'Cloud DevOps', herramientasdevops: 'Herramientas DevOps', automatizacion: 'Automatización'
  };
  const accuracy = stats.totalQuestions ? Math.round(stats.correctAnswers / stats.totalQuestions * 100) : 0;

  const temaRows = Object.entries(stats.byTema).sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total)).map(([tema, d]) => {
    const pct = Math.round(d.correct / d.total * 100);
    const color = pct >= 70 ? '#22c55e' : pct >= 50 ? '#f97316' : '#ef4444';
    return `<div class="mb-2 p-2 border rounded">
      <div class="flex justify-between text-sm"><span>${tema}</span><span style="color:${color};font-weight:bold">${d.correct}/${d.total} (${pct}%)</span></div>
      <div class="w-full bg-gray-200 rounded h-1.5 mt-1"><div class="h-1.5 rounded" style="width:${pct}%;background-color:${color}"></div></div>
    </div>`;
  }).join('');

  document.getElementById('history-content').innerHTML = `
    <div class="grid grid-cols-3 gap-3 mb-4 text-center">
      <div class="bg-blue-50 p-3 rounded-lg"><p class="text-xs text-gray-500">Total</p><p class="text-2xl font-bold text-blue-600">${stats.totalQuestions}</p></div>
      <div class="bg-green-50 p-3 rounded-lg"><p class="text-xs text-gray-500">Precisión</p><p class="text-2xl font-bold text-green-600">${accuracy}%</p></div>
      <div class="bg-red-50 p-3 rounded-lg"><p class="text-xs text-gray-500">Errores</p><p class="text-2xl font-bold text-red-600">${stats.totalQuestions - stats.correctAnswers}</p></div>
    </div>
    <h3 class="font-bold mb-2">Rendimiento por Tema (peor primero)</h3>
    ${temaRows || '<p class="text-gray-500 text-sm">Sin datos aún</p>'}
    <div class="mt-4 text-center">
      <button onclick="clearHistory()" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm">🗑️ Limpiar estadísticas</button>
    </div>
  `;
  document.getElementById('history-modal').classList.remove('hidden');
}

function clearHistory() {
  if (confirm('¿Eliminar todas las estadísticas?')) {
    localStorage.removeItem('quiz_stats');
    closeHistory();
  }
}

function closeHistory() { document.getElementById('history-modal').classList.add('hidden'); }

function viewStats() { viewHistory(); }
function closeStats() { document.getElementById('stats-modal').classList.add('hidden'); }

// --- Práctica de Scripts ---
let scriptsData = [];
let scriptActualIndex = 0;

async function startScriptPractice() {
  const tipo = document.getElementById('script-tipo').value;
  try {
    const res = await fetch('data/scripts.json');
    const todos = await res.json();
    scriptsData = (tipo === 'todos' ? todos : todos.filter(s => s.tipo === tipo)).sort(() => Math.random() - 0.5);
    scriptActualIndex = 0;
    mostrarScript();
  } catch (e) { alert('Error cargando ejercicios de scripts'); }
}

function mostrarScript() {
  const s = scriptsData[scriptActualIndex];
  const badge = document.getElementById('script-tipo-badge');
  badge.textContent = s.tipo === 'bash' ? 'BASH' : 'POWERSHELL';
  badge.style.backgroundColor = s.tipo === 'bash' ? '#0d9488' : '#2563eb';
  document.getElementById('script-contador').textContent = `Ejercicio ${scriptActualIndex + 1} de ${scriptsData.length}`;
  document.getElementById('script-titulo').textContent = s.titulo;
  document.getElementById('script-enunciado').textContent = s.enunciado;
  document.getElementById('script-respuesta').value = '';
  document.getElementById('script-solucion').classList.add('hidden');
  document.getElementById('btn-ver-solucion').disabled = false;
  document.getElementById('script-modal').classList.remove('hidden');
}

function verSolucionScript() {
  const s = scriptsData[scriptActualIndex];
  const div = document.getElementById('script-solucion');
  div.classList.remove('hidden');
  div.querySelector('pre').textContent = s.solucion;
  document.getElementById('script-puntos').innerHTML = s.puntos_clave.map(p => `<li>• ${p}</li>`).join('');
  document.getElementById('btn-ver-solucion').disabled = true;
}

function siguienteScript() {
  scriptActualIndex = (scriptActualIndex + 1) % scriptsData.length;
  mostrarScript();
}

function closeScriptModal() { document.getElementById('script-modal').classList.add('hidden'); }

// Mostrar/ocultar selector de tema
document.addEventListener('DOMContentLoaded', () => {
  [
    ['quiz-mode', 'tema-selector'],
    ['quiz-mode-admin', 'tema-selector-admin'],
    ['quiz-mode-cloud', 'tema-selector-cloud'],
    ['quiz-mode-herramientas', 'tema-selector-herramientas'],
    ['quiz-mode-automatizacion', 'tema-selector-automatizacion'],
  ].forEach(([modeId, selectorId]) => {
    const mode = document.getElementById(modeId);
    const sel = document.getElementById(selectorId);
    if (mode && sel) mode.addEventListener('change', e => sel.classList.toggle('hidden', e.target.value !== 'tema'));
  });
});
