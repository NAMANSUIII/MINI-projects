const toggleBtn = document.getElementById('toggleBtn');
const ground = document.querySelector('.ground-boundary');

toggleBtn.addEventListener('click', () => {
    // Toggle the 'match-day' class on the ground
    ground.classList.toggle('match-day');

    if (ground.classList.contains('match-day')) {
        toggleBtn.textContent = "Switch to Standard Lights";
        toggleBtn.style.backgroundColor = "#27ae60";
    } else {
        toggleBtn.textContent = "Toggle Match Day Lights";
        toggleBtn.style.backgroundColor = "#e74c3c";
    }
});