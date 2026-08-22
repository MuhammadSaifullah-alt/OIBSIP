let buttons =  document.querySelectorAll("button");
let input = document.querySelector("input");

const operators = ["+", "-", "*", "/", "%"];


buttons.forEach(button => {
    button.addEventListener("click", ()=>{
        let lastChar = input.value.slice(-1);
        if(button.innerText === "C"){
            input.value = "";
        }
        else if(button.innerText === "⌫"){
            input.value = input.value.slice(0,-1);
        }
        else if(button.innerText === "="){
            if(button.innerText / 0){
                input.value = "Error";
            }
            calculation();
        }
        else{
            if (
                operators.includes(button.innerText) &&
                operators.includes(lastChar)
            ) {
                input.value = input.value.slice(0, -1) + button.innerText;
                return;
            }
            input.value += button.innerText;
        }
        
    })
});
function calculation() {
    try {
        let result = eval(input.value);

        if (!isFinite(result)) {
            input.value = "Cannot divide by 0";
            return;
        }

        input.value = result;
    }
    catch {
        input.value = "Error";
    }
}