
class ObjSeccioFrontendProducte {

    constructor () {
    }

    async iniciaSeccio (idProducte) {
        let refLoading = document.getElementById('producteLoading'),
            refContinguts = document.getElementById('producteContinguts'),
            objRebut = null,
            valor = null,
            codiHTML = '',
            cntProducte = 0

        // Amaguem els continguts actuals i mostrem la càrrega
        refContinguts.style.display = 'none'
        refLoading.style.display = 'flex'
        
        // Demanem el llistat de productes al servidor
        objRebut = await promiseCallServer('POST', '/call/llistatProductes', { id: idProducte })

        // Transformem l'objecte rebut en codi HTML
        if (objRebut.resultat === 'ok' && objRebut.missatge.length === 1) {
            valor = objRebut.missatge[0]
            codiHTML = codiHTML + '<div class="detall">'
            codiHTML = codiHTML + '<img src="' + valor.imatge + '" width="600px";max-height:200px;align-items: center; />'
            codiHTML = codiHTML + '<h3>' + valor.nom +'</h3>'
            codiHTML = codiHTML + '<div class="descripcioproducte"><h5>' + valor.descripcio +'</h5></div>'
            codiHTML = codiHTML + '<div class="valorproducte"><h4>' + valor.preu +' €</h4></div>'
            codiHTML = codiHTML + '</div>'
        }

        // Amaguem la càrrega i mostrem el llistat de productes
        refContinguts.innerHTML = codiHTML
        refContinguts.style.display = 'flex'
        refLoading.style.display = 'none'
    }
}