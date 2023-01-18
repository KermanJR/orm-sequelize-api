const database = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/authConfig.js')

class UserController{

    static async listarUsuarios(req, res){
        try{
            const usuarios = await database.Pessoas.findAll();
            if(usuarios.length != 0){
                return res.status(200).json({usuarios: usuarios});
            }else{
                return res.status(404).json({message: 'Nenhum usuário encontrado.'})
            }
        }catch(error){
            return res.status(500).json({message: `${error.message} - erro ao buscar usuários.`})
        }
    }

    static async listarUsuarioPorId(req, res){
        const { id } = req.params;
        try{
            const user = await database.Pessoas.findOne({
                where:{id: id}
            });
            if(user){
                return res.status(200).json(user)
            }else{
                return res.status(400).json({message: 'Usuário não encontrado.'})
            }
            
        }catch(err){
            return res.status(500).json(
                err.message
            )
        }
    }


    static async criarUsuario(req, res){
        const salt = bcrypt.genSaltSync(10);
        const data = req.body;
        await database.Pessoas.create({
            ...data,
            password: bcrypt.hashSync(data.password, salt)
        }).then(usuario=>{
            return res.status(202).json(
                {
                    message: 'usuário criado com sucesso',
                    usuario: {
                         nome: usuario.nome,
                        email: usuario.email,
                        tipo: usuario.role,
                        status: usuario.ativo
                    }
                }
            )
        }).catch(err=>{
            return res.status(500).json({message: err.message})
        }) 
    }


     static async loginUsuario(req, res){
        const { email, password } = req.body;
            try{
                await database.Pessoas.findOne({
                    where: {
                        email: email
                    }
                }).then(user=>{
                    if(!user){
                        return res.status(404).json({message: 'Usuário  não encontrado!'})
                    }

                    let checkPassword = bcrypt.compareSync(
                        password,
                        user.password
                    )

                    if(!checkPassword){
                        return res.status(401).json({message: 'Senha inválida!'})
                    }

                    let token = jwt.sign({ id: user.id }, config.secret, {
                        expiresIn: 3600
                    })

                    res.status(200).json(
                        {
                            accessToken: token,
                            expiresIn: 3600,
                            usuario: {
                                id: user.id,
                                email: user.email,
                                nome: user.nome,
                                ativo: user.ativo,
                                tipo: user.role
                            }
                        });
                })
            }catch(error){
                return res.status(500).json(error.message)
            }
    }


    static async atualizarUsuario(req, res){
        const {nome, ativo, email, role} = req.body;
        const { id } = req.params;
        try{
            await database.Pessoas.update(
                {
                    nome: nome,
                    ativo: ativo,
                    email: email,
                    role: role,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    where:{id: id}
                }
            )

            const updatedUser = await database.Pessoas.findOne({
                where:{
                    id: id
                }
            })
            return res.status(202).json({message: 'usuário atualizado com sucesso', usuario: updatedUser})
        }catch(error){
            return res.status(500).json(error.message)
        }
    }


    static async deletarUsuario(req, res){
        const { id } = req.params;
        try{
            const user = await database.Pessoas.findOne({
                where:{id: id}
            });
            if(user){
                await user.destroy({
                    truncate: true
                })
                return res.status(200).json({message: 'Usuário deletado com sucesso', usuario: user})
            }else{
                return res.status(400).json({message: 'Usuário não encontrado.'})
            }
            
        }catch(err){
            return res.status(500).json(
                err.message
            )
        }
    }
}

module.exports = UserController;