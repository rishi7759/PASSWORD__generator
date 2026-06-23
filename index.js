const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay =  document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]")
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-Msg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allcheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`! @#$%^&*()_-+={[}]\|;:"<,>.?/';


let password = "";
let passwordLength = 10;
let checkCount = 1;


 handleSlider();

  // set password length 
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    

}


function setIndicator( color) {
  indicator.style.backgroundColor = color

}


function getRndinteger( min , max) {
   return Math.floor(  Math.random() * (max - min)) + min;

}

function generaterandomNumber() {
    return getRndinteger(0,9);
}

function generatelowerCase() {
   return String.fromCharCode(getRndinteger(97, 123));
}

function generateupperCase() {
   return String.fromCharCode(getRndinteger(65, 91));
}

function generatesymbol() {
  const randNum = getRndinteger( 0, symbols.length);
  return symbols.charAt(randNum);
}

function passwordStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked)  hasNum = true;
    if(symbolCheck.Checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8) {
        setIndicator("#0f0");
    }
    else if (
    ( hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } 
    else {
        setIndicator("#f00");
    }
}


 async function copycontent() {
    try {

       await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
            copyMsg.innerText ="failed";
    }
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);


}


     function shufflePassword( array) {
           for(let i = Array.length - 1; i >0; i--){  
          const j = Math.floor(Math.random() * (i+1));

           const temp = array[i];
           array[i] = array[j];
           array[j] = temp;
     }
         let str = "";
         array.forEach((el) => (str += el));
         return str;

     }

   function handleCheckBpxChange() {
    checkCount = 0;
    allcheckBox.forEach ( (checkBox) => {
        if(checkBox.checked) {
            checkCount++;
        }
    })

      if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
      }
   }

allcheckBox.forEach( (checkBox) => {
    checkBox.addEventListener('change', handleCheckBpxChange);
})

inputSlider.addEventListener('input',(e) => {
    passwordLength = e.target.value;
    handleSlider();
} )

copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value) {
        copycontent();
    }
})

generateBtn.addEventListener('click', () => {
        if(checkCount<= 0) {
            return;
        }
        if(passwordLength < checkCount) {
            passwordLength = checkCount;
            handleSlider();
        }
             console.log("starting the journey");
         passwod = "";

        //  if(uppercaseCheck.checked) {
        //     password += generateupperCase();
        //  }

        //  if(numbersCheck.checked) {
        //     password += generaterandomNumber();
        //  }

        //  if(lowercaseCheck.checked) {
        //     password += generatelowerCase();
        //  }

        //  if(symbolCheck.checked) {
        //     password += generatesymbol();
        //  }

        let funcArr = [];

        if(uppercaseCheck.checked) {
            funcArr.push(generateupperCase);
        }

        if(lowercaseCheck.checked) {
            funcArr.push(generatelowerCase);
        }

        if(numbersCheck.checked) {
            funcArr.push(generaterandomNumber);
        }

          if(symbolCheck.checked) {
            funcArr.push(generatesymbol);
        }

        for(let i = 0; i< funcArr.length; i++) {
            password += funcArr[i]();
        }
        console.log("starting the journey");

        for(let i=0; i<passwordLength - funcArr.length; i++) {
            let randIndex = getRndinteger( 0 , funcArr.length);
            password += funcArr[randIndex]();
        }
        console.log("remanning addition done");
          
        password = shufflePassword(Array.from(password));
        console.log("shuffiling done");

        passwordDisplay.value = password;
        console.log("ui done ");

        passwordStrength();
})