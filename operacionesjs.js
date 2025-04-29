function sumar() {
	const n1 =document.getElementById("num1").value;
	const n2 =document.getElementById("num2").value;
	var resul=parseInt(n1)+parseInt(n2);
	document.getElementById("r").innerHTML=resul;
	alert(resul);
}

function restar(){
	const n1 =document.getElementById("num1").value;
	const n2 =document.getElementById("num2").value;
	var resul=parseInt(n1)-parseInt(n2);
	document.getElementById("r").innerHTML=resul;
	alert(resul);
}

function multiplicar(){
	const n1 =document.getElementById("num1").value;
	const n2 =document.getElementById("num2").value;
	var resul=parseInt(n1)*parseInt(n2);
	document.getElementById("r").innerHTML=resul;
	alert(resul);
}

function dividir(){
	const n1 =document.getElementById("num1").value;
	const n2 =document.getElementById("num2").value;
	var resul=parseInt(n1)/parseInt(n2);
	document.getElementById("r").innerHTML=resul;
	alert(resul);
}