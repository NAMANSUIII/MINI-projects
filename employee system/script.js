const form = document.getElementById('employeeForm');
const tbody = document.querySelector('#employeeTable tbody');
let employees = [];
let editIndex = -1;

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const salary = document.getElementById('salary').value;

    if (editIndex === -1) {
        employees.push({ name, role, salary });
    } else {
        employees[editIndex] = { name, role, salary };
        editIndex = -1;
    }

    form.reset();
    renderTable();
});

function renderTable() {
    tbody.innerHTML = '';
    employees.forEach((emp, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${emp.name}</td>
            <td>${emp.role}</td>
            <td>rupee ${emp.salary}</td>
            <td>
                <button class="edit-btn" onclick="editEmployee(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteEmployee(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editEmployee(index) {
    const emp = employees[index];
    document.getElementById('name').value = emp.name;
    document.getElementById('role').value = emp.role;
    document.getElementById('salary').value = emp.salary;
    editIndex = index;
}

function deleteEmployee(index) {
    employees.splice(index, 1);
    renderTable();
}
