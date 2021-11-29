
const https = require('https')


const getMoeda = (dePara) => {
    const url = `https://economia.awesomeapi.com.br/all/${dePara}`
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let resultado = ''
            let status = res.statusCode

            res.on('data', dados => {
                resultado += dados
            })
            res.on('end', () => {
                try {
                    if (status >= 400 && status < 500){
                        throw new Error("PAGE NO FOUND")
                    }else if(status >=500){
                        throw new Error("SERVIDOR INACESSÍVEL")
                    }else{
                       resolve(JSON.parse(resultado))
                    }
                    
                } catch(e) {
                    reject(e)
                }
            })
        })
    })
}
    function error(error, id){
        document.getElementById(`${id}${id}`).innerHTML = error
        document.getElementById(`${id}${id}`).style.color = 'red'
        document.getElementById(`${id}${id}`).style.fontSize = '28px'

    }

    document.querySelectorAll('form').forEach((formulario, id) => {
        formulario = document.forms[id]
        formulario.onsubmit = function (e) {
            e.preventDefault()

            const atrib = document.getElementById(`${id}`).getAttribute('moeda')
            console.log(atrib)
            const atrib2 = (`${atrib}`).substring(0, 3)
            console.log(atrib2)
            let atrib3
            if(atrib2 === 'USD'){
                atrib3 = "Dolar"
            }else if(atrib2 === 'EUR'){
                atrib3 ="Euros"
            }else if(atrib2 === 'GBP'){
                atrib3 ="Libras"
            }else if(atrib2 === 'ARS'){
                atrib3 ="Pesos"
            }else if(atrib2 === 'BTC'){
                atrib3 ="BitCoins"
            }else if(atrib2 === 'LTC'){
                atrib3 ="Litecoins"
            }
            const form = e.target
            const formData = new FormData(form)
            const multiplicador = formData.get('valor')
            getMoeda(atrib)
                .then(dados => bid = dados[`${atrib2}`].bid)
                .then(bid => bidFloat = (parseFloat(`${bid}`)))
                .then(finalBid => (multiplicador / finalBid))
                .then(finalBid => document.getElementById(`${id}${id}`).innerHTML = `${atrib3}: ${finalBid.toFixed(2)}`)
                .catch(e => error(e, id))
        }
    })


