function playGame(userChoice) {

    const choices = ["Stone", "Paper", "Scissors"];

    const computerChoice =
        choices[Math.floor(Math.random() * 3)];

    let result = " ";

    if (userChoice === computerChoice) {
        result = "It's a Draw!";
    }
    else if (
        (userChoice === "Stone" && computerChoice === "Scissors") ||
        (userChoice === "Paper" && computerChoice === "Stone") ||
        (userChoice === "Scissors" && computerChoice === "Paper") ||
        (userChoice === "Stone" && computerChoice === "Stone") ||
        (userChoice === "Scissors" && computerChoice === "Scissors")
    ) {
        result = "You Win! 🎉";
    }
    else {
        result = "Computer Wins! 🤖";
    }

    document.getElementById("user-choice").innerText =
        "Your Choice: " + userChoice;

    document.getElementById("computer-choice").innerText =
        "Computer Choice: " + computerChoice;

    document.getElementById("winner").innerText =
        result;
} 