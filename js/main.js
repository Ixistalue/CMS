function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.display === "block") {
        sidebar.style.display = "none";
    } else {
        sidebar.style.display = "block";
    }
}


/*BELL ANIMATION SCRIPT */
function animateBell() {
    const bell = document.getElementById("bell");
    const notification = document.getElementById("notification");
    const bellSound = document.getElementById("bell-sound");

    notification.classList.add("hide-badge");

    bell.classList.remove("shake");
    void bell.offsetWidth;
    bell.classList.add("shake");

    bellSound.play();

    setTimeout(() => {
        notification.classList.remove("hide-badge");
    }, 4000);
}


/*DROPDOWNS SCRIPT*/
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

profileArea.addEventListener('mouseenter', showDropdown);
profileDropdown.addEventListener('mouseenter', showDropdown);

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

messageArea.addEventListener('mouseenter', showDropdownM);
messageDropdown.addEventListener('mouseenter', showDropdownM);

messageArea.addEventListener('mouseleave', hideDropdownM);
messageDropdown.addEventListener('mouseleave', hideDropdownM);
