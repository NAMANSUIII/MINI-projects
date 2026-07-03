function convert(){

    let rupees = Number(document.getElementById("rupees").value);

    let rate = Number(document.getElementById("currency").value);

    let currency =
    document.getElementById("currency").options[
    document.getElementById("currency").selectedIndex].text;

    if(rupees<=0){
        alert("Enter valid amount");
        return;
    }

    let result = rupees / rate;

    document.getElementById("result").innerHTML =
    rupees + " INR = " + result.toFixed(2) + " " + currency;
}