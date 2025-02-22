const config = {
    port: 4444,
    initSecret: '',
    initDB: {
        host: 'dbserver',
        user: 'root',
        password: '',
        multipleStatements: true,
        port: 3306,
    },
    secretKey: 'riccijoshualorenzo',
    durataTokenBearer: 3600,
    durataTokenBearer2: 84600,
    saltOrRounds: 10,
    tabelle: {
        users: ['id', 'nome', 'cognome', 'indirizzo', 'cap', 'citta', 'provincia', 'telefono', 'cell', 'mail', 'username', 'password', 'ruolo']
    }
}

// Esport la costante config in modo che possa essere utilizzata in altri file javascript
module.exports = config;