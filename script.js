const word_el = document.getElementById("word")
const popup = document.getElementById("popup-container")
const message_el = document.getElementById("success-mesaage")
const wrongLetters_el = document.getElementById("wrong-letters")
const items = document.querySelectorAll(".item")
const message = document.getElementById("message")
const btn = document.getElementById("play-again")

const correctLetters = []
const wrongLetters = []
let selectedWord = getRandomWord();

function getRandomWord(){
    const words =["eror","debug","android"]

    return words[Math.floor(Math.random() * words.length)]
}





function displayWord() {
    

    word_el.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter: ''}
            </div>
        `).join('')}
    
    `;
    const w = word_el.innerText.replace(/\n/g,"")
    if(w === selectedWord){
        popup.style.display = "flex"
        message_el.innerText = "Tebrikler Kazandınız"
    }

}
function updateWrongLetters(){
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length>0? '<h3>Hatalı Harfler</h3>':''}
        ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
    `;

    items.forEach((items,index) => {
        const erorCount = wrongLetters.length

        if(index<erorCount){
            items.style.display = "block"

        }else{
            items.style.display = "none"
        }
    })
    if(wrongLetters.length === items.length){
        popup.style.display = "flex"
        message_el.innerText = "Malesef Kaybettiniz"
    }
}

btn.addEventListener("click",function(){
    correctLetters.splice(0)
    wrongLetters.splice(0)

    selectedWord = getRandomWord()  
    displayWord()
    updateWrongLetters()

    popup.style.display = "none"
})


function displayMessage(){
    message.classList.add("show")

    setTimeout(function(){
        message.classList.remove("show")
    },2000)
}

window.addEventListener("keydown",function(e){
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter)
                displayWord()
            }else{
                displayMessage()
                
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter)
                updateWrongLetters()

            }
            else{
                displayMessage()
            }
        }
    }
})


    displayWord()
