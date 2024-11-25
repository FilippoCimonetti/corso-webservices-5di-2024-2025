const jwt  = require('jsonwebtoken');
const config = require('./require');
const pool = require('./db');

function adminAuth(request, response, next){
    //Leggo il nome nel campo authorization
    const authHeader = request.headers['authorization'];
    //Se esiste authHeader, lo splitto [essendo una stringa] tramite spaziatura e prendo il secondo valore
    //Il valore saràroba del tipo: Bearer JSDHWINONSCOJM...
    const token = authHeader && authHeader.split(' ').[1];
    
    if (!token){
        return response.status(401).json({
            messaggio: 'Accesso negato.'
        })
    }
    
}