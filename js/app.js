const apiKey = new API('e0c8b324ea120688e2c91a71e9f2565ad4418fc505010fd4b776e6913e2f85c1')
const ui = new Interfaz()

$(document).ready(() => {
  $('#formulario').submit((e) => {
    e.preventDefault()

    //leer la moneda seleccionada
    const monedaSelect =  document.querySelector('#moneda')
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value

    //leer la Criptomoneda seleccionada
    const criptoMonedaSelect =  document.querySelector('#criptomoneda')
    const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value


    //comprobar que ambos campos tengan algo seleccionado
    if(monedaSeleccionada === '' || criptoMonedaSeleccionada === '') {
      //arrojar una alerta de error
      ui.mostrarMensaje('Ambos campos son obligatorios', 'alert bg-danger text-center')
    }else {
      //todo bien, naisuuu -- consulta API
      apiKey.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
        .then(data => {
          ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, criptoMonedaSeleccionada)
        })
    }


  })
})

