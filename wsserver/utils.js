const config = require ('./config');

function getFields(body, table){
    // const fields = Object.keys(body);
    // console.log(fields);
    // const corretti = fields.filter(field => config.tabelle[table].includes(fields));
    // console.log(corretti);
    // const oggettoCorretto = corretti.reduce((oggettoDaRicostruire, field) => {
    //     oggettoDaRicostruire[field] = body[field]
    //     return oggettoDaRicostruire
    // }, {});
    // console.log(oggettoCorretto);
    // return;
    return Object.keys(body).filter(field => config.tabelle[table].includes(field)).reduce((newObject, field) => {
        newObject[field] = body[field];
        return newObject;
    }, {})
}

module.exports = {getFields}