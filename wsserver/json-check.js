function parseJSON(err, request, response, next){
    if(err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return response.status(400).json({
            messaggio: 'JSON malformato.'
        })
    }
    next();
}

module.exports = parseJSON