/*MODAL WINDOW FORM FOELDS SCRIPT*/
const selectGroup = document.getElementById('group');

selectGroup.addEventListener('change', function () {
  if (this.value === "") {
    this.style.color = 'grey';
  } else {
    this.style.color = 'black';
  }
});


const selectGender = document.getElementById('gender');

selectGender.addEventListener('change', function () {
  if (this.value === "") {
    this.style.color = 'grey';
  } else {
    this.style.color = 'black';
  }
});

const birthdayInput = document.getElementById('birthday');

birthdayInput.addEventListener('input', function () {
  if (this.value) {
    this.classList.add('has-value');
  } else {
    this.classList.remove('has-value');
  }
});

/*ADD SCRIPT*/
document.querySelector('.add-button').addEventListener('click', function () {
  resetStudentForm();
  selectGender.style.color = 'grey';
  selectGroup.style.color = 'grey';
  birthdayInput.classList.remove('has-value');
  document.getElementById('studentModal').style.display = 'flex';
  document.querySelector('#studentModal h2').textContent = "Add student";
});

document.querySelector('.close').addEventListener('click', function () {
  resetStudentForm();
  document.getElementById('studentModal').style.display = 'none';
});

document.getElementById('cancelBtn').addEventListener('click', function () {
  resetStudentForm();
  document.getElementById('studentModal').style.display = 'none';
});
/*DELETE SCRIPT*/

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("confirmModal");
  const confirmText = document.getElementById("confirmText");
  const closeBtn = document.querySelector(".close-button");
  const okBtn = document.getElementById("confirmOk");
  const cancelBtn = document.getElementById("confirmCancel");

  let rowToDelete = null;

  document.querySelector('#studentsTable tbody').addEventListener('click', function (e) {
    const deleteBtn = e.target.closest('.del-icon');
    if (deleteBtn) {
      const row = deleteBtn.closest('tr');
      const checkbox = row.querySelector('.row-checkbox');
      if (checkbox && checkbox.checked) {
        const studentName = row.querySelector('td:nth-child(3)').textContent;
        confirmText.textContent = `Are you sure you want to delete user "${studentName}"?`;
        modal.style.display = "flex";
        rowToDelete = row;
      }
    }
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  okBtn.addEventListener("click", () => {
    if (rowToDelete) {
      rowToDelete.remove();
      modal.style.display = "none";
      rowToDelete = null;
    }
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

/*CHECKBOXES SCRIPT*/
const selectAllCheckbox = document.getElementById('selectAll');
selectAllCheckbox.addEventListener('change', () => {
  const rowCheckboxes = document.querySelectorAll('.row-checkbox');
  rowCheckboxes.forEach(cb => {
    cb.checked = selectAllCheckbox.checked;
  });
});

/*EDIT SCRIPT*/
document.querySelector('#studentsTable tbody').addEventListener('click', function (e) {
  resetStudentForm();
  const editBtn = e.target.closest('.edit-icon');
  if (editBtn) {
    const row = editBtn.closest('tr');
    const checkbox = row.querySelector('.row-checkbox');
    if (checkbox && checkbox.checked) {
      const group = row.cells[1].textContent;
      const name = row.cells[2].textContent.split(' ');
      const gender = row.cells[3].textContent;
      const birthday = row.cells[4].textContent.split('.').reverse().join('-');
      const id = row.id;
      document.getElementById('studentId').value = id;
      document.getElementById("group").value = group;
      document.getElementById("firstName").value = name[0];
      document.getElementById("lastName").value = name[1];
      document.getElementById("gender").value = gender === 'M' ? 'Male' : 'Female';
      document.getElementById("birthday").value = birthday;

      document.querySelector('#studentModal h2').textContent = "Edit student";
      document.getElementById('createBtn').textContent = " Save "
      selectGender.style.color = 'black';
      selectGroup.style.color = 'black';
      birthdayInput.classList.add('has-value');

      document.getElementById("studentModal").style.display = "flex";
    }
  }
});

/*VALIDATION*/
const today = new Date().toISOString().split('T')[0];
document.getElementById('birthday').setAttribute('max', today);

const fields = [
  {
    id: 'firstName',
    errorId: 'firstNameError',
    message: 'Ім’я має містити лише латинські літери (2–40 символів)',
    regex: /^[A-Za-z]{2,40}$/
  },
  {
    id: 'lastName',
    errorId: 'lastNameError',
    message: 'The last name must contain only Latin letters (2–40 characters)',
    regex: /^[A-Za-z]{2,40}$/
  },
  {
    id: 'birthday',
    errorId: 'birthdayError',
    validate: () => {
      const value = document.getElementById('birthday').value;
      if (!value) return false;
      const selectedYear = new Date(value).getFullYear();
      return selectedYear <= 2009;
    },
    message: 'Select a birth date between 1925 and 2009'
  },
  {
    id: 'group',
    errorId: 'groupError',
    validate: () => {
      const value = document.getElementById('group').value;
      return value !== '';
    },
    message: 'Please select a group from the list'
  },
  {
    id: 'gender',
    errorId: 'genderError',
    validate: () => {
      const value = document.getElementById('gender').value;
      return value !== '';
    },
    message: 'Please select a gender from the list'
  }
];

// BLUR VALIDATION
fields.forEach(({ id, errorId, message, regex, validate }) => {
  const input = document.getElementById(id);
  const errorDiv = document.getElementById(errorId);

  if (!input || !errorDiv) return;

  input.addEventListener('blur', () => {
    const value = input.value.trim();
    const isValid = regex ? regex.test(value) : validate?.();

    if (!isValid) {
      input.classList.add('error');
      errorDiv.textContent = message;
      errorDiv.classList.add('show');
    } else {
      input.classList.remove('error');
      errorDiv.textContent = '';
      errorDiv.classList.remove('show');
    }
  });
});

function formatDate(dateString) {
  const parts = dateString.split("-");
  const formatted = `${parts[2]}.${parts[1]}.${parts[0]}`;
  return formatted;
}
function resetStudentForm() {
  document.getElementById('studentForm').reset();

  fields.forEach(({ id, errorId }) => {
    const input = document.getElementById(id);
    const errorDiv = document.getElementById(errorId);
    input.classList.remove('error');
    errorDiv.textContent = '';
    errorDiv.classList.remove('show');
  });
}
function addStudentToTable(student) {

  let gender = student.gender == "Male" ? "M" : "F";

  const table = document.getElementById('studentsTable').querySelector('tbody');
  const newRow = document.createElement('tr');
  newRow.setAttribute('id', student.id);
  newRow.innerHTML = `
    <td><label><input type="checkbox" class="row-checkbox"><span class="visually-hidden">Вибрати рядок</span> </label></td>
      <td>${student.group}</td>
      <td>${student.firstName} ${student.lastName}</td>
      <td>${gender}</td>
      <td>${formatDate(student.birthday)}</td>
                                
                          
                          <td><span class="status-inactive"></span></td>
                                            <td class="options">
                      <button class="edit-icon"><img src="assets/edit32.png" alt="edit"></button>
                      <button class="del-icon"><img src="assets/bin.png" alt="delete"></button>
                  </td>
    `;
  table.appendChild(newRow);

  document.getElementById('studentModal').style.display = 'none';

}

function updateStudentInTable(updatedStudent) {
  let gender = updatedStudent.gender == "Male" ? "M" : "F";
  const row = document.getElementById(updatedStudent.id);
  if (row) {
    const tds = row.querySelectorAll('td');
    let gender = updatedStudent.gender == "Male" ? "M" : "F";

    tds[1].textContent = updatedStudent.group;
    tds[2].textContent = `${updatedStudent.firstName} ${updatedStudent.lastName}`;
    tds[3].textContent = gender;
    tds[4].textContent = formatDate(updatedStudent.birthday);
  }

  document.getElementById('studentModal').style.display = 'none';
}


document.getElementById('studentForm').addEventListener('submit', (e) => {
  e.preventDefault();
  let formIsValid = true;

  fields.forEach(({ id, errorId, message, regex, validate }) => {
    const input = document.getElementById(id);
    const errorDiv = document.getElementById(errorId);
    const value = input.value.trim();
    const isValid = regex ? regex.test(value) : validate?.();

    if (!isValid) {
      input.classList.add('error');
      errorDiv.textContent = message;
      errorDiv.classList.add('show');
      formIsValid = false;
    } else {
      input.classList.remove('error');
      errorDiv.textContent = '';
      errorDiv.classList.remove('show');
    }
  });

  if (formIsValid) {
    const id = document.getElementById('studentId').value;
    const student = {
      id: id || Date.now().toString(),
      firstName: document.getElementById('firstName').value.trim(),
      lastName: document.getElementById('lastName').value.trim(),
      birthday: document.getElementById('birthday').value,
      group: document.getElementById('group').value,
      gender: document.getElementById('gender').value
    };

    if (id) {
      updateStudentInTable(student);
      console.log("Edited student:", JSON.stringify(student, null, 2));
    } else {
      addStudentToTable(student);
    }
    resetStudentForm();
  }
});

