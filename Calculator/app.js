

display = document.getElementById("display");
isCalculated = false;

function showInDisplay(input){
  const operators = ['+', '-', '*', '/'];
  if(isCalculated)
  {
    if (operators.includes(input)) {
        display.value = display.value.replace("= ", "") + input;
    } else {
      display.value = input;
    }
    isCalculated = false;
  }else{
    display.value +=input;
  }
}

function calculate(){
  try{
    display.value = "= "+eval(display.value);
    isCalculated = true;
  }
  catch(error)
  {
    display.value ="Error!";
    isCalculated = true;
  }
  
}

function clearDisplay(){
  display.value ="";
}

function backInDisplay(){
  if (isCalculated) {
    display.value = display.value.replace("= ", "");
    isCalculated = false;
  }
  let dis = display.value; 
  display.value = dis.substring(0, dis.length - 1);
}


function calcPercent(){
  try{
    if(display.value =="" || display.value =="Error!"){
      display.value ="Error!";
      isCalculated = true;
      return;
    }
    display.value = display.value.replace("= ", "");
    display.value = "= "+eval(display.value)/100;
    isCalculated = true;
  }
  catch(error)
  {
    display.value ="Error!";
    isCalculated = true;
  }
}

function calcSqrt(){
  try{
    display.value = display.value.replace("= ", "");
    let sqrtVal=Math.sqrt(display.value);
    if(display.value =="" || display.value =="Error!"  || isNaN(sqrtVal)){
      display.value ="Error!";
      isCalculated = true;
      return;
    }
    display.value = "= "+sqrtVal;
    isCalculated = true;
  }
  catch(error)
  {
    display.value ="Error!";
    isCalculated = true;
  }
}







