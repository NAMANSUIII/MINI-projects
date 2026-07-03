let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;
let deleteId = null;

const nameInput = document.getElementById("name");
const rollInput = document.getElementById("roll");
const courseInput = document.getElementById("course");
const branchInput = document.getElementById("branch");
const yearInput = document.getElementById("year");
const genderInput = document.getElementById("gender");
const mobileInput = document.getElementById("mobile");
const emailInput = document.getElementById("email");
const addressInput = document.getElementById("address");

const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");
const resetBtn = document.getElementById("resetBtn");
const searchBox = document.getElementById("searchBox");
const tableBody = document.getElementById("studentTableBody");
const totalCount = document.getElementById("totalCount");
const formTitle = document.getElementById("form-title");

const modal = document.getElementById("confirmModal");
const confirmYes = document.getElementById("confirmYes");
const confirmNo = document.getElementById("confirmNo");

function saveToStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

function clearErrors() {
  document.getElementById("nameError").textContent = "";
  document.getElementById("rollError").textContent = "";
  document.getElementById("mobileError").textContent = "";
  document.getElementById("emailError").textContent = "";
}

function validateForm() {
  clearErrors();
  let isValid = true;

  if (nameInput.value.trim() === "") {
    document.getElementById("nameError").textContent = "Name is required";
    isValid = false;
  }

  if (rollInput.value.trim() === "") {
    document.getElementById("rollError").textContent = "Roll number is required";
    isValid = false;
  } else {
    let duplicate = students.some((s, i) => s.roll === rollInput.value.trim() && i !== editIndex);
    if (duplicate) {
      document.getElementById("rollError").textContent = "Roll number already exists";
      isValid = false;
    }
  }

  let mobilePattern = /^[0-9]{10}$/;
  if (!mobilePattern.test(mobileInput.value.trim())) {
    document.getElementById("mobileError").textContent = "Mobile must be exactly 10 digits";
    isValid = false;
  }

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value.trim())) {
    document.getElementById("emailError").textContent = "Enter a valid email";
    isValid = false;
  }

  return isValid;
}

function getFormData() {
  return {
    name: nameInput.value.trim(),
    roll: rollInput.value.trim(),
    course: courseInput.value.trim(),
    branch: branchInput.value.trim(),
    year: yearInput.value,
    gender: genderInput.value,
    mobile: mobileInput.value.trim(),
    email: emailInput.value.trim(),
    address: addressInput.value.trim()
  };
}

function resetForm() {
  document.getElementById("studentForm").reset();
  clearErrors();
  editIndex = -1;
  addBtn.style.display = "inline-block";
  updateBtn.style.display = "none";
  formTitle.textContent = "Add Student";
}

function addStudent() {
  if (!validateForm()) return;

  let newStudent = getFormData();
  newStudent.id = students.length > 0 ? students[students.length - 1].id + 1 : 1;

  students.push(newStudent);
  saveToStorage();
  renderTable();
  resetForm();
}

function updateStudent() {
  if (!validateForm()) return;

  let updatedData = getFormData();
  updatedData.id = students[editIndex].id;
  students[editIndex] = updatedData;

  saveToStorage();
  renderTable();
  resetForm();
}

function editStudent(index) {
  let student = students[index];
  editIndex = index;

  nameInput.value = student.name;
  rollInput.value = student.roll;
  courseInput.value = student.course;
  branchInput.value = student.branch;
  yearInput.value = student.year;
  genderInput.value = student.gender;
  mobileInput.value = student.mobile;
  emailInput.value = student.email;
  addressInput.value = student.address;

  addBtn.style.display = "none";
  updateBtn.style.display = "inline-block";
  formTitle.textContent = "Edit Student";

  document.getElementById("form-section").scrollIntoView({ behavior: "smooth" });
}

function deleteStudent(index) {
  deleteId = index;
  modal.style.display = "flex";
}

confirmYes.addEventListener("click", () => {
  students.splice(deleteId, 1);
  saveToStorage();
  renderTable();
  modal.style.display = "none";
});

confirmNo.addEventListener("click", () => {
  deleteId = null;
  modal.style.display = "none";
});

function renderTable(filteredList) {
  let list = filteredList || students;
  tableBody.innerHTML = "";

  list.forEach((student) => {
    let realIndex = students.indexOf(student);
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.roll}</td>
      <td>${student.course}</td>
      <td>${student.branch}</td>
      <td>${student.year}</td>
      <td>${student.gender}</td>
      <td>${student.mobile}</td>
      <td>${student.email}</td>
      <td>${student.address}</td>
      <td>
        <button class="btn-edit" onclick="editStudent(${realIndex})">Edit</button>
        <button class="btn-delete" onclick="deleteStudent(${realIndex})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  totalCount.textContent = students.length;
}

searchBox.addEventListener("input", () => {
  let query = searchBox.value.trim().toLowerCase();
  let filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(query) ||
      s.roll.toLowerCase().includes(query)
  );
  renderTable(filtered);
});

addBtn.addEventListener("click", addStudent);
updateBtn.addEventListener("click", updateStudent);
resetBtn.addEventListener("click", resetForm);

renderTable();