const $ = (id) => document.getElementById(id);

const showError = (element, message) => {
    element.textContent = message;
};

$("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let error = false;

    for (let i = 0; i < this.elements.length - 2; i++) {
        if (!this.elements[i].value) {
            this.elements[i].classList.add("is-invalid");
            showError($("alertLogin" + [i]), "Debe completar el campo");
            error = true;
        } else {
            this.elements[i].classList.remove("is-invalid");
            showError($("alertLogin" + [i]));
        }
    }
    !error && this.submit();
});

$("email").addEventListener("focus", function () {
    this.classList.remove("is-invalid");
    showError($("alertLogin0"));
});

$("password").addEventListener("focus", function () {
    this.classList.remove("is-invalid");
    showError($("alertLogin1"));
});

$("email").addEventListener("blur", function () {
    if (!this.value) {
        this.classList.add("is-invalid");
        showError($("alertLogin0"), "El email es obligatorio");
    } else if (!isValidEmailFormat(this.value)) {
        this.classList.add("is-invalid");
        showError($("alertLogin0"), "Formato de email inválido");
    } else {
        this.classList.remove("is-invalid");
        showError($("alertLogin0"));
    }
});

$("password").addEventListener("blur", function () {
    let errorMessage = [];

    if (!this.value) {
        errorMessage.push("La contraseña es obligatoria");
        this.classList.add("is-invalid");
    } else if (this.value.length < 8) {
        errorMessage.push("La contraseña debe tener al menos 8 caracteres.");
        this.classList.add("is-invalid");
    } else {
        this.classList.remove("is-invalid");
    }

    if (errorMessage.length > 0) {
        showError($("alertLogin1"), errorMessage.join("<br>"));
    } else {
        showError($("alertLogin1"), null);
    }
});


function isValidEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
