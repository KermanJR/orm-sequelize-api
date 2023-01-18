const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');
const { checkDuplicateEmailOrName } = require('../middleware/verifySignup.js');

const router = Router();
router
    .get('/usuarios', PessoaController.listarUsuarios)
    .get('/usuarios/:id', PessoaController.listarUsuarioPorId)
    .post('/usuarios', [checkDuplicateEmailOrName], PessoaController.criarUsuario)
    .delete('/usuarios/:id', PessoaController.deletarUsuario)
    .put('/usuarios/:id', PessoaController.atualizarUsuario)
    .post('/usuarios/login', PessoaController.loginUsuario)
    

module.exports = router;