function addNote(){

    let input = document.getElementById("noteInput");
    let notesContainer = document.getElementById("notesContainer");

    if(input.value.trim() === ""){
        alert("Please write a note.");
        return;
    }

    let note = document.createElement("div");
    note.className = "note";

    note.innerHTML = `
        <p>${input.value}</p>
        <button class="delete-btn" onclick="deleteNote(this)">Delete</button>
    `;

    notesContainer.prepend(note);

    input.value = " ";
}
function deleteNote(button){
    button.parentElement.remove();
}