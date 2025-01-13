const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('./config');
const pool = require('./db');
const router = express.Router();

router.get('', async (request, response) => {
    //1. Ottengo il token bearer mandato dal client
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token){
        return response.status(401).json({
            messaggio: 'Accesso negato.'
        })
    }

    jwt.verify(token, config.secretKey, async (err, refreshToken) => {
        if(err){
            //Il token non era valido 
            return response.status(401).json({
                messaggio: 'Token non valido.'
            })
        }

        if (refreshToken.tipo != 'refresh'){
            return response.status(401).json({
                messaggio: 'Token non valido.'
            })
        }


        //Il token è valido
        const stringSQL = "SELECT id FROM users WHERE username = ? AND ruolo = ?;";
        
        const [dati] = await pool.execute(stringSQL, [refreshToken.username, refreshToken.ruolo]);

        if (dati.length == 0) {
            return response.status(401).json({
                messaggio: 'Accesso non autorizzato.'
            })
        }
        else {
            let utente = dati[0];

            const tokenData = {
                username: username,
                ruolo: utente.ruolo,
                tipo: 'dati'
            }
    
            //Creo il token bearer
            const token1 = jwt.sign(tokenData, config.secretKey, {expiresIn:config.durataTokenBearer});
    
            return response.status(200).json({
                dati: {
                    tipo: 'Bearer',
                    durata: config.durataTokenBearer,
                    token: token1
                },
                refresh:{
                    tipo: 'Bearer',
                    durata: config.durataTokenBearer,
                    token: token
                }
            })
        }
    })
})

module.exports = router;
