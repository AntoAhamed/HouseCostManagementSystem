const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const bodyParser = require("body-parser")
const { body, validationResult } = require('express-validator') //server side validation
const bcrypt = require('bcrypt') //password hashing
const jwt = require('jsonwebtoken') //JWT authentication
const fetchuser = require('./middleware')

const jwt_secrate = "iamagoodboy"

const app = express()
const port = 8000

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

main().catch(err => console.log(err)); //DB connections starts from here

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/home-cost');
    console.log("Connection build successfully");
}

const usersSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    balance: { type: Number, default: 0.00 },
    limit: { type: Number, default: 0.00 }
});

const detailsSchema = new mongoose.Schema({
    month: { type: String },
    date: { type: String },
    time: { type: String },
    desc: { type: String },
    cost: { type: Number },
    email: { type: String }
});

const balancesSchema = new mongoose.Schema({
    month: { type: String },
    date: { type: String },
    time: { type: String },
    amount: { type: Number },
    email: { type: String }
});

const USERS = mongoose.model('users', usersSchema);

const DETAILS = mongoose.model('details', detailsSchema);

const BALANCES = mongoose.model('balances', balancesSchema);//DB connections ends here

app.get('/', cors(), function (req, res) {

})

app.post('/signup', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 })
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }

    /*const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    const userData = {
        name: name,
        email: email,
        password: secPass
    }

    const data = { user: { id: user.id } }
    const jwtData = jwt.sign(data, jwt_secrate);
    console.log(jwtData);

    const check = await USERS.findOne({ email: email });

    try {
        if (check) {
            res.json("failed");
        }
        else {
            await USERS.insertMany([userData]);
            res.json("success");
        }
    }
    catch (e) {
        console.log(e);
    }*/

    try {
        const { name, email, password } = req.body;

        let user = await USERS.findOne({ email: email });

        if (!user) {
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(password, salt);

            user = await USERS.create({
                name: name,
                email: email,
                password: secPass
            })

            const data = { user: { id: user.id } }
            const authToken = jwt.sign(data, jwt_secrate);

            res.json({ authToken });
        } else {
            res.json("failed");
        }
    } catch (e) {
        console.log(e);
    }

})

var tmpToken, tmpUser;

app.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 })
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }

    const { email, password } = req.body;

    /*for user login authentication
    const user = await USERS.findOne({ email: email });
    if (!user) {
        return res.json("not exists!");
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
        return res.json("not exists!");
    }
    const bigData = {
        id: user._id
    }
    const authToken = jwt.sign(bigData, jwt_secrate);
    console.log(authToken)

    tmpUser = email;

    const data = {
        email: email,
        password: password
    }

    const check = await USERS.findOne(data);

    try {
        if (check) {
            await USERS.findOne(data);
            res.json("success");
        }
        else {
            res.json("failed");
        }
    }
    catch (e) {
        console.log(e);
    }*/

    try {
        let user = await USERS.findOne({ email });
        if (user) {
            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                return res.json("not exists!");
            }
            const data = { user: { id: user.id } }
            const authToken = jwt.sign(data, jwt_secrate);

            const bigData = jwt.verify(authToken, jwt_secrate);
            const loggedUserId = bigData.user;

            const loggedUser = await USERS.findById(loggedUserId.id).select("-password");

            tmpUser = loggedUser.email;

            tmpToken = authToken;

            console.log({ loggedUser });
            res.json({ loggedUser });
        } else {
            res.json("failed");
        }
    } catch (e) {
        console.log(e);
    }

})

/*app.get('/get_logged_user', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await USERS.findById(userId).select("-password");

        tmpUser = user.email;

        res.send({ user: user });
        console.log(user);
    }
    catch (e) {
        console.log(e)
        res.json("f");
    }
})*/

app.get('/get_user', async (req, res) => {
    try {
        const userData = await USERS.findOne({ email: tmpUser });
        res.send({ user: userData });
    }
    catch (e) {
        console.log(e)
    }
})

app.get('/get_rem', async (req, res) => {
    const d = new Date();

    const m = d.getMonth();

    const totalBalanceOfCurrentMonth = await BALANCES.find({ month: m, email: tmpUser });

    let total = 0;

    for (let i = 0; i < totalBalanceOfCurrentMonth.length; i++) {
        total += totalBalanceOfCurrentMonth[i].amount;
    }

    try {
        res.send({ total })
    }
    catch (e) {
        console.log(e)
    }
})

app.post('/add_details', async (req, res) => {

    const { desc, cost, email } = req.body;

    const date = new Date();

    const user = await USERS.findOne({ email: email });

    const newBalance = Number(user.balance) - Number(cost);

    const data = {
        month: date.getMonth(),
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
        desc: desc,
        cost: cost,
        email: email
    }

    try {
        if (newBalance >= 0) {
            await DETAILS.insertMany([data]);
            await USERS.updateOne({ email: email }, { $set: { balance: newBalance } });
            res.json("success");
        } else {
            res.json("failed");
        }
    }
    catch (e) {
        console.log(e);
    }

})

app.post('/add_amount', async (req, res) => {
    const { amount, email } = req.body;

    const user = await USERS.findOne({ email: email });

    const date = new Date();

    const data = {
        month: date.getMonth(),
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
        amount: amount,
        email: email
    }

    const d = new Date();

    const m = d.getMonth();

    const limit = user.limit;

    const totalBalanceOfCurrentMonth = await BALANCES.find({ month: m, email: email });

    let total = 0, newBalance;

    for (let i = 0; i < totalBalanceOfCurrentMonth.length; i++) {
        total += totalBalanceOfCurrentMonth[i].amount;
    }

    try {
        if (total + Number(amount) <= limit) {
            newBalance = Number(user.balance) + Number(amount);
            await USERS.updateOne({ email: email }, { $set: { balance: newBalance } });
            await BALANCES.insertMany([data]);
            res.json("success");
        } else {
            res.json("failed");
        }
    }
    catch (e) {
        console.log(e);
    }
})

app.post('/change_limit', async (req, res) => {
    const { limit, email } = req.body;

    try {
        await USERS.updateOne({ email: email }, { $set: { limit: limit } });
        res.json("success");
    }
    catch (e) {
        console.log(e);
    }
})

app.get('/get_history', async (req, res) => {
    try {
        const details = await DETAILS.find({ email: tmpUser });
        res.send({ data: details });
    }
    catch (e) {
        console.log(e)
    }
})

app.get('/get_balance_history', async (req, res) => {
    try {
        const details = await BALANCES.find({ email: tmpUser });
        res.send({ data: details });
    }
    catch (e) {
        console.log(e)
    }
})

app.post('/remove', async (req, res) => {

    const { id, cost, email } = req.body;

    const user = await USERS.findOne({ email: email });

    const newBalance = Number(user.balance) + Number(cost);

    try {
        await USERS.updateOne({ email: email }, { $set: { balance: newBalance } });
        await DETAILS.deleteOne({ _id: id });
        res.json("success");
    }
    catch (e) {
        console.log(e);
    }

})

app.get('/getProgress', async (req, res) => {
    try {
        const user = await USERS.findOne({ email: tmpUser });
        const totalBalance = await BALANCES.find({ email: tmpUser });
        let tb = 0, prog;
        for (let i = 0; i < totalBalance.length; i++) {
            tb += totalBalance[i].amount;
        }
        if (tb !== 0) {
            prog = (user.balance * 100) / tb;
            res.send({ prog });
        } else {
            res.json("failed");
        }
    } catch (e) {
        console.log(e);
    }
})

//START THE SERVER
app.listen(port, () => {
    console.log(`Our app listening on port ${port}`)
})