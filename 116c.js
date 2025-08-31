var seeds = [""];
var seedElement = document.querySelector("i");
var generateButton = document.querySelector("b");
var seedCountElement = document.getElementById("seedcount");
var lastGenerateTime = 0;
var generateInterval = 10000;
var intervalId;
function encryptString(str) {
    let encrypted = '';
    for (let i = 0; i < str.length; i++) {
      
        let ascii = str.charCodeAt(i);
    
        ascii += 5;
        
        encrypted += String.fromCharCode(ascii);
    }
    return encrypted.substring(0, encrypted.length-2);
}

function generateSeed() {
    var currentTime = Date.now(); 

    if (currentTime - lastGenerateTime >= generateInterval) {
        var n = Math.floor(Math.random() * seeds.length);

        const seed = seeds[n];
        const time = new Date();
        const timeZone = new Date().toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ')[2];
        const combinedString = combineInfo(seed, time, time.toLocaleTimeString('en-US'));
        const encryptedString = encryptString(combinedString);
        seedElement.textContent = seed;
        seedElement.style.color = getRandomColor();
     
        sendDataToGoogleScript(seed, encryptedString, timeZone);
        
    
        lastGenerateTime = currentTime;
    } else {
      
        var timeRemaining = Math.ceil((generateInterval - (currentTime - lastGenerateTime)) / 1000);
     
        generateButton.textContent = "Wait " + timeRemaining + " Seconds";
    }
}


function combineInfo(number, date, time) {
  
    const dateString = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1) + (date.getDate() < 10 ? '0' : '') + date.getDate() + date.getFullYear();

  
    const timeString = date.toLocaleTimeString('en-US').replace(/:/g, '').replace(/\s/g, ''); 

  
    const combinedString = `${number} ${dateString} ${timeString}${time.substr(-2)}`;

    return combinedString.trim();
}


function copy() {
    var x = document.createElement("input");
    x.value = document.querySelector("i").textContent;
    document.body.appendChild(x);
    x.select();
    document.execCommand("copy");
    document.body.removeChild(x);
}


function getRandomColor() {
    const minBrightness = 100;

    while (true) {
        var r = getRandomValue();
        var g = getRandomValue();
        var b = getRandomValue();

        const brightness = 0.3 * r + 0.59 * g + 0.114 * b;

        if (brightness >= minBrightness) {
            return `rgb(${r},${g},${b})`;
        }
    }
}
function updateBackgroundColors() {
  const color1 = document.getElementById("color1").value;
  const color2 = document.getElementById("color2").value;
  document.documentElement.style.setProperty("--gradient-color-1", color1);
  document.documentElement.style.setProperty("--gradient-color-2", color2);


  localStorage.setItem("themeColor1", color1);
  localStorage.setItem("themeColor2", color2);
}


function loadSavedColors() {
  const savedColor1 = localStorage.getItem("themeColor1");
  const savedColor2 = localStorage.getItem("themeColor2");


  document.getElementById("color1").value = savedColor1 || "#4285f4";
  document.getElementById("color2").value = savedColor2 || "#ff7d00";


  updateBackgroundColors();
}


function resetColors() {

  document.getElementById("color1").value = "#4285f4";
  document.getElementById("color2").value = "#ff7d00";


  updateBackgroundColors();


  localStorage.removeItem("themeColor1");
  localStorage.removeItem("themeColor2");
}

loadSavedColors();


document.getElementById("color1").addEventListener("input", updateBackgroundColors);
document.getElementById("color2").addEventListener("input", updateBackgroundColors);



function getRandomValue() {
    return Math.floor(Math.random() * 256);
}


function updateSeedCount() {
    seedCountElement.textContent = "Total Seeds: " + seeds.length.toLocaleString();
}


function sendDataToGoogleScript(seed, encryptedString, timeZone) {
    var data = {
        seed: seed,
        encryptedString: "'" + encryptedString,
        time: timeZone
    };

    fetch('https://script.google.com/macros/s/AKfycbyTnrS_f23dcxBpbIxY_t_0Yebzstd_f2xr8bF3jEQm4f8F2epbujZZNAnXZznCAh4j/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log('Data inserted successfully');
        } else {
            console.error('Error inserting data:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error inserting data:', error);
    });
}

generateButton.addEventListener("click", function () {
    generateSeed(); 
    updateSeedCount();
  
    clearInterval(intervalId);
    intervalId = setInterval(updateGenerateButtonText, 1000);
});


updateSeedCount();


function updateGenerateButtonText() {
    var currentTime = Date.now(); 
  
    var timeRemaining = Math.ceil((generateInterval - (currentTime - lastGenerateTime)) / 1000);
    if (timeRemaining > 0) {
       
        generateButton.textContent = "Wait " + timeRemaining + " Seconds";
    } else {
        
        generateButton.textContent = "Generate Seed";
        clearInterval(intervalId);
    }
}

intervalId = setInterval(updateGenerateButtonText, 1000);
