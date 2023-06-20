function calcularMM1(tasaLlegada, tasaAtencion) {
    var p = tasaLlegada/tasaAtencion;
    var Wq = tasaLlegada/(tasaAtencion*(tasaAtencion-tasaLlegada));
    var W =1 / (tasaAtencion-tasaLlegada);
    var Lq = ((tasaLlegada/tasaAtencion) * (tasaLlegada/tasaAtencion)) / (1 -(tasaLlegada/tasaAtencion));
    var L = tasaLlegada / (tasaAtencion- tasaLlegada);

    res1.textContent = '';
    resultado.textContent = 'M/M/1';
    res2.textContent = "\n(Wq)Tiempo promedio de espera en la cola (minutos): " + Wq + "\n";
    res3.textContent = "\n(Ws)Tiempo promedio de espera en el sistema (minutos): " + W + "\n";
    res4.textContent = "\n(Lq)Número promedio de clientes en la cola: " + Lq + "\n";
    res5.textContent = "\n(Ls)Número promedio de clientes en el sistema: " + L;

    return true;
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
    var p = tasaLlegada / (servidores*tasaAtencion);
    var P0 = calculateP0(tasaLlegada, tasaAtencion, servidores, p);
    var Lq = ((tasaAtencion*tasaLlegada)*(Math.pow(tasaLlegada/tasaAtencion,servidores))*P0) / ((factorial(servidores-1) * Math.pow(servidores*tasaAtencion-tasaLlegada, 2)));
    var L = (((tasaAtencion*tasaLlegada)*(Math.pow(tasaLlegada/tasaAtencion,servidores)))/((factorial(servidores-1))*(Math.pow(servidores*tasaAtencion-tasaLlegada,2))))*P0 + (tasaLlegada/tasaAtencion);
    var Wq = (tasaAtencion*(Math.pow(tasaLlegada/tasaAtencion,servidores))*P0)/((factorial(servidores-1))*(Math.pow(servidores*tasaAtencion-tasaLlegada,2)));
    var W = (tasaAtencion*(Math.pow(tasaLlegada/tasaAtencion,servidores)))/((factorial(servidores-1))*(Math.pow(servidores*tasaAtencion-tasaLlegada,2)))*P0 +(1/tasaAtencion);


    resultado.textContent = 'M/M/s';
    res1.textContent = "\n(P0)Probabilidad de que haya al menos un cliente en la cola : " + P0 + "\n";
    res2.textContent = "\n(Wq)Tiempo promedio de espera en la cola (minutos): " + Wq + "\n";
    res3.textContent = "\n(Ws)Tiempo promedio de espera en el sistema (minutos): " + W + "\n";
    res4.textContent = "\n(Lq)Número promedio de clientes en la cola : " + Lq + "\n";
    res5.textContent = "\n(Ls)Número promedio de clientes en el sistema : " + L;

    return true;
}

var modeloSelect = document.getElementById("modelo");
var calcularBtn = document.getElementById("calcular");
var result = document.getElementById("resultado");
var res1 = document.getElementById("res1");
var res2 = document.getElementById("res2");
var res3 = document.getElementById("res3");
var res4 = document.getElementById("res4");
var res5 = document.getElementById("res5");
var inputservidores = document.getElementById("servidores");
inputservidores.disabled = true;

modeloSelect.addEventListener("change", function() {
    var opcionSeleccionada = modeloSelect.value;
    if (opcionSeleccionada == "mm1" || opcionSeleccionada != "mms") {
        inputservidores.disabled = true;
        calcularBtn.addEventListener("click", function() {
            var tasaLlegadaStr = document.getElementById("tasallegada").value;
            var tasaAtencionStr = document.getElementById("tasaatencion").value;

            var resultadosMM1 = calcularMM1(parseFloat(tasaLlegadaStr), parseFloat(tasaAtencionStr));
            //result.textContent = resultadosMM1;
        });
    } else if (opcionSeleccionada == "mms") {
        inputservidores.disabled = false;
        calcularBtn.addEventListener("click", function() {
            var tasaLlegadaStr = document.getElementById("tasallegada").value;
            var tasaAtencionStr = document.getElementById("tasaatencion").value;
            var servidoresStr = document.getElementById("servidores").value;

            var resultadosMMS = calculateMMS(parseFloat(tasaLlegadaStr), parseFloat(tasaAtencionStr), parseFloat(servidoresStr));
            //result.textContent = resultadosMMS;
        });
    }
});

calcularBtn.addEventListener("click", function() {
    var tasaLlegadaStr = document.getElementById("tasallegada").value;
    var tasaAtencionStr = document.getElementById("tasaatencion").value;
    var resultadosMM1 = calcularMM1(parseFloat(tasaLlegadaStr), parseFloat(tasaAtencionStr));
    //result.textContent = resultadosMM1;
});
