/*MODAL WINDOW FORM FOELDS SCRIPT*/
const selectGroup = document.getElementById('group');

selectGroup.addEventListener('change', function() {
  if (this.value === "") {
    this.style.color = 'grey';
  } else {
    this.style.color = 'black';
  }
});


const selectGender = document.getElementById('gender');

selectGender.addEventListener('change', function() {
  if (this.value === "") {
    this.style.color = 'grey';
  } else {
    this.style.color = 'black';
  }
});

const birthdayInput = document.getElementById('birthday');

birthdayInput.addEventListener('input', function() {
  if (this.value) {
    this.classList.add('has-value');
  } else {
    this.classList.remove('has-value');
  }
});

/*ADD SCRIPT*/
document.querySelector('.add-button').addEventListener('click', function () {
  selectGender.style.color = 'grey';
  selectGroup.style.color = 'grey';
  birthdayInput.classList.remove('has-value');
  document.getElementById('studentModal').style.display = 'flex';
  document.querySelector('#studentModal h2').textContent = "Add student";
  document.getElementById('studentForm').reset();
});

document.querySelector('.close').addEventListener('click', function () {
  document.getElementById('studentModal').style.display = 'none';
});

document.getElementById('cancelBtn').addEventListener('click', function () {
  document.getElementById('studentModal').style.display = 'none';
});

document.getElementById('createBtn').addEventListener('click', function () {
  const group = document.getElementById('group').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  let gender = document.getElementById('gender').value;
  const birthday = document.getElementById('birthday').value;

  if (!group || !firstName || !lastName || !gender || !birthday) {
    alert('Будь ласка, заповніть усі поля.');
    return;
  }

  function formatDate(dateString) {
    const parts = dateString.split("-");
    const formatted = `${parts[2]}.${parts[1]}.${parts[0]}`;
    return formatted;
  }

  gender = gender == "Male" ? "M" : "F";

  const table = document.getElementById('studentsTable').querySelector('tbody');
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td><label><input type="checkbox" class="row-checkbox"><span class="visually-hidden">Вибрати рядок</span> </label></td>
      <td>${group}</td>
      <td>${firstName} ${lastName}</td>
      <td>${gender}</td>
      <td>${formatDate(birthday)}</td>
                                
                          
                          <td><span class="status-inactive"></span></td>
                                            <td class="options">
                      <button class="edit-icon"><img src="assets/edit32.png" alt="edit"></button>
                      <button class="del-icon"><img src="assets/bin.png" alt="delete"></button>
                  </td>
    `;
  table.appendChild(newRow);

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
  const editBtn = e.target.closest('.edit-icon');
  if (editBtn) {
    const row = editBtn.closest('tr');
    const checkbox = row.querySelector('.row-checkbox');
    if (checkbox && checkbox.checked) {
      const group = row.cells[1].textContent;
      const name = row.cells[2].textContent.split(' ');
      const gender = row.cells[3].textContent;
      const birthday = row.cells[4].textContent.split('.').reverse().join('-'); 

      document.getElementById("group").value = group;
      document.getElementById("firstName").value = name[0];
      document.getElementById("lastName").value = name[1];
      document.getElementById("gender").value = gender === 'M' ? 'Male' : 'Female';
      document.getElementById("birthday").value = birthday;

      document.querySelector('#studentModal h2').textContent = "Edit student";

      selectGender.style.color = 'black';
      selectGroup.style.color = 'black';
      birthdayInput.classList.add('has-value');

      document.getElementById("studentModal").style.display = "flex";
    }
  }
});
