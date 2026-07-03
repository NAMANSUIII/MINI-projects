function generateQR() {

    let text = document.getElementById("text").value;
    let qrImage = document.getElementById("qrImage");

    if(text==""){
        alert("Please enter text or URL");
        return;
    }

    qrImage.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data="
    + encodeURIComponent(text);

    qrImage.style.display = "block";
}