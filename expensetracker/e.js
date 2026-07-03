let total = 0;

function addExpense(){

    let name = document.getElementById("expenseName").value;
    let amount = Number(document.getElementById("expenseAmount").value);

    if(name == "" || amount <= 0){
        alert("Enter valid details");
        return;
    }

    total = total + amount;

    document.getElementById("total").innerHTML = total;

    let li = document.createElement("li");

    li.innerHTML = name + " - ₹" + amount;

    document.getElementById("list").appendChild(li);

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
}