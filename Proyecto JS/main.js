//VARIABLES
var avionesjson={"c172":[1491.1 , 39.13], "sira":[1491.1 , 39.13], "pa11":[1491.1 , 39.13],"c152":[1491.1 , 39.13]};
var avionSelect = avionesjson.c172
$('select').change( function() {
    console.log( this.value );
  });
/*function select(){
    if (avionSelect == 'c152'|| avionSelect== 'sira'){
        $("#pasajeros").remove();
    }
}*/
var avionweight = avionesjson.c172[0];
var avionmoment = avionesjson.c172[1];
//$("#pilotweight").focus(alert("El peso maximo del piloto de 110 kg"));





function calcularcg()   {
    $(".resultado").empty();

    var seat1 = parseInt($("#pilotweight").val());
    var seat2 = parseInt($("#copilotweight").val());
    var seat3 = parseInt($("#pax1weight").val());
    var seat4 = parseInt($("#pax2weight").val());
    var fuelw = parseInt($("#fuel").val());

    
    /*
    if (avionSelect == 'c172') {
        var avionweight = avionesjson.c172[0];
        var avionmoment = avionesjson.c172[1];
    }else if (avionSelect == 'c152'){
        var avionweight = avionesjson.c152[0];
        var avionmoment = avionesjson.c152[1];  
    }else  {
        var avionweight = avionesjson.sira[0];
        var avionmoment = avionesjson.sira[1];
    }; 
    */


    //FUNCIONES

    function suma_asientos(elemento1,elemento2){
        return elemento1 + elemento2;
    };
    var sumapeso1 = (seat1 + seat2);
  
    var sumapeso2 = suma_asientos(seat3,seat4);


    var frontseats = [sumapeso1, 37];
    var rearseats = [sumapeso2, 73];
    var fuel = [fuelw, 47.9];

    //CALCULO DE MOMENTOS
    let emptymoment = avionweight * avionmoment;
    let fsmoment = frontseats[0] * frontseats[1];
    let rsmoment = rearseats[0] * rearseats[1];
    let fuelmoment = fuel[0] * fuel[1];
    //DEVOLUCION DE DATOS
    $("#momentocrew").append(fsmoment);    //Devuelve Momento Crew
    $("#momentopax").append(rsmoment);     //Devuelve Momento Pax    
    $("#momentofuel").append(fuelmoment);    //Devuelve Momento Fuel


    let grossweight = avionweight + frontseats[0] + rearseats[0] + fuel[0] ;
    let totalmoment = avionmoment + frontseats[1] + rearseats[1] + fuel[1] ;
    let cgposition = totalmoment/grossweight;
    console.log(grossweight);
    $("#weight").append(grossweight);
    $("#moment").append(totalmoment);
    $("#total").append(cgposition);

    if  (35<cgposition<47.3 && grossweight<2300) {
        $('#autorizacion').css("background-color","green").append("Dentro de los limites operativos");
    }else{
    $('#autorizacion').css("background-color","red").append("Fuera de los limites operativos");

    };
    
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++VALIDACION DE CMA++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function validacioncma(){
    $("#resultadopsicofisico").empty();
    var licenciaIngresada = $("#licencia").val();
    $.get("https://my.api.mockaroo.com/simulador_psicofisicos.json?key=004a98b0" ,function(datos){
    $(datos).each(function(i,piloto){
        //console.log(piloto.fecha);
        if(piloto.nlicencia == licenciaIngresada){
            console.log(piloto.fecha)
            $("#resultadopsicofisico").append(piloto.fecha);
        };
    });
    });
};


/*ALERTS*/

