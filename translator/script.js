const fromLang = document.getElementById('fromLang');
const toLang = document.getElementById('toLang');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const micBtn = document.getElementById('micBtn');
const translateBtn = document.getElementById('translateBtn');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    
    micBtn.addEventListener('click', () => {
        recognition.lang = fromLang.value;
        if (micBtn.classList.contains('listening')) {
            recognition.stop();
        } else {
            recognition.start();
        }
    });

    recognition.onstart = () => {
        micBtn.classList.add('listening');
        micBtn.textContent = '🛑 Stop';
    };

    recognition.onend = () => {
        micBtn.classList.remove('listening');
        micBtn.textContent = '🎤 Speak';
    };

    recognition.onresult = (event) => {
        inputText.value = event.results[0][0].transcript;
    };
    
    recognition.onerror = () => {
        alert('Microphone error or permission denied.');
    };
} else {
    micBtn.style.display = 'none';
}

translateBtn.addEventListener('click', async () => {
    const text = inputText.value.trim();
    if (!text) return;

    translateBtn.disabled = true;
    translateBtn.textContent = 'Translating...';

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang.value}|${toLang.value}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        outputText.value = data.responseData.translatedText;
    } catch (error) {
        alert('Translation failed.');
    } finally {
        translateBtn.disabled = false;
        translateBtn.textContent = 'Translate';
    }
});