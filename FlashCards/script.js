// Array of flashcards containing questions and answers
const flashcards = [
    { question: "What is a closure?", answer: "A closure is a function with access to its outer function's scope, even after the outer function has finished." },
    { question: "What is the purpose of the 'this' keyword?", answer: "'this' refers to the object it belongs to, depending on where it is used." },
    { question: "Explain 'let' vs 'var'", answer: "'let' is block-scoped and 'var' is function-scoped." },
    { question: "What is an arrow function?", answer: "An arrow function is a shorter syntax for function expressions, and it doesn't have its own 'this' context." }
];

// Initialize current card index and answer visibility
let currentCardIndex = 0; // Tracks the index of the current flashcard
let showAnswer = false; // Tracks whether to show the answer


const cardContent = document.getElementById("card-content"); // Element to display card content
const progress = document.getElementById("progress"); // Element to show progress

// Function to update the flashcard content and progress bar
function updateFlashcard() {
    const currentFlashcard = flashcards[currentCardIndex]; // Get the current flashcard
    cardContent.innerText = showAnswer ? currentFlashcard.answer : currentFlashcard.question; // Display either question or answer

    // Calculate and update progress bar width
    const progressPercent = ((currentCardIndex + 1) / flashcards.length) * 100;
    progress.style.width = `${progressPercent}%`; // Set the width of the progress fill
}

// Function to navigate to the next flashcard
function nextCard() {
    // Check if there are more flashcards to show
    if (currentCardIndex < flashcards.length - 1) {
        currentCardIndex++; // Increment card index
        showAnswer = false; // Reset to show question
        updateFlashcard(); // Update the display
    }
}

// Function to navigate to the previous flashcard
function prevCard() {
    // Check if there are previous flashcards to show
    if (currentCardIndex > 0) {
        currentCardIndex--; // Decrement card index
        showAnswer = false; // Reset to show question
        updateFlashcard(); // Update the display
    }
}

// Function to flip the flashcard and show either the question or answer
function flipCard() {
    showAnswer = !showAnswer; // Toggle answer visibility
    updateFlashcard(); // Update the display
}

// Event listeners for button clicks
document.getElementById("flip").addEventListener("click", flipCard); // Flip card on click
document.getElementById("next").addEventListener("click", nextCard); // Next card on click
document.getElementById("prev").addEventListener("click", prevCard); // Previous card on click

// Initialize the display with the first flashcard
updateFlashcard();
