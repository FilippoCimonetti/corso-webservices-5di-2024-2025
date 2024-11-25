// Creo una costante che prende come valore il package express
const express = require('express');
// Ripeto la stessa operazione per le altre librerie
// NB: per le libreris installate con npm install, fra apici si scrive solo il nomde della 
// libreria (nome usato con npm) senza specificare il percorso
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Import gli oggetti/funzioni dichiarate in altri file
// Per i nostri oggetti, funzioni, costanti, ecc. è necessario
// speficicare il percorso per raggiungere il file
const config = require('./config');

// Elenco dei require per i router che gestiscono le diverse risorse del mio webservice
const rUsers = require('./users');
const rInit = require('./init');
const rLogin = require('./login');
// Creo l'applicazione express
const app = express();

// Aggiungo moduli middleware alla catena di elaborazione
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Aggiungo la libreria CORS: Aggiunge nell'intestazione della response
// Una riga che consente ad applicazioni ospitate su altri domini di accedere al webservice
app.use(cors());

// Pubblico il sito web di help contenuto nella cartella chiamata public
app.use('', express.static('public'));
app.use('/init', rInit);
app.use('/users', rUsers);
app.use('/login', rLogin);
// Implemento il metodo per l'inizializzazione del database


// ... implemento metodi CRUD

app.use('/users', rUsers);

// Metto in ascolto la mia applicazione express sulla porta scelta per il webservice: 4444

const server = app.listen(config.port, () => {
    console.log('Server in ascolto sulla porta ' + config.port + '...');
})