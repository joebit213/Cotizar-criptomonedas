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

        //iteerar por los resultados de la api
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

        //toma el objeto y lo convierte a un array -- no rrecorre todos los objetos
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
    console.log(resultado[criptomoneda])
  }
}