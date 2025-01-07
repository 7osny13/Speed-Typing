const randomQuoteURL = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('qouteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');

quoteInputElement.addEventListener('input' , () => {
    const arrayquote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    let correct = true;
    arrayquote.forEach((characterSpan , index) => {
        const character = arrayValue[index];
        if(character == null) {
            characterSpan.classList.remove('incorrect');
            characterSpan.classList.remove('correct');
            correct = false;
        } else if (character == characterSpan.innerText){
            characterSpan.classList.remove('incorrect');
            characterSpan.classList.add('correct');
        } else {
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('correct');
            correct = false;
        }
    })

    if(correct) renderNewQuotes();
})


function getRandomQuote() {
    return fetch(randomQuoteURL)
      .then(response => response.json())
      .then(data => data.content);
}

async function renderNewQuotes() {
    const quote = await getRandomQuote();
    console.log(quote)
    quoteDisplayElement.innerHTML = '';
    quote.split('').forEach(character => {
        const charcterSpan = document.createElement('span');
        charcterSpan.innerText = character;
        quoteDisplayElement.appendChild(charcterSpan);
    });
    quoteInputElement.value = null;
    startTimer();
}

let startTime ;
function startTimer() {

    timerElement.innerText = 0;
    startTime = new Date();
    setInterval(() => {
        timerElement.innerText = getTimerTime();
    } , 1000)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000 ); 
}

renderNewQuotes();