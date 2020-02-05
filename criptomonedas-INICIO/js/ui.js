class Interfaz {

  constructor(){
    this.init()
  }
  init() {
    this.construirSelect()
  }

  construirSelect(){
    apiKey.obtenerMonedasAPI()
      .then(monedas => {

        //crear un selec de opciones -- toma el elemento 
        const select = document.querySelector('#criptomoneda')

        //iterar por los resultados de la api
        //llave y valor del objeto lo recorres con of 
        //donde key es el nombre de la criptomoneda
        //value son sus datos
        for(const [key, data] of Object.entries(monedas.monedas.Data)) {
          //añadir el Symbol y el nombre como opciones 
          const opcion = document.createElement('option')
          opcion.value = data.Symbol
          opcion.appendChild(document.createTextNode(data.CoinName))
          select.appendChild(opcion)
        }

        //toma el objeto y lo convierte a un array -- no recorre todos los objetos
        //toma la llave y su valor y los retorna en un arreglo
        //console.log(Object.entries(monedas.monedas.Data))
      })
  }

  mostrarMensaje(mensaje, clases) {
    const div = document.createElement('div')
    div.className = clases
    div.appendChild(document.createTextNode(mensaje))

    //seleccionar mensajes
    const divMensaje = document.querySelector('.mensajes')
    divMensaje.appendChild(div)
    //mostrar contenido
    setTimeout(() => {
      document.querySelector('.mensajes div').remove()
    }, 3000 )
  }

  //Imprime el resultado de la cotizacion
  mostrarResultado(resultado, moneda, criptomoneda) {

    //en caso de un resultado anterior, ocultarlo
    const resultadoAnterior = document.querySelector('#resultado > div')
    if(resultadoAnterior) {
      resultadoAnterior.remove()
    } 

    console.log(resultado[criptomoneda][moneda])
   const datosMoneda = resultado[criptomoneda][moneda]

   //recortar digitos de precio
   let precio = datosMoneda.PRICE.toFixed(2)
   let porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2)
   let actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-MX')

    //construir el template
    let templateHTML = `
              <div class="card bg-warning">
                <div class="card-body text-light">
                  <h2 class="card-title">Resultado:</h2>
                  <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL}
                      es de: $ ${precio}    
                  </p>
                  <p>Variacion del ultimo dia: % ${porcentaje}</p>
                  <p>Ultima actualizacion: ${actualizado}</p>
                </div>
              </div> 
    `

    //insertar spinner
    this.mostrarOcultarSpinner('block')
    
    //insertar el resultado
    setTimeout(() => {
      document.querySelector('#resultado').innerHTML = templateHTML

      //ocultar spinner
      this.mostrarOcultarSpinner('none')
    },2000)

  }

  //Mostrar un spinner de carga al pedir la cotizacion
  mostrarOcultarSpinner(vista) {
    const spinner = document.querySelector('.contenido-spinner')
    spinner.style.display = vista
  }

}