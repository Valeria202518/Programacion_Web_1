function leer() { 
    var nom = document.forms["formulario"].elements[0].value;
    //document.getElementById('resultado').innerHTML = "Tu nombre es: " + nom;

    var clave = document.getElementById('pass').value;

    var carrera1 = document.getElementsByTagName('select')[0].value;

    var gen = document.getElementsByName('genero');
    var g = ''; 
    for (i = 0; i < gen.length; i++) {
        if (gen[i].checked)
            g = gen[i].value;
    }

    var ok = document.getElementById('casilla').checked;
    var ok1 = ok ? "Aceptado":"Denegado";

    document.getElementById('resultado').innerHTML = "<br>Tu nombre es: " + nom + "<br> Tu password es: " + clave + "<br> Tu carrera es: " + carrera1 + "<br> Tu genero es: " + g + "<br> Aceptación de los acuerdos: " + ok1;
    //alert(carrera1);
}
