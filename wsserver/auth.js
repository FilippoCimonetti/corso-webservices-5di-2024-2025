const jwt  = require('jsonwebtoken');
const config = require('./');
const pool = require('./db');

function adminAuth(request, response, next){
    //Leggo il nome nel campo authorization
    const authHeader = request.headers['authorization'];
    //Se esiste authHeader, lo splitto [essendo una stringa] tramite spaziatura e prendo il secondo valore
    //Il valore saràroba del tipo: Bearer JSDHWINONSCOJM...
    const token = authHeader && authHeader.split(' ')[1];
    
    //Mando un messaggio di errore al client perché il server non ha ricevuto un token
    if (!token){
        return response.status(401).json({
            messaggio: 'Accesso negato.'
        })
    }
    
    jwt.verify(token, config.secretKey, async (err, datiToken) => {
        if(err){
            //Il token non era valido 
            return response.status(401).json({
                messaggio: 'Token non valido.'
            })
        }

        if (datiToken.tipo != 'dati'){
            return response.status(401).json({
                messaggio: 'Token non valido.'
            })
        }


        //Il token è valido
        const stringSQL = "SELECT id FROM users WHERE username = ? AND ruolo = administrator";
        
        const [dati] = await pool.execute(stringSQL, [datiToken.username]);

        if (dati.length == 0) {
            return response.status(401).json({
                messaggio: 'Accesso non autorizzato.'
            })
        }
        else {
            //Token è valido e l'utente è amministratore
            next();
        }
    })
}


function userAuth(request, response, next){
    //Leggo il nome nel campo authorization
    const authHeader = request.headers['authorization'];
    //Se esiste authHeader, lo splitto [essendo una stringa] tramite spaziatura e prendo il secondo valore
    //Il valore saràroba del tipo: Bearer JSDHWINONSCOJM...
    const token = authHeader && authHeader.split(' ')[1];
    
    //Mando un messaggio di errore al client perché il server non ha ricevuto un token
    if (!token){
        return response.status(401).json({
            messaggio: 'Accesso negato.'
        })
    }
    
    jwt.verify(token, config.secretKey, async (err, user) => {
        if(err){
            //Il token non era valido 
            return response.status(401).json({
                messaggio: 'Token non valido.'
            })
        }
        //Il token è valido
        const stringSQL = "SELECT id FROM users WHERE username = ? AND ruolo = administrator";
        
        const [dati] = await pool.execute(stringSQL, [user.username]);

        if (dati.length == 0) {
            return response.status(401).json({
                messaggio: 'Accesso non autorizzato.'
            })
        }
        else {
            //Token è valido e l'utente è amministratore
            next();
        }
    })
}

module.exports = {adminAuth, userAuth};