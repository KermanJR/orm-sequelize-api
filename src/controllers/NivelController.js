
const database = require('../models');

class NivelController {

    static async getAllLevels(req, res) {
      try {
        const todosOsNiveis = await database.Niveis.findAll()
        return res.status(200).json(todosOsNiveis)
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async getLevelById(req, res){
      const { id } = req.params;
      try {
        const level = await database.Niveis.findOne({
          where:{id: id}
        });
        return res.status(200).json({nivel: level})
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async updateLevel(req, res){
      const { descr_nivel } = req.body;
      const { id } = req.params;
      try{
          await database.Niveis.update(
              {
                  descr_nivel: descr_nivel,
                  createdAt: new Date(),
                  updatedAt: new Date()
              },
              {
                  where:{id: id}
              }
          )

          const updatedLevel = await database.Niveis.findOne({
              where:{
                  id: id
              }
          })
          return res.status(202).json({message: 'Nível atualizado com sucesso', nivel: updatedLevel})
      }catch(error){
          return res.status(500).json(error.message)
      }
  }

    static async createLevel(req, res){
      const body = req.body;
      try{
        const newLevel = database.Niveis.create(body);
        res.status(202).json({
          message: 'Nível criado com sucesso.', Nível: newLevel
        })
      }catch(error){
        res.status(500).json({message: error.message})
      }
    }


    static async deleteLevel(req, res){
      const { id } = req.params;
      try{
          const level = await database.Niveis.findOne({
              where:{id: id}
          });
          if(level){
              await level.destroy({
                  truncate: true
              })
              return res.status(200).json({message: 'Nível deletado com sucesso'})
          }else{
              return res.status(400).json({message: 'Nível não encontrado.'})
          }
          
      }catch(err){
          return res.status(500).json(
              err.message
          )
      }
  }
}

module.exports = NivelController;