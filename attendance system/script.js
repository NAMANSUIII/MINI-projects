const form = document.getElementById('attendanceForm');
const tbody = document.querySelector('#attendanceTable tbody');
let records = [];
let editIndex = -1;

document.getElementById('date').valueAsDate = new Date();

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const subject = document.getElementById('subject').value;
    const status = document.getElementById('status').value;
    
    if (editIndex === -1) {
        records.push({ name, date, subject, status });
    } else {
        records[editIndex] = { name, date, subject, status };
        editIndex = -1;
    }

    form.reset();
    document.getElementById('date').valueAsDate = new Date();
    renderTable();
});

function renderTable() {
    tbody.innerHTML = '';
    records.forEach((rec, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${rec.name}</td>
            <td>${rec.date}</td>
            <td>${rec.status}</td>
            <td>
                <button class="edit-btn" onclick="editRecord(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteRecord(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editRecord(index) {
    const rec = records[index];
    document.getElementById('name').value = rec.name;
    document.getElementById('date').value = rec.date;
    document.getElementById('status').value = rec.status;
    editIndex = index;
}

function deleteRecord(index) {
    records.splice(index, 1);
    renderTable();
}