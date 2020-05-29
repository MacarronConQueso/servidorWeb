'use strict'
class Obj {

    constructor () {
    }

    // Inicia l'objecte
    init () {
        // TODO
    }

    async llistat (db, utils, data, result) {

        let sql = '',
            taulaProductesExisteix = false,
            taula = null
    
        // Forçem una espera al fer login amb codi, perquè es vegi la càrrega (TODO: esborrar-ho)
        await utils.promiseWait(1000) 
        
        // Mira si la taula "productes" existeix
        try {
            taulaProductesExisteix = await db.promiseTableExists('productes')
        } catch (e) {
            console.warn('Avis, funció login: la taula "productes" no existeix')
        }
    
        // Si la taula "productes" no existeix, en crea una i afegeix productes
        if (!taulaProductesExisteix) {
            try {
                sql = 'CREATE TABLE productes (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, nom VARCHAR(50) NOT NULL, descripcio TEXT, preu INT(6), imatge VARCHAR(255))'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("Nova York", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis sed erat vulputate eleifend. Etiam a enim nulla. Aliquam vulputate nisl in odio fermentum placerat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec iaculis sem malesuada ipsum aliquet imperdiet. Vivamus sem dolor, porttitor eu hendrerit sit amet, consectetur eu dolor. Vivamus sit amet laoreet massa. Suspendisse potenti. Duis ac nisl mollis, pretium odio ac, sodales sapien. Nam dolor velit, lobortis in mattis vitae, commodo consectetur risus.", 850, "/web/imatges/nuevayork.jpg")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("Roma", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis sed erat vulputate eleifend. Etiam a enim nulla. Aliquam vulputate nisl in odio fermentum placerat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec iaculis sem malesuada ipsum aliquet imperdiet. Vivamus sem dolor, porttitor eu hendrerit sit amet, consectetur eu dolor. Vivamus sit amet laoreet massa. Suspendisse potenti. Duis ac nisl mollis, pretium odio ac, sodales sapien. Nam dolor velit, lobortis in mattis vitae, commodo consectetur risus.", 550, "/web/imatges/Roma-bridge-river-city-sunset_3840x2160.jpg")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("México", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis sed erat vulputate eleifend. Etiam a enim nulla. Aliquam vulputate nisl in odio fermentum placerat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec iaculis sem malesuada ipsum aliquet imperdiet. Vivamus sem dolor, porttitor eu hendrerit sit amet, consectetur eu dolor. Vivamus sit amet laoreet massa. Suspendisse potenti. Duis ac nisl mollis, pretium odio ac, sodales sapien. Nam dolor velit, lobortis in mattis vitae, commodo consectetur risus.", 720, "/web/imatges/cancun-en-mexico-4605.jpg")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("Mallorca", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis sed erat vulputate eleifend. Etiam a enim nulla. Aliquam vulputate nisl in odio fermentum placerat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec iaculis sem malesuada ipsum aliquet imperdiet. Vivamus sem dolor, porttitor eu hendrerit sit amet, consectetur eu dolor. Vivamus sit amet laoreet massa. Suspendisse potenti. Duis ac nisl mollis, pretium odio ac, sodales sapien. Nam dolor velit, lobortis in mattis vitae, commodo consectetur risus.", 400, "/web/imatges/mallorca.jpg")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("Praga", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis sed erat vulputate eleifend. Etiam a enim nulla. Aliquam vulputate nisl in odio fermentum placerat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec iaculis sem malesuada ipsum aliquet imperdiet. Vivamus sem dolor, porttitor eu hendrerit sit amet, consectetur eu dolor. Vivamus sit amet laoreet massa. Suspendisse potenti. Duis ac nisl mollis, pretium odio ac, sodales sapien. Nam dolor velit, lobortis in mattis vitae, commodo consectetur risus.", 540, "/web/imatges/praga.jpg")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("London", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mattis sed erat vulputate eleifend. Etiam a enim nulla. Aliquam vulputate nisl in odio fermentum placerat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec iaculis sem malesuada ipsum aliquet imperdiet. Vivamus sem dolor, porttitor eu hendrerit sit amet, consectetur eu dolor. Vivamus sit amet laoreet massa. Suspendisse potenti. Duis ac nisl mollis, pretium odio ac, sodales sapien. Nam dolor velit, lobortis in mattis vitae, commodo consectetur risus.", 600, "/web/imatges/londres.jpg")'
                await db.promiseQuery(sql)
            } catch (e) {
                console.error(e)
                return result.json({ resultat: "ko", missatge: "Error, funció llistatProductes: no s'ha pogut crear la taula productes"})  
            }
        }
    
        // Demana la informació de productes
        if (data.id) {
            try {
                sql = 'SELECT * FROM productes WHERE id=' + data.id
                taula = await db.promiseQuery(sql)
            } catch (e) {
                console.error(e)
                return result.json({ resultat: "ko", missatge: "Error, funció llistatProductes: ha fallat la crida a les dades"})  
            }
        } else {
            try {
                sql = 'SELECT * FROM productes'
                taula = await db.promiseQuery(sql)
            } catch (e) {
                console.error(e)
                return result.json({ resultat: "ko", missatge: "Error, funció llistatProductes: ha fallat la crida a les dades"})  
            }
        }
    
        // Si l'usuari existeix i s'ha identificat correctament (amb codi o amb token) retornem 'ok'
        if (typeof taula === 'object' && typeof taula.length === 'number') {
            result.json({ resultat: "ok", missatge: taula })
        } else {
            result.json({ resultat: "ko", missatge: [] })
        }
    }
}

// Export
module.exports = Obj