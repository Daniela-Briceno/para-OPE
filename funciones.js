function calcularMM1(tasaLlegada, tasaAtencion) {
    var Wq = (1 / (tasaAtencion - tasaLlegada)) * (1 / tasaAtencion);
    var W = Wq + (1 / tasaAtencion);
    var Lq = (tasaLlegada * tasaLlegada) / (tasaAtencion * (tasaAtencion - tasaLlegada));
    var L = Lq + (tasaLlegada / tasaAtencion);

    res1.textContent = '';
    resultado.textContent = 'M/M/1';
    res2.textContent = "\nTiempo promedio de espera en la cola (Wq): " + Wq + "\n";
    res3.textContent = "\nTiempo promedio de espera en el sistema (W): " + W + "\n";
    res4.textContent = "\nNúmero promedio de clientes en la cola (Lq): " + Lq + "\n";
    res5.textContent = "\nNúmero promedio de clientes en el sistema (L): " + L;

    return resultados;
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        var result = 1;
        for (var i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}

function calculateP0(tasaLlegada, tasaAtencion, servidores, rho) {
    var sum = 0;
    for (var k = 0; k <= servidores - 1; k++) {
        sum += (Math.pow((tasaLlegada / tasaAtencion), k) / factorial(k));
    }
    var ultimoTermino = (Math.pow((tasaLlegada / tasaAtencion), servidores) / factorial(servidores)) * (1 / (1 - rho));
    var P0 = 1 / (sum + ultimoTermino);

    return P0;
}

function calculateMMS(tasaLlegada, tasaAtencion, servidores) {
    var rho = tasaLlegada / (servidores * tasaAtencion);
    var P0 = calculateP0(tasaLlegada, tasaAtencion, servidores, rho);
    var Wq = (P0 * Math.pow((tasaLlegada / tasaAtencion), servidores) * (servidores * Math.pow(rho, servidores))) / (factorial(servidores) * Math.pow(1 - rho, 2));

    var W = Wq + (1 / tasaAtencion);
    var Lq = (P0 * Math.pow((tasaLlegada / tasaAtencion), servidores) * (servidores * rho)) / (factorial(servidores) * Math.pow(1 - rho, 2));
    var L = Lq + (tasaLlegada / tasaAtencion);

    resultado.textContent = 'M/M/s';
    res1.textContent = "\nProbabilidad de que un cliente deba esperar en la cola (P0): " + P0 + "\n";
    res2.textContent = "\nTiempo promedio de espera en la cola (Wq): " + Wq + "\n";
    res3.textContent = "\nTiempo promedio de espera en el sistema (W): " + W + "\n";
    res4.textContent = "\nNúmero promedio de clientes en la cola (Lq): " + Lq + "\n";
    res5.textContent = "\nNúmero promedio de clientes en el sistema (L): " + L;

    return resultados;
}

var modeloSelect = document.getElementById("modelo");
var calcularBtn = document.getElementById("calcular");
var result = document.getElementById("resultado");
var res1 = document.getElementById("res1");
var res2 = document.getElementById("res2");
var res3 = document.getElementById("res3");
var res4 = document.getElementById("res4");
var res5 = document.getElementById("res5");





modeloSelect.addEventListener("change", function() {
    var opcionSeleccionada = modeloSelect.value;

    if (opcionSeleccionada === "mm1") {
        calcularBtn.addEventListener("click", function() {
            var tasaLlegadaStr = document.getElementById("tasallegada").value;
            var tasaAtencionStr = document.getElementById("tasaatencion").value;

            var resultadosMM1 = calcularMM1(parseFloat(tasaLlegadaStr), parseFloat(tasaAtencionStr));
            result.textContent = resultadosMM1;
        });
    } else if (opcionSeleccionada === "mms") {
        calcularBtn.addEventListener("click", function() {
            var tasaLlegadaStr = document.getElementById("tasallegada").value;
            var tasaAtencionStr = document.getElementById("tasaatencion").value;
            var servidoresStr = document.getElementById("servidores").value;

            var resultadosMMS = calculateMMS(parseFloat(tasaLlegadaStr), parseFloat(tasaAtencionStr), parseFloat(servidoresStr));
            result.textContent = resultadosMMS;
        });
    }
});

calcularBtn.addEventListener("click", function() {
    var tasaLlegadaStr = document.getElementById("tasallegada").value;
    var tasaAtencionStr = document.getElementById("tasaatencion").value;

    var resultadosMM1 = calcularMM1(parseFloat(tasaLlegadaStr), parseFloat(tasaAtencionStr));
    result.textContent = resultadosMM1;
});