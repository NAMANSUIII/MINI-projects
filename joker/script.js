const jokes = [
    "Why don't skeletons fight each other? They don't have the guts.",
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "What do you call fake spaghetti? An impasta.",
    "Why did the scarecrow win an award? Because he was outstanding in his field.",
    "Why don't eggs tell jokes? They'd crack each other up.",
    "I'm reading a book on anti-gravity. I can't put it down.",
    "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
    "Why do we tell actors to 'break a leg'? Because every play has a cast.",
    "What do you call a factory that makes okay products? A satisfactory.",
    "Why did the math book look sad? Because of all of its problems."
];

const jokeElement = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');

jokeBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    jokeElement.textContent = jokes[randomIndex];
});