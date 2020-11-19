$.get("https://my.api.mockaroo.com/simulador_psicofisicos.json?key=004a98b0" ,function(datos){
  $(datos).each(function(i,piloto){
      console.log(piloto.fecha);
  })
});