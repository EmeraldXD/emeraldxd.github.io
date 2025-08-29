/* const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[]|:;<>,.?/";

function scrambleText(element) {
    let iteration = 0;
    const finalText = element.dataset.value;
    let interval = setInterval(() => {
        element.innerText = element.innerText
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return finalText[index]; 
                }
                return letters[Math.floor(Math.random() * letters.length)]; 
            })
            .join("");

        if (iteration >= finalText.length) {
            clearInterval(interval); 
        }

        iteration += 1 / 2.5; 
    }, 30);
}

window.addEventListener('load', () => {
    scrambleText(document.querySelector('h1')); 
    scrambleText(document.querySelector('.emerald'));
    scrambleText(document.querySelector(".codedby"));
});
*/
