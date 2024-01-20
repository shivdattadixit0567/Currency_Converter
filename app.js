const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const fromImg = document.querySelector("#fromImg");
const toImg = document.querySelector("#toImg");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for(let select of dropdowns){
    for(let code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.name==="from" && code === "USD"){
            newOption.selected = "selected";
        }
        if(select.name==="to" && code === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updatFlag(evt);
    })
}

const updatFlag = (event) =>{
    let val = event.currentTarget.value;
    let countryCode = countryList[val];
    if(event.currentTarget.name=="from"){
        fromImg.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
    }else if(event.currentTarget.name=="to"){
        toImg.src = `https://flagsapi.com/${countryCode}/flat/64.png`;    
    }
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let finalAmt = document.querySelector(".final_amount input");
    if(amount.value==="" || amount.value < 0){
        amount.value = 1;
    }
    if(finalAmt.value==="" || finalAmt.value < 0){
        finalAmt.value = 1;
    }
    console.log(fromCurr.value, " " , toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    let val = toCurr.value.toLowerCase();
    finalAmt.value = amount.value * data[val];
})