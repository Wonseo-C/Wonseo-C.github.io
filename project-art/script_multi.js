const pianoKeys =document.querySelectorAll(".piano-keys .key");
volumeSlider = document.querySelector(".volume-slider input");
keysCheckbox = document.querySelector(".keys-checkbox input");


// initial dghhkl;n;lkh;lh;lhgd

let allKeys = [];
let audioElements = {};

// let audioElements_start = {};

// const audio = new Audio();

const playMelody = (melody) => {
    let index = 0;

    const playNote = () => {
        if (index < melody.length) {
            // 새로 생성된 Audio 객체로 음을 재생
            const newAudio = new Audio(`./tunes2/${melody[index]}.mp3`);
            newAudio.play(); // 음을 바로 재생
            
            // 다음 음을 재생하기 위해 index 증가
            index++;

            // 간격을 두고 계속해서 음을 재생 (자연스럽게 연속적으로)
            if (index < melody.length) {
                if (index%3 == 0) {
                    setTimeout(playNote, 1500);
                } else {
                    setTimeout(playNote, 950); // 각 음표 간 간격 (500ms)
                }
                // setTimeout(playNote, 1500); // 1500ms 후 다음 음
            }
        }
    };

    playNote(); // 첫 번째 음부터 시작
};


// 특정 멜로디 정의
const melody = ["d","g","h",
                "h","k","l",
                ";","n",";",
                "l","k","h",
                ";","l","h",
                ";","l","h","g","d"];

// 페이지 로드 시 멜로디 재생
// window.addEventListener("load", () => {
//     playMelody(melody);
// });

const playTune = (key) => {
    if (!audioElements[key]) {
        audioElements[key] = new Audio(`./tunes2/${key}.mp3`);
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

// const pressedKey = (e) => {
//     if(allKeys.includes(e.key)) playTune(e.key);
// }
const pressedKey = (e) => {
    const keyMapping = {
        KeyA: "a",
        KeyS: "s",
        KeyD: "d",
        KeyF: "f",
        KeyG: "g",
        KeyH: "h",
        KeyJ: "j",
        KeyK: "k",
        KeyL: "l",
        Semicolon: ";",
        KeyW: "w",
        KeyE: "e",
        KeyT: "t",
        KeyY: "y",
        KeyU: "u",
        KeyO: "o",
        KeyP: "p",
        KeyZ: 'z', // A3
        KeyX: 'x', // B3
        KeyC: 'c', // C4
        KeyV: 'v', // D4
        KeyB: 'b', // E4
        KeyN: 'n', // F4
        KeyM: 'm', // G4
        Comma: ',', // A4
    };

    if (keyMapping[e.code]) {
        playTune(keyMapping[e.code]);
    }
};

// 키보드 입력 이벤트 리스너
document.addEventListener("keydown", pressedKey);

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
