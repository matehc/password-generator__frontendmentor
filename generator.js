const listOfCheckboxes = document.querySelectorAll('.option');
const labelEl = document.querySelector('#label');
const rangeInputEl = document.querySelector("#length");
const lengthDisplayEl = document.querySelector("#lengthDisplay");
const resultDisplayEl = document.querySelector('.password__display');
const textShowingCopied = document.querySelector('.copied');
const copyIcon = document.querySelector('.copy-icon');
const meters = document.querySelectorAll('.meters');

let globalPassword="";

let passwordLength = +rangeInputEl.max / 2
rangeInputEl.value = passwordLength;
lengthDisplayEl.innerText = rangeInputEl.value;


const generateBtn = document.querySelector('.generate-btn');

rangeInputEl.addEventListener('input', (e)=> {
    let target = e.target
    const min = target.min
    const max = target.max
    const val = target.value
    
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';

    lengthDisplayEl.innerText = rangeInputEl.value;
    passwordLength=rangeInputEl.value;

    generatePassword()
})


function generateRandomNumber() {
  let randomNumber = Math.floor(Math.random() * 10);
//   console.log(randomNumber);

  return randomNumber;
}

function generateRandomUpper() {
  let randomUpper = String.fromCharCode(Math.floor(Math.random() * 26) + 65);

//   console.log(randomUpper);

  return randomUpper;
}

function generateRandomLower() {
  let randomLower = String.fromCharCode(Math.floor(Math.random() * 26) + 97);

//   console.log(randomLower);

  return randomLower;
}

function generateRandomSymbol() {
  let symbols = ".,/<>={}()*&^%$#@![]";
  let lengthOfSymbols = symbols.length;
  let randomSymbol = symbols[Math.floor(Math.random() * lengthOfSymbols)];

//   console.log(randomSymbol);
  return randomSymbol;
}

let objectOfRandomFunction = {
    upper: generateRandomUpper,
    lower: generateRandomLower,
    number: generateRandomNumber,
    symbol: generateRandomSymbol,
}




function generatePassword() {


    let password="";
    let optionCount=0;

    listOfCheckboxes.forEach(node => {
        if(node.checked){
            optionCount++
        }
    })

    if(optionCount == 0){
        console.log("items must be checked")
        labelEl.classList.add('animate__animated', 'animate__shakeX');
        return;
    }

    for(let i=0; i < passwordLength; i++){
        listOfCheckboxes.forEach(checkbox => {
            if(checkbox.checked){
                let check = checkbox.id;
                password += objectOfRandomFunction[check]();
            }
        });
    }
    
    let finalPassword = password.slice(0,passwordLength); 
    console.log(finalPassword)
    resultDisplayEl.innerText = finalPassword;
    resultDisplayEl.innerText = reduceDisplayFontSize(finalPassword);

    let strength = checkPasswordStrength(finalPassword);
    console.log('after the check')
globalPassword = finalPassword;
console.log(globalPassword)
resultDisplayEl.style.color = "#fff";
return finalPassword;   
}

generateBtn.addEventListener('click', generatePassword);



copyIcon.addEventListener('click', () =>{
    console.log("entered the copyverse")
        navigator.clipboard.writeText(globalPassword)
        .then(()=> {
            console.log("text copied to clipboard");
            textShowingCopied.classList.add("show");
            setTimeout(()=>{
                textShowingCopied.classList.remove("show");
            }, 900);
        })
    
});


function reduceDisplayFontSize(password){
   if (password.length > 15) {
    resultDisplayEl.classList.add('reduce-font');
    return password;
   }
   resultDisplayEl.classList.remove('reduce-font');
   return password;
}




function checkPasswordStrength(password) {
    let upper = /[A-Z]/,
        lower = /[a-z]/,
        number = /[0-9]/,
        symbol = /[.,/<>={}()*&^%$#@![]]/,
        minLength = 8,
        score = 0;
    if (upper.test(password)) score++;
    if (lower.test(password)) score++;
    if (number.test(password)) score++;
    if (symbol.test(password)) score++;
    if (score < 3) score--;

    if (password.length > minLength) {
        // Increment the score for every 2 chars longer than the minimum
        score += Math.floor((password.length - minLength) / 2);
    }

    if (score < 3) return strengthVisualizer("Too Weak"); // score is 2 or lower
    if (score < 4) return strengthVisualizer("Weak"); // score is 3
    if (score < 6) return strengthVisualizer("Medium"); // score is 4 or 5
    return strengthVisualizer("Strong"); // score is 6 or higher
}


function strengthVisualizer(strength){


    let strengthDigit = {
        'too-weak': 1,
        'weak': 2,
        'medium': 3,
        'strong':4
    }


    if(strength === 'Too Weak'){
        document.querySelector('#too-weak').classList.add('too-weak'); 
        document.querySelector('.degree').textContent = "Too Weak!"; 

        meters.forEach(element => {
            element.classList.remove('weak-bar', 'medium-bar', 'strong-bar');
        });

    }
    
    
    else if (strength === "Weak"){
        document.querySelector('.degree').textContent = "Weak"; 

        console.log('Weak')
        meters.forEach(element => {
            element.classList.remove('too-weak', 'medium-bar', 'strong-bar');
        });
        for(let i = strengthDigit.weak; i > 0 ; i--){
            console.log(i)
            document.querySelector(`[data-bar-strength-${i}]`).classList.add('weak-bar');
        }
    }
    
    
    else if (strength === "Medium"){
        document.querySelector('.degree').textContent = "Medium"; 

        console.log('medium')
        meters.forEach(element => {
            element.classList.remove('too-weak', 'weak-bar', 'strong-bar');
        });

        for(let i = strengthDigit.medium; i > 0 ; i--){
            document.querySelector(`[data-bar-strength-${i}]`).classList.add('medium-bar');
        }
    } else if(strength === "Strong"){
        document.querySelector('.degree').textContent = "Strong"; 

        console.log('strong')
        meters.forEach(element => {
            element.classList.remove('too-weak', 'medium-bar', 'weak-bar');
        });
    
        for(let i = strengthDigit.strong; i > 0 ; i--){
            console.log(i)
            document.querySelector(`[data-bar-strength-${i}]`).classList.add('strong-bar');
        }
    }
    
}

