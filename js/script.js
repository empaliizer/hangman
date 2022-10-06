// Ordlista
const wordList = ['Bokstäver', 'Gissningar', 'Palettblad', 'Leksaker', 'Matlagning', 'Utomhuslek', 'Pokemon', 'Bokstavsknapp', 'Inredning', 'Polisutbildning']

// Slumpa fram index ur ordlistan
const randomNumber = Math.floor( Math.random() * wordList.length );

// Väljer ordet i ordlistan och gör det till små bokstäver
const selectedWord = wordList[randomNumber].toLowerCase();

//Läser in HTML elemntet till javascripten
const imgElement = document.querySelector('img');

//Läser in HTML elemntet till javascripten
const message = document.querySelector('.message');

//Skapa variabel för faild
let failed = 0;

// Loop för att få fram ex antal boxar till varje ord - en bokstav blir en box.
for(let i in selectedWord) {
    const char = selectedWord[i];
    const spanElement = document.createElement('span');
    spanElement.setAttribute('data-char', char);
    spanElement.classList.add('uncompleted');
    document.querySelector('.letter-box').appendChild(spanElement)
}

//Funktion som säger att om bokstaven finns i order så ska den ha små bokstäver och om du klarar spelet så kommer det upp ett meddelande om man klarat det eller ej samt ett erbjudande om att spela igen.
function includedInWord(char) {

    //Om bokstaven finns i ordet 
    if ( selectedWord.includes(char.toLowerCase()) ) {

        //Lägger till klasser för när man har rätt eller fel bokstav.
        const selectedElements = document.querySelectorAll('span[data-char="' + char + '"]');
        for(let el of selectedElements) {
            el.classList.remove('uncompleted');
            el.classList.add('completed');
            el.innerHTML = char
        }

        // Kollar om det finns någon uncompleted kvar. Det finns inga bokstäver kvar i ordet att lösa
        if ( document.querySelectorAll('span.uncompleted').length == 0 ) {
            message.innerHTML = 'Grattis du har klarat det! Vill du spela igen?';
            document.querySelector('#btn-start-again').classList.add('show');
        }

        // För varje gång man failar så byter till en ny bild tills gubben blir hängd.
    } else {
        failed++;
        imgElement.setAttribute('src', `images/fail${failed}.png`)
        if (failed >= 9) {
            const selectedElements = document.querySelectorAll('.letter-box span');
            for(let el of selectedElements) {
                el.classList.remove('uncompleted');
                el.classList.add('completed');
                el.innerHTML = el.getAttribute('data-char');
            }
            message.innerHTML = 'Tyvärr lyckades du inte den här gången, men du kanske vi spela igen?'
            document.querySelector('#btn-start-again').classList.add('show');
        }
    }
}

// Click funktion som talar om vad som händer om man klickar på bokstavsknappen
const btnChars = document.getElementsByClassName('btn-char');
for(let btnChar of btnChars) {
    btnChar.addEventListener('click', function(){
        btnChar.setAttribute('disabled', 'true')
        includedInWord( btnChar.getAttribute('data-char') )
    })
}

// när man trycker på knappen så startar spelet om. 
document.querySelector('#btn-start-again').addEventListener('click', function(){
    location.reload();
})