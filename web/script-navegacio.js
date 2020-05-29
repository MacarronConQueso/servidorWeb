class ObjNavegacio {

    constructor () {
        this.seccioActual = 'frontendHome'
        this.dadesSeccio = null
    }

    // Si criden la pàgina des d'una secció, la mostrem enlloc de la pàgina princial
    inicia () {
        let path = document.URL.replace(document.location.origin, ''),
            arr = path.split('/')

        if (path !== '/') {
            this.canviaSeccio(path)
        }
    }

    // Canvia a una nova secció informant del canvi al navegador
    canviaSeccio (seccioNova) {

        // Informem al navegador del canvi de secció
        window.history.pushState( { html: seccioNova }, '', seccioNova)

        // Mostrem el canvi de seccio
        this.mostraSeccio(seccioNova)
    }

    // Amaga la secció anterior i mostra la nova
    mostraSeccio (seccioNova) {
        let arr = seccioNova.split('/'),
            refActual = document.getElementById(this.seccioActual),
            refNova = document.getElementById(arr[1]),
            objName = ''

        // S'amaga la seccio que estava visible i es mostra la que s'ha demanat
        refActual.style.display = 'none'
        refNova.style.display = 'flex'
        
        // La seccio actual passa a ser la que s'ha demanat
        this.seccioActual = arr[1]

        // Posiciona l'scroll de la pàgina a dalt
        document.body.scrollTop = 0

        // Neteja les dades de la seccio
        this.dadesSeccio = null

        // Executa la funció de càrrega d'aquesta secció si és necessari
        objName = 'ObjSeccio' + arr[1].charAt(0).toUpperCase() + arr[1].slice(1)
        if (eval('typeof ' + objName) === 'function') {
            seccio = eval('new ' + objName + '()')
            seccio.iniciaSeccio(arr[2])
        }
    }
}


