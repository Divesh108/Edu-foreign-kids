document.addEventListener('DOMContentLoaded', function() {
    const englishBtn = document.getElementById('english-btn');
    const mathBtn = document.getElementById('math-btn');
    const contentArea = document.getElementById('content-area');
    const quizContainer = document.getElementById('quiz-container');
    const quizQuestion = document.getElementById('quiz-question');
    const optionsContainer = document.getElementById('options');
    const nextBtn = document.getElementById('next-btn');
    const feedback = document.getElementById('feedback');

    let currentSubject = null;
    let currentQuestionIndex = 0;
    let score = 0;

    // English lessons data
    const englishLessons = [
        {
            type: 'vocabulary',
            word: 'Apple',
            image: 'https://via.placeholder.com/150?text=Apple',
            translation: 'Manzana'
        },
        {
            type: 'vocabulary',
            word: 'Dog',
            image: 'https://via.placeholder.com/150?text=Dog',
            translation: 'Perro'
        },
        {
            type: 'vocabulary',
            word: 'House',
            image: 'https://via.placeholder.com/150?text=House',
            translation: 'Casa'
        }
    ];

    // Math questions data
    const mathQuestions = [
        {
            question: "What is 2 + 3?",
            options: ["4", "5", "6", "7"],
            answer: "5"
        },
        {
            question: "How much is 4 - 1?",
            options: ["1", "2", "3", "4"],
            answer: "3"
        },
        {
            question: "Count the apples: 🍎🍎🍎",
            options: ["1", "2", "3", "4"],
            answer: "3"
        }
    ];

    // Event listeners for subject buttons
    englishBtn.addEventListener('click', () => {
        currentSubject = 'english';
        showEnglishLesson();
    });

    mathBtn.addEventListener('click', () => {
        currentSubject = 'math';
        startMathQuiz();
    });

    // Show English vocabulary lesson
    function showEnglishLesson() {
        contentArea.innerHTML = '';
        quizContainer.classList.add('hidden');

        const lesson = englishLessons[currentQuestionIndex % englishLessons.length];
        
        const lessonHTML = `
            <h2>English Vocabulary</h2>
            <div class="vocabulary-word">${lesson.word}</div>
            <img src="${lesson.image}" alt="${lesson.word}" class="lesson-image">
            <p>Translation: ${lesson.translation}</p>
            <button id="practice-english">Practice</button>
        `;
        
        contentArea.innerHTML = lessonHTML;
        
        document.getElementById('practice-english').addEventListener('click', startEnglishQuiz);
    }

    // Start English quiz
    function startEnglishQuiz() {
        const lesson = englishLessons[currentQuestionIndex % englishLessons.length];
        
        quizQuestion.textContent = `What is this word in English? (${lesson.translation})`;
        optionsContainer.innerHTML = '';
        
        // Generate options (correct answer + random other words)
        const options = [lesson.word];
        while (options.length < 4) {
            const randomWord = englishLessons[Math.floor(Math.random() * englishLessons.length)].word;
            if (!options.includes(randomWord)) {
                options.push(randomWord);
            }
        }
        
        // Shuffle options
        options.sort(() => Math.random() - 0.5);
        
        // Create option buttons
        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            button.addEventListener('click', () => checkAnswer(option, lesson.word));
            optionsContainer.appendChild(button);
        });
        
        contentArea.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        nextBtn.classList.add('hidden');
        feedback.textContent = '';
    }

    // Start Math quiz
    function startMathQuiz() {
        contentArea.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        nextBtn.classList.add('hidden');
        feedback.textContent = '';
        
        const question = mathQuestions[currentQuestionIndex % mathQuestions.length];
        quizQuestion.textContent = question.question;
        optionsContainer.innerHTML = '';
        
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            button.addEventListener('click', () => checkAnswer(option, question.answer));
            optionsContainer.appendChild(button);
        });
    }

    // Check answer
    function checkAnswer(selected, correct) {
        const options = document.querySelectorAll('.option-btn');
        options.forEach(option => {
            option.disabled = true;
            if (option.textContent === correct) {
                option.style.backgroundColor = '#4CAF50';
            } else if (option.textContent === selected && selected !== correct) {
                option.style.backgroundColor = '#f44336';
            }
        });
        
        if (selected === correct) {
            feedback.textContent = 'Correct! 👍';
            feedback.className = 'correct';
            score++;
        } else {
            feedback.textContent = `Incorrect. The correct answer is ${correct}.`;
            feedback.className = 'incorrect';
        }
        
        nextBtn.classList.remove('hidden');
    }

    // Next button event
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        
        if (currentSubject === 'english') {
            showEnglishLesson();
        } else if (currentSubject === 'math') {
            startMathQuiz();
        }
    });
});
