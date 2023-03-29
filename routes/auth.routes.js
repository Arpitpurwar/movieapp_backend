const {signUp, signIn} = require('../controller/auth.controller');


module.exports = (app) => {
    app.post('/mba/api/v1/signup', signUp);
    app.post('/mba/api/v1/signin', signIn);
}