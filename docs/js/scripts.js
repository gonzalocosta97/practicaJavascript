window.onload = function () {

//  Borra / reingresa el placeholder del ingreso de sueldo

let appValorEntrada = document.querySelector(".app__valorEntrada");

appValorEntrada.onfocus = function() {

    this.placeholder='';

}

appValorEntrada.onblur= function() {

    this.placeholder='Ingresá el importe bruto (final)';

}

// Abre ventana modal de configuración de descuento

let buttonConfig = document.querySelector('.buttonConfig');

buttonConfig.onclick = function () {

    let sectionModalConfig = document.querySelector('.modalConfig');
    sectionModalConfig.style.clipPath='circle(150% at 100% 0)';

}


// Cierra ventana modal de configuración de descuento

let modalConfigCerrar = document.querySelector('.modalConfig__cerrar');

modalConfigCerrar.onclick = function () {
    
    let sectionModalConfig = document.querySelector('.modalConfig');
    sectionModalConfig.style.clipPath='circle(0% at 100% 0)';

}

// Configura el descuento a aplicarse sobre los ingresos brutos

let confirmarDesc = document.querySelector('#buttonConfirmar');
let tasaDescuento = document.querySelector('.modalConfig__valorEntrada').value;
let tasaDescuentoVisualizada = document.querySelector('.buttonConfig__text');
tasaDescuentoVisualizada.innerHTML = tasaDescuento + '<span class="buttonConfig__icon">%</span>';

confirmarDesc.onclick = function () {

    let areaMensajeValidacion = document.querySelector('.modalConfig__areaMensaje');

    let mensajeValidacion = document.querySelector('.modalConfig__mensaje');

    let tasaValidada = document.querySelector('.modalConfig__valorEntrada').value;
        tasaValidada = parseFloat(tasaValidada);

    if (tasaValidada >= 0 && tasaValidada <= 100 ) {

        tasaDescuento = tasaValidada;

        tasaDescuentoVisualizada.innerHTML = tasaDescuento.toFixed(2) + '<span class="buttonConfig__icon">%</span>';

        mensajeValidacion.className='modalConfig__mensaje';
        areaMensajeValidacion.style.opacity='1';
        mensajeValidacion.innerHTML = '¡Configuraste el porcentaje con éxito!';

    }

    else {

        areaMensajeValidacion.style.opacity='1';
        mensajeValidacion.className='modalConfig__mensaje modalConfig__mensaje--error';
        mensajeValidacion.innerHTML = '*Debés ingresar un número entre 0.00 y 100.00';
      
    }


}

// Calcula los resultados y permite la visualización de los mismos en el area2 de la app

let buttonCalcular = document.querySelector('#buttonCalcular');

    buttonCalcular.onclick = function () {
        
        let importeIngresado = document.querySelector('.app__valorEntrada').value;
            importeIngresado = parseFloat(importeIngresado);

        if (importeIngresado>= 1 && importeIngresado<= 9999999) {

        let appArea2 = document.querySelector('.app__area2');
        let descripcionNeto = document.querySelector('.app__descNeto');
        let infoNeto = document.querySelector('.app__infoNeto');
        let infoNetoDescontado = document.querySelector('.app__infoNetoDescontado');

        // Muestra la ventana y oculta la config

        appArea2.style.transition = 'transform 0.2s ease-out';
        appArea2.style.transform = 'scale(1,1)';
        buttonConfig.style.transform = 'scale(0,0)';


        // Se realizan los cálculos y se imprimen en pantalla

        let importeNeto = importeIngresado * ((100 - tasaDescuento) / 100);
        let porcentajeMano = (100 - tasaDescuento);
        let importeDescontado = importeIngresado - importeNeto;

        descripcionNeto.innerHTML = '$' + importeNeto.toFixed(2);
        infoNeto.innerHTML = porcentajeMano.toFixed(2) + '%';
        infoNetoDescontado.innerHTML = '$' + importeDescontado.toFixed(2);

        }

        else {

            let mensajeError = document.querySelector('.app__message');

            mensajeError.innerHTML='*El importe debe estar entre $1 y $9.999.999';
        }


    }

}
