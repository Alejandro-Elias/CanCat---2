const $ = (id) => document.getElementById(id);

const fechaActual = moment();

$("reserva-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let error = false

    for (let i = 0; i < this.elements.length - 1; i++) {
        if (!this.elements[i].value && i != 4) {
            this.elements[i].classList.add("is-invalid");
            $("alert" + [i]).innerHTML = "Debe completar el campo";
            error = true;
        } else {
            this.elements[i].classList.remove("is-invalid");
        }
    }
    !error && this.submit()
});

$("name").addEventListener("focus", function () {
    this.classList.remove("is-invalid");
    $("alert0").innerHTML = "";
});

$("email").addEventListener("focus", function () {
    this.classList.remove("is-invalid");
    $("alert1").innerHTML = "Este campo no se puede editar";
});

$("mascota").addEventListener("focus", function () {
    this.classList.remove("is-invalid");
    $("alert2").innerHTML = "";
});

$("especie").addEventListener("focus", function () {
    this.classList.remove("is-invalid");
    $("alert3").innerHTML = "";
});

$("fecha").addEventListener("focus", function () {
    this.classList.remove("is-invalid");
    $("alert3").innerHTML = "";
});

$("hora").addEventListener("focus", function () {
    this.classList.remove("is-invalid");
    $("alert3").innerHTML = "";
});

$("service").addEventListener("focus", function () {
    this.classList.remove("is-invalid");
    $("alert3").innerHTML = "";
});

$("name").addEventListener("blur", function () {
    if (!this.value) {
        this.classList.add("is-invalid");
        $("alert0").innerHTML = "El nombre es obligatorio";
    } else if (this.value.length < 2) {
        this.classList.add("is-invalid");
        $("alert0").innerHTML = "Mínimo 2 caracteres";
    } else {
        this.classList.remove("is-invalid");
        $("alert0").innerHTML = "";
    }
});

$("email").addEventListener("blur", function () { 
        $("alert1").innerHTML = "";
});

$("mascota").addEventListener("blur", function () {
    if (!this.value) {
        this.classList.add("is-invalid");
        $("alert2").innerHTML = "ingresa el nombre de tu mascota";
    } else {
        this.classList.remove("is-invalid");
        $("alert2").innerHTML = "";
    }
});

$("fecha").addEventListener("blur", function () {
    if (!this.value) {
        this.classList.add("is-invalid");
        $("alert5").innerHTML = "Elija fecha";
    }else if (moment(this.value).isBefore(fechaActual)){
        this.classList.add("is-invalid");
        $("alert5").innerHTML = "No puede elgir una fecha anterior a la actual";
    } else {
        this.classList.remove("is-invalid");
        $("alert5").innerHTML = "";
    }
});

$("hora").addEventListener("blur", function () {
    if (!this.value) {
        this.classList.add("is-invalid");
        $("alert6").innerHTML = "Elija horario";
    } else {
        this.classList.remove("is-invalid");
        $("alert6").innerHTML = "";
    }
});

$("service").addEventListener("blur", function () {
    if (!this.value) {
        this.classList.add("is-invalid");
        $("alert7").innerHTML = "Elija servicio";
    } else {
        this.classList.remove("is-invalid");
        $("alert7").innerHTML = "";
    }
});