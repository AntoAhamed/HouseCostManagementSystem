const jwt = require('jsonwebtoken');
const jwt_secrate = "iamagoodboy";

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.send({ error: "wrong" })
    }
    try {
        const data = jwt.verify(token, jwt_secrate);
        req.user = data.user;
        next();
    } catch (e) {
        console.log(e);
    }
}
module.exports = fetchuser;