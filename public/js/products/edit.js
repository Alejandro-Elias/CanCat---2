window.onload = function() {
    var nombre = document.querySelector('#nombre');
    
  
    var selects = ['#sabores', '#categoria', '#measure'];
  
    selects.forEach(function(selectId) {
        var select = document.querySelector(selectId);
        var options = Array.from(select.options);
        
        options.sort(function(a, b) {
          if (a.text > b.text) return 1;
          if (a.text < b.text) return -1;
          return 0;
        });
        
        options.forEach(function(option) {
          select.add(option);
        });
    });
  };
  
  
  
    
    document.querySelector('form').addEventListener('submit', function(event) {
  o
      event.preventDefault();
  
      var nombre = document.querySelector('#nombre');
      var precio = document.querySelector('#precio');
      var categoria = document.querySelector('#categoria');
      var stock = document.querySelector('#stock');
      var sabores = document.querySelector('#sabores');
      var descuento = document.querySelector('#descuento');
      var measure = document.querySelector('#measure');
      var value = document.querySelector('#value');
      var brand = document.querySelector('#brand');
      var descripcion = document.querySelector('#descripcion');
     
      function validarCampo(campo, validacion, mensajeError) {
        var errorSpan = document.querySelector('#error-' + campo.id);
        if (validacion) {
          campo.style.borderColor = 'green';
          errorSpan.style.display = 'none';
        } else {
          campo.style.borderColor = 'red';
          errorSpan.textContent = mensajeError;
          errorSpan.style.display = 'block';
          event.preventDefault();
        }
      }
    
      validarCampo(nombre, nombre.value.length >= 4, 'El nombre debe tener al menos 4 caracteres.');
      validarCampo(precio, precio.value > 0, 'Por favor, introduce un precio válido mayor a 0.');
      validarCampo(categoria, categoria.value, 'Por favor, selecciona una categoría.');
      validarCampo(stock, stock.value > 0, 'Por favor, introduce una cantidad válida en stock.');
      validarCampo(sabores, sabores.value, 'Por favor, selecciona un sabor.');
      validarCampo(descuento, descuento.value <= 100, 'El descuento debe ser menor a 99.');
      validarCampo(measure, measure.value, 'Por favor, selecciona una unidad de medida.');
      validarCampo(value, value.value > 0, 'Por favor, introduce un valor válido mayor a 0.');
      validarCampo(brand, brand.value.length >= 2, 'La marca debe tener al menos 2 caracteres.');
      validarCampo(descripcion, descripcion.value.length >= 30, 'La descripción debe tener al menos 30 caracteres.');
    
      
      if (!event.defaultPrevented) {
        document.querySelector('form').submit();
      }
    });
    
    var campos = ['nombre', 'precio', 'categoria', 'stock', 'sabores', 'measure', 'value', 'brand', 'descripcion', 'image1', 'image2'];
    campos.forEach(function(campo) {
      var input = document.querySelector('#' + campo);
      input.addEventListener('input', function() {
        var errorSpan = document.querySelector('#error-' + campo);
        var invalidFeedback = document.querySelector('#' + campo + ' ~ .invalid-feedback');
        if ((campo === 'nombre' && this.value.length >= 4) || (campo === 'brand' && this.value.length >= 2) || (campo === 'descripcion' && this.value.length >= 30)) {
          this.style.borderColor = 'green';
          this.classList.remove('is-invalid');
          errorSpan.style.display = 'none';  
          if (invalidFeedback) invalidFeedback.style.display = 'none';
        } else if ((campo === 'precio' || campo === 'value') && this.value > 0 ) {
          this.style.borderColor = 'green';
          this.classList.remove('is-invalid');
          errorSpan.style.display = 'none';
          if (invalidFeedback) invalidFeedback.style.display = 'none';
       
        } else if (campo === 'image1' || campo === 'image2') {
          var file = this.files[0];
          if (file && file.type.startsWith('image/')) {
            this.style.borderColor = 'green';
            this.classList.remove('is-invalid');
            errorSpan.style.display = 'none';
            if (invalidFeedback) invalidFeedback.style.display = 'none';
          } else {
            this.style.borderColor = 'red';
            errorSpan.textContent = 'El archivo debe ser una imagen.';
            errorSpan.style.display = 'block';
            errorSpan.style.color = 'red';
            if (invalidFeedback) invalidFeedback.style.display = 'block';
          }
        } else if (campo !== 'nombre' && campo !== 'brand' && campo !== 'descripcion' && campo !== 'precio' && campo !== 'value' && campo !== 'descuento' && this.value) {
          this.style.borderColor = 'green';
          this.classList.remove('is-invalid');
          errorSpan.style.display = 'none';
          if (invalidFeedback) invalidFeedback.style.display = 'none';
        }
      });
        
      input.addEventListener('blur', function() {
        var errorSpan = document.querySelector('#error-' + campo);
        if (!this.value || (campo === 'nombre' && this.value.length < 4) || (campo === 'brand' && this.value.length < 2) || (campo === 'descripcion' && this.value.length < 30) || ((campo === 'precio' || campo === "descuento" || campo === 'value') && (this.value <= 0 ))) {
          this.style.borderColor = 'red';
          errorSpan.textContent = getErrorMessage(campo);
          errorSpan.style.display = 'block';
          errorSpan.style.color = 'red';
        }
      });
    });
    
    function getErrorMessage(campo) {
      switch (campo) {
        case 'nombre':
          return 'El nombre debe tener al menos 4 caracteres.';
        case 'precio':
          return 'Por favor, introduce un precio válido mayor a 0.';
        case 'categoria':
          return 'Por favor, selecciona una categoría.';
        case 'stock':
          return 'Por favor, introduce un valor superior a 0.';
        case 'sabores':
          return 'Por favor, selecciona un sabor.';
        case 'measure':
          return 'Por favor, selecciona una unidad de medida.';
        case 'value':
          return 'Por favor, introduce un valor válido mayor a 0.';
        case 'brand':
          return 'La marca debe tener al menos 2 caracteres.';
        case 'descuento':
          return 'El descuento debe ser un número menor o igual a 99.';
        case 'descripcion':
          return 'La descripción debe tener al menos 30 caracteres.';
        case 'image1':
        case 'image2':
              return 'El archivo debe tener formato imagen.';
        default:
              return 'Por favor, completa este campo correctamente.';
      }
    }
    