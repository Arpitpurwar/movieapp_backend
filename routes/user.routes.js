const {updatePassword, updateProfile} = require('../controller/user.controller');
const {verifyToken, isAdmin} = require('../middleware/auth')

module.exports = (app) => {
    app.put('/mba/api/v1/updatePassword', verifyToken, updatePassword);
    app.put('/mba/api/v1/updateProfile', [verifyToken, isAdmin], updateProfile);
}