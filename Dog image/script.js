const dogImage = document.getElementById('dogImage');
const dogBtn = document.getElementById('dogBtn');

async function fetchDog() {
    dogBtn.disabled = true;
    dogBtn.textContent = 'Loading...';
    
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        
        dogImage.src = data.message;
        dogImage.style.display = 'block';
    } catch (error) {
        alert('Failed to fetch image');
        dogBtn.disabled = false;
        dogBtn.textContent = 'Get Dog';
    }
}

dogImage.addEventListener('load', () => {
    dogBtn.disabled = false;
    dogBtn.textContent = 'Get Dog';
});

dogBtn.addEventListener('click', fetchDog);

fetchDog();