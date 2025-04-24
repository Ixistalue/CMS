
  document.querySelector('.add-button').addEventListener('click', function () {
    document.getElementById('studentModal').style.display = 'flex';
    document.querySelector('h2').innerText = 'Add student';
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





  function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.display === "block") {
        sidebar.style.display = "none";
    } else {
        sidebar.style.display = "block";
    }
}

/*Index script end*/
/*bell scripts from 2.html*/
function animateBell() {
    const bell = document.getElementById("bell");
    const notification = document.getElementById("notification");
    const bellSound = document.getElementById("bell-sound");

    // Приховати кружечок (через додання класу)
    notification.classList.add("hide-badge");

    // Запуск анімації дзвіночка
    bell.classList.remove("shake");
    void bell.offsetWidth; // перезапуск
    bell.classList.add("shake");

    // Відтворення звуку
    bellSound.play();

    // Повернути кружечок через 4 секунди
    setTimeout(() => {
      notification.classList.remove("hide-badge");
    }, 4000);
  }




  /*header improvements*/
  /*start*/
const profileArea = document.getElementById('profileArea');
const profileDropdown = document.getElementById('profileDropdown');

let hideTimeout;

function showDropdown() {
  clearTimeout(hideTimeout);
  profileDropdown.style.display = 'block';
}

function hideDropdown() {
  hideTimeout = setTimeout(() => {
    profileDropdown.style.display = 'none';
  }, 300);
}

// Коли курсор заходить на область профілю або на меню
profileArea.addEventListener('mouseenter', showDropdown);
profileDropdown.addEventListener('mouseenter', showDropdown);

// Коли курсор виходить з обох — запускається таймер
profileArea.addEventListener('mouseleave', hideDropdown);
profileDropdown.addEventListener('mouseleave', hideDropdown);

const messageArea = document.getElementById('notification');
const messageDropdown = document.getElementById('messageDropdown');

let hideTimeout2;

function showDropdownM() {
  clearTimeout(hideTimeout2);
  messageDropdown.style.display = 'block';
}

function hideDropdownM() {
  hideTimeout2 = setTimeout(() => {
    messageDropdown.style.display = 'none';
  }, 300);
}

// Коли курсор заходить на область профілю або на меню
messageArea.addEventListener('mouseenter', showDropdownM);
messageDropdown.addEventListener('mouseenter', showDropdownM);

// Коли курсор виходить з обох — запускається таймер
messageArea.addEventListener('mouseleave', hideDropdownM);
messageDropdown.addEventListener('mouseleave', hideDropdownM);

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