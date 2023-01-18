const verifySignup = require('../middleware/verifySignup.js');
const controller = require('../controllers/PessoaController.js');

module.exports = (app)=>{
    app.use((req, res, next)=>{
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })
}