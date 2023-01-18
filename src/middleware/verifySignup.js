const database = require('../models');
const Pessoas = database.Pessoas;

const checkDuplicateEmailOrName = async (req, res, next)=>{
    const {nome, email} = req.body;
    await Pessoas.findOne({
        where:{
            nome: nome
        }
    }).then(usuario=>{
        if(usuario){
            res.status(400).send({message: 'Já existe um usuário com este nome.'})
        }
        return;
    })

    await Pessoas.findOne({
        where:{
            email: email
        }
    }).then(usuario=>{
        if(usuario){
            res.status(400).send({message: 'Já existe um usuário com este e-mail.'})
        }
        return;
    })
    next();
}
    
const verifySignup = {
    checkDuplicateEmailOrName: checkDuplicateEmailOrName
}

module.exports = verifySignup;