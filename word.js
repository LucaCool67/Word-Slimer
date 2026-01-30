
const scoreDisplay = document.querySelector(".score");
const highScoreDisplay = document.querySelector(".highscore");
const wordDiv = document.querySelector(".words");
const textBox = document.querySelector(".input-area");
const wpmDisplay = document.querySelector(".wpm");

const words = [
    "Apple",
    "Bread",
    "Chair",
    "Dance",
    "Earth",
    "Flame",
    "Glass",
    "Horse",
    "Image",
    "Juice",
    "Knife",
    "Light",
    "Magic",
    "Night",
    "Ocean",
    "Plant",
    "Queen",
    "River",
    "Stone",
    "Table",
    "Under",
    "Voice",
    "Water",
    "Xenial",
    "Yellow",
    "Zebra",
    "Anchor",
    "Bridge",
    "Castle",
    "Dragon",
    "Energy",
    "Forest",
    "Garden",
    "Hammer",
    "Island",
    "Jungle",
    "Kernel",
    "Legend",
    "Market",
    "Native",
    "Object",
    "People",
    "Rocket",
    "Silver",
    "Travel",
    "Update",
    "Visual",
    "Window",
    "Xyloid",
    "Yonder",
    "Zephyr",
    "Artist",
    "Battle",
    "Candle",
    "Device",
    "Effect",
    "Future",
    "Golden",
    "Health",
    "Insect",
    "Journey",
    "Knight",
    "Liquid",
    "Motion",
    "Normal",
    "Option",
    "Planet",
    "Quick",
    "Reason",
    "Spirit",
    "Thread",
    "Unique",
    "Valley",
    "Wisdom",
    "Xerxes",
    "Young",
    "Zenith",
    "Attack",
    "Bright",
    "Course",
    "Damage",
    "Escape",
    "Flower",
    "Growth",
    "Hunter",
    "Impact",
    "Justice",
    "Leader",
    "Mirror",
    "Number",
    "Origin",
    "Power",
    "Quiet"
];


let isPlaying = false;
let score = 0;
let highscore = localStorage.getItem("highscore") || 0
let timeout = 7000;
let divider = 1.25;
let firstWord = true;
let maxWarnings = 3;
let warnings = 0;
let randomNum;
let randomWord;
let wordInterval;
let wordTimeout;
let wpm;
let start;
let endWPM;

highScoreDisplay.textContent = `Highscore: ${highscore}`;

document.onkeyup = function(){
    if(isPlaying){
        let value = textBox.value;
        let firstLetter = randomWord[0];

        if(value == firstLetter && !start){
            start = Date.now();
        }

        if(value === randomWord){
            endWPM = Date.now();
            let millis = endWPM - start;
            console.log(millis);
            wpm = (60000 / millis) * (randomWord.length / 5);
            wpm = wpm.toFixed(1);
            wpmDisplay.textContent = `WPM: ${wpm}`;
            console.log(wpm)
            //start = 0;
            //endWPM = 0;
        }
    }
}

function moveWord(){
    if(isPlaying){
        
    }
}

function end(highScore){
    isPlaying = false;
    
    if(score > highScore){
        highScore = score;
        console.log(highScore);
        highScoreDisplay.textContent = `Highscore: ${highScore}`;
        localStorage.setItem("highscore", highScore);
    }
    else{
        console.log(highScore);
    }
    
    warnings = 0;
    score = 0;
    firstWord = true;
    clearInterval(wordInterval);
    clearTimeout(wordTimeout);

    wordDiv.textContent = "Game Over!";
    scoreDisplay.textContent = "Score: 0"
}

function getWord(){

    if(wordTimeout){
        clearTimeout(wordTimeout);
    }

    randomNum = Math.floor(Math.random() * 100);
    randomWord = words[randomNum];
    wordDiv.textContent = randomWord;

    wordDiv.classList.remove("moveDown");

    void wordDiv.offsetWidth;
    wordDiv.classList.add("moveDown");
    console.log("Word set:", randomWord);

    wordTimeout = setTimeout(() => {
        if(isPlaying && randomWord === wordDiv.textContent){
            end(highscore);

        }
    }, timeout);
}

function play(){
    isPlaying = true;
    warnings = 0; 

    if(highscore == 300){
        highscore = 0;
        localStorage.setItem("highscore", highScore);
    }
    
    setTimeout(() => {
        getWord();

        wordInterval = setInterval(() => {
            getWord();
        }, timeout);
    }, 1000);
}

function submit(){
    if(isPlaying){

        if(!randomWord){
            console.log("No word set yet");
            return;
        }
        
        const userAnswer = textBox.value.trim();
        console.log("Comparing:", userAnswer, "vs", randomWord);
        
        if(userAnswer === randomWord){
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            console.log("Correct! Score:", score);
            
            start = 0;
            endWPM = 0;
            
            clearTimeout(wordTimeout);
            
            wordDiv.textContent = "";
            wordDiv.classList.remove("moveDown")
            wordDiv.classList.add("goBack")

            setTimeout(() => {
                wordDiv.classList.remove("goBack")
                
                textBox.value = "";
                clearInterval(wordInterval);
                getWord();
                wordInterval = setInterval(() => {
                    getWord();
                }, timeout);
                
            }, 100)

        }
        else{
            end(highscore)
        }
    }
}

textBox.addEventListener("keydown", event => {
    if(isPlaying){
        if(event.key === "Enter"){
            setTimeout(() => { // Removed 'event' parameter
                submit();
            }, 100)
        }
    }
    else{
        console.log("how did you even get here, i must of messed something up")
    }
})
