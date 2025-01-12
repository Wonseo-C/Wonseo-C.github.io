const pianoKeys =document.querySelectorAll(".piano-keys .key");
volumeSlider = document.querySelector(".volume-slider input");
keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [];
let audioElements = {};

const playTune = (key) => {
    if (!audioElements[key]) {
        audioElements[key] = new Audio(`./tunes/${key}.wav`);
    }
    const audio = audioElements[key];

    audio.currentTime = 0;
    audio.volume = volumeSlider.value;
    audio.play();
    
    const clickedKey = document.querySelector(`[data-key=${key}]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 70)
} 

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => playTune(key.dataset.key));
})

const handleVolume = (e) => {
    audio.volume = e.target.value;
    Object.values(audioElements).forEach((audio) => {
        audio.volume = volume;
    });
}

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"))
}

const pressedKey = (e) => {
    if(allKeys.includes(e.key)) playTune(e.key);
}

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
