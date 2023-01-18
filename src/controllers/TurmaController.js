
const database = require('../models');

class TurmaController {

    static async listarTurmas(req, res){
      try {
        const turmas = await database.Turmas.findAll()
        return res.status(200).json(turmas)
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async getTurmaById(req, res){
      const { id } = req.params;
      try {
        const turma = await database.Turmas.findOne({
          where:{id: id}
        });
        return res.status(200).json({turma: turma})
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async updateTurma(req, res){
      const { nivel_id, docente_id } = req.body;
      const { id } = req.params;
      try{
          await database.Turmas.update(
              {
                  nivel_id: nivel_id,
                  docente_id: docente_id,
                  createdAt: new Date(),
                  updatedAt: new Date()
              },
              {
                  where:{id: id}
              }
          )

          const updatedTurma = await database.Turmas.findOne({
              where:{
                  id: id
              }
          })
          return res.status(202).json({message: 'Nível atualizado com sucesso', turma: updatedTurma})
      }catch(error){
          return res.status(500).json(error.message)
      }
  }

    static async createTurma(req, res){
      const body = req.body;
      try{
        const newClass = database.Turmas.create(body);
        console.log(newClass)
        res.status(202).json({
          message: 'Turma criada com sucesso', turma: newClass
        })
      }catch(error){
        res.status(500).json({message: error.message})
      }
    }


        static async deleteTurma(req, res){
          const { id } = req.params;
          try{
              const turma = await database.Turmas.findOne({
                  where:{id: id}
              });
              if(turma){
                  await turma.destroy({
                      truncate: true
                  })
                  return res.status(200).json({message: 'Turma deletada com sucesso'})
              }else{
                  return res.status(400).json({message: 'Turma não encontrada.'})
              }
              
          }catch(err){
              return res.status(500).json(
                  err.message
              )
          }
      }
}

module.exports = TurmaController;