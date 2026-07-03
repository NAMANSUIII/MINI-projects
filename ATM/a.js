let balance = 1000;

function deposit(){

    let amount = Number(document.getElementById("amount").value);

    if(amount > 0){

        balance = balance + amount;

        document.getElementById("balance").innerHTML = balance;

        alert("Money Deposited Successfully");

    }else{

        alert("Enter a valid amount");

    }

    document.getElementById("amount").value = "";
}

function withdraw(){

    let amount = Number(document.getElementById("amount").value);

    if(amount <= 0){

        alert("Enter a valid amount");

    }
    else if(amount > balance){
         alert("Insufficient Balance");
 }
    else{
         balance = balance - amount;
         document.getElementById("balance").innerHTML = balance;
         alert("Please Collect Your Cash");
        }
    document.getElementById("amount").value = "";
}