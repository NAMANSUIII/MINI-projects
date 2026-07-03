const form = document.getElementById('patientForm');
const tbody = document.querySelector('#patientTable tbody');
let patients = [];
let editIndex = -1;

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('patientName').value;
    const age = document.getElementById('patientAge').value;
    const ailment = document.getElementById('ailment').value;
    const room = document.getElementById('room').value;

    if (editIndex === -1) {
        patients.push({ name, age, ailment, room });
    } else {
        patients[editIndex] = { name, age, ailment, room };
        editIndex = -1;
    }

    form.reset();
    renderTable();
});

function renderTable() {
    tbody.innerHTML = '';
    patients.forEach((pat, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${pat.name}</td>
            <td>${pat.age}</td>
            <td>${pat.ailment}</td>
            <td>${pat.room}</td>
            <td>
                <button class="edit-btn" onclick="editPatient(${index})">Edit</button>
                <button class="delete-btn" onclick="deletePatient(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editPatient(index) {
    const pat = patients[index];
    document.getElementById('patientName').value = pat.name;
    document.getElementById('patientAge').value = pat.age;
    document.getElementById('ailment').value = pat.ailment;
    document.getElementById('room').value = pat.room;
    editIndex = index;
}

function deletePatient(index) {
    patients.splice(index, 1);
    renderTable();
}