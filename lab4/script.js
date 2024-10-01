function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function submenuFunction(submenuId) {
    closeAllSubmenusExcept(submenuId);
    submenuId.classList.toggle("show");
}

function closeAllSubmenusExcept(exceptSubmenu) {
    var submenus = document.getElementsByClassName("dropdown-content-right");
    for (var i = 0; i < submenus.length; i++) {
        if (submenus[i] !== exceptSubmenu && submenus[i].classList.contains("show")) {
            submenus[i].classList.remove("show");
        }
    }
}