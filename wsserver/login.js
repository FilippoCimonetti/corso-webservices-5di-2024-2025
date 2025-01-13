const express = require('express');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');

const pool = require('./db');
const config = require('./config');

const router = express.Router();

router.post('', async (request, response) => {
    //1. Recupero le credenziali inviate dall'utente nel body
    let username = request.body.username;
    let password = request.body.password;

    //2. Controlle se nella tabella users è presente un utente con questo username
    const sqlString = 'SELECT username, password, ruolo FROM users WHERE username = ?;';

    try {
       
        const [dati] = await pool.execute(sqlString, [username]);
        if (!dati){
            return response.status(401).json({
                messaggio: 'Username o password errati.'
            });
        }

        //L'utente esiste
        let utente = dati[0];

        //Controllo la password
        if(!bcrypt.compareSync(password, utente.password)){
            //La password è sbagliata
            return response.status(401).json({
                messaggio: 'Password non valida.'
            });
        }

        //Username e password sono corretti
        //Creo il token bearer

        const tokenData = {
            username: username,
            ruolo: utente.ruolo,
            tipo: 'dati'
        }

        const tokenRefresh = {
            username: username,
            ruolo: utente.ruolo,
            tipo: 'refresh'
        }

        //Creo il token bearer
        const token1 = jwt.sign(tokenData, config.secretKey, {expiresIn:config.durataTokenBearer});
        const token2 = jwt.sign(tokenRefresh, config.secretKey, {expiresIn:config.durataTokenBearer2});

        return response.status(200).json({
            dati: {
                tipo: 'Bearer',
                durata: config.durataTokenBearer,
                token: token1
            },
            refresh:{
                tipo: 'Bearer',
                durata: config.durataTokenBearer,
                token: token2
            }
        })
        
    }
    catch (error){
        response.status(500).json({
            errore: 'Errore interno del server.',
            descrizione: error
        })
    }
})
module.exports = router