function offLights(){

    document.getElementById("red").style.background = "gray";
    document.getElementById("yellow").style.background = "gray";
    document.getElementById("green").style.background = "gray";
}

function redLight(){

    offLights();
    document.getElementById("red").style.background = "red";
}

function yellowLight(){

    offLights();
    document.getElementById("yellow").style.background = "yellow";
}

function greenLight(){

    offLights();
    document.getElementById("green").style.background = "lime";
}