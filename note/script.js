const form = document.getElementById('noteForm');
const container = document.getElementById('notesContainer');
let notes = [];
let editIndex = -1;

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;

    if (editIndex === -1) {
        notes.push({ title, content });
    } else {
        notes[editIndex] = { title, content };
        editIndex = -1;
    }

    form.reset();
    renderNotes();
});

function renderNotes() {
    container.innerHTML = '';
    notes.forEach((note, index) => {
        const div = document.createElement('div');
        div.className = 'note-card';
        div.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <div class="actions">
                <button class="edit-btn" onclick="editNote(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function editNote(index) {
    const note = notes[index];
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteContent').value = note.content;
    editIndex = index;
}

function deleteNote(index) {
    notes.splice(index, 1);
    renderNotes();
}