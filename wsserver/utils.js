const config = require ('./config');

function correctRequestData(body, table){
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

function getColumns(dati){
    return Object.keys(dati);
}

function getValues(dati){
    return Object.values(dati);
}

function setInsertFields(){
    // (nome, cognome, ...)
    return '(' + getColumns(dati).join(', ') + ')';
}

function setInsertPlaceholders(dati){
    return '(' + getColumns(dati).map(() => '?').join(', ') + ')';
}

function setUpdateFields(dati){
    return getColumns(dati).map(field => field + '=?')                                      
}
module.exports = {correctRequestData, getColumns, getValues, setInsertFields, setInsertPlaceholders, setUpdateFields}