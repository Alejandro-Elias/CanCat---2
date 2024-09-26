document.querySelectorAll(".noUser").forEach(elemento => {
  elemento.addEventListener("click", () => {
    console.log("¡Carrito!");

    Swal.fire({
      title: "Debes iniciar sesión como usuario para ver el carrito",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Ingresar",
      denyButtonText: "Registrarse"
    }).then((resultado) => {    
      if (resultado.isConfirmed) {
        window.location.href = "/usuarios/ingreso";
      } else if (resultado.isDenied) {
        window.location.href = "/usuarios/registro";
      }
    });
  });
});
