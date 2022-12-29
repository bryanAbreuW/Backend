const MacadressValidetion = (req, res, next ) => {
    if(!req.body.macadress)
        return res.status(400).json({error : 'Macadress é obrigatorio'});
            else
        next();
}

module.exports = MacadressValidetion;