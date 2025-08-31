const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const container =  document.querySelectorAll(".container select");

for(let select of container){
    for(let curr in countryList){
        let option=document.createElement("option");
        option.innerText=curr;
        option.value=curr;
        if((select.name==="from_list" && curr==="INR") || (select.name==="to_list" && curr==="USD"))
            option.selected=true;
        select.append(option);
    }
    select.addEventListener("change" , (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let code=element.value;
    let country=countryList[code];
    let newFlag=`https://flagsapi.com/${country}/flat/64.png`;
    let flag=element.parentElement.querySelector("img");
    flag.src=newFlag;
}

let btn=document.querySelector("button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
const msg = document.querySelector(".rate");

btn.addEventListener("click" , async (evt) => {
    evt.preventDefault();
    let amt=document.querySelector(".amount input");

    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(data);
    let finalAmount = amt.value * rate;
    msg.innerText = `${amt.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;    
})