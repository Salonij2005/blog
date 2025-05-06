const basicAuth = require('basic-auth');

const ADMIN_USER = 'Saloni_j'; // Change as needed
const ADMIN_PASS = 'Saloni@12blog'; // Change as needed

function auth(req, res, next) {
    const user = basicAuth(req);
    if (!user || user.name !== ADMIN_USER || user.pass !== ADMIN_PASS) {
        res.set('WWW-Authenticate', 'Basic realm="401"');
        return res.status(401).send('Authentication required.');
    }
    next();
}

module.exports = auth;
