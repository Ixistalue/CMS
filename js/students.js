document.querySelector('.add-button').addEventListener('click', function () {

    document.getElementById('studentModal').style.display = 'flex';
    document.querySelector('h2').innerText = 'Add student ';
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

    //const formattedDate = formatDate(rawDate);
    gender = gender == "Male" ? "M" : "F";

    const table = document.getElementById('studentsTable').querySelector('tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td><input type="checkbox" class="row-checkbox"></td>
      <td>${group}</td>
      <td>${firstName} ${lastName}</td>
      <td>${gender}</td>
      <td>${formatDate(birthday)}</td>
                                
                          
                          <td><span class="status-inactive"></span></td>
                                            <td class="options">
                      <button class="edit-icon"><img src="assets/edit32.png" alt="Редагувати"></button>
                      <button class="del-icon"><img src="assets/bin.png" alt="Видалити"></button>
                  </td>
    `;
    table.appendChild(newRow);
  
    document.getElementById('studentModal').style.display = 'none';
  });














  








  /*end*/


  /*tablesection*/
  /*start*/
  
  document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("confirmModal");
    const confirmText = document.getElementById("confirmText");
    const closeBtn = document.querySelector(".close-button");
    const okBtn = document.getElementById("confirmOk");
    const cancelBtn = document.getElementById("confirmCancel");

    let rowToDelete = null; // ✅ буде зберігати рядок для видалення

    // ✅ Делеговане видалення
    document.querySelector('#studentsTable tbody').addEventListener('click', function (e) {
        const deleteBtn = e.target.closest('.del-icon');
        if (deleteBtn) {
            const row = deleteBtn.closest('tr');
            const checkbox = row.querySelector('.row-checkbox');
            if (checkbox && checkbox.checked) {
                const studentName = row.querySelector('td:nth-child(3)').textContent;
                confirmText.textContent = `Are you sure you want to delete user "${studentName}"?`;
                modal.style.display = "flex";
                rowToDelete = row; // зберігаємо рядок для видалення
            }
        }
    });

    // ✅ Обробники модального вікна (тільки один раз додаються)
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
            rowToDelete = null; // очищення
        }
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});

  /*end*/



  /*checkboxes*/

  const selectAllCheckbox = document.getElementById('selectAll');


  selectAllCheckbox.addEventListener('change', () => {
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
      rowCheckboxes.forEach(cb => {
          cb.checked = selectAllCheckbox.checked;
      });
  });

  /*end*/


  /*edit*/
      // ✅ Делеговане редагування
      document.querySelector('#studentsTable tbody').addEventListener('click', function (e) {
        const editBtn = e.target.closest('.edit-icon');
        if (editBtn) {
            const row = editBtn.closest('tr');
            const checkbox = row.querySelector('.row-checkbox');
            if (checkbox && checkbox.checked) {
                // Витягуємо дані з рядка
                const group = row.cells[1].textContent;
                const name = row.cells[2].textContent.split(' ');
                const gender = row.cells[3].textContent;
                const birthday = row.cells[4].textContent.split('.').reverse().join('-'); // YYYY-MM-DD

                // Заповнюємо форму
                document.getElementById("group").value = group;
                document.getElementById("firstName").value = name[0];
                document.getElementById("lastName").value = name[1];
                document.getElementById("gender").value = gender === 'M' ? 'Male' : 'Female';
                document.getElementById("birthday").value = birthday;

                // Змінюємо заголовок
                document.querySelector('#studentModal h2').textContent = "Edit student";

                // Показуємо модальне вікно
                document.getElementById("studentModal").style.display = "flex";
            }
        }
    });

  /*end*/