const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const bodyParser = require("body-parser")
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

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    balance: Number
});

const detailsSchema = new mongoose.Schema({
    month: String,
    date: String,
    time: String,
    desc: String,
    cost: String,
    email: String
});

const USER = mongoose.model('user', userSchema);

const DETAILS = mongoose.model('details', detailsSchema); //DB connections ends here

app.get('/', cors(), function (req, res) {

})

app.post('/signup', async (req, res) => {

    const { name, email, password } = req.body;

    const data = {
        name: name,
        email: email,
        password: password,
        balance: 0.00
    }

    const check = await USER.findOne(data);

    try {
        if (check) {
            res.json("failed");
        }
        else {
            await USER.insertMany([data]);
            res.json("success");
        }
    }
    catch (e) {
        console.log(e);
    }

})

var tmpUser;

app.post('/', async (req, res) => {

    const { email, password } = req.body;

    tmpUser = email;

    const data = {
        email: email,
        password: password
    }

    const check = await USER.findOne(data);

    try {
        if (check) {
            await USER.findOne(data);
            res.json("success");
        }
        else {
            res.json("failed");
        }
    }
    catch (e) {
        console.log(e);
    }

})

app.get('/api', async (req, res) => {
    try {
        const userData = await USER.findOne({ email: tmpUser });
        res.send({ user: userData });
    }
    catch (e) {
        console.log(e)
    }
})

app.get('/api_d', async (req, res) => {
    try {
        const details = await DETAILS.find({ email: tmpUser });
        res.send({ data: details });
    }
    catch (e) {
        console.log(e)
    }
})

app.post('/add', async (req, res) => {

    const { amount, email } = req.body;

    const check = await USER.findOne({ email: email });

    const newBalance = Number(check.balance) + Number(amount);

    try {
        await USER.updateOne({ email: email }, { $set: { balance: newBalance } });
        res.json("success");
    }
    catch (e) {
        console.log(e);
    }

})

app.post('/details', async (req, res) => {

    const { desc, cost, email } = req.body;

    const date = new Date();

    const check = await USER.findOne({ email: email });

    const newBalance = Number(check.balance) - Number(cost);

    const data = {
        month: date.getMonth(),
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
        desc: desc,
        cost: cost,
        email: email
    }

    try {
        await DETAILS.insertMany([data]);
        await USER.updateOne({ email: email }, { $set: { balance: newBalance } });
        res.json("success");
    }
    catch (e) {
        console.log(e);
    }

})

app.post('/remove', async (req, res) => {

    const { toDelete, toDeleteCost, email } = req.body;

    const user = await USER.findOne({ email: email });

    const new_bal = Number(user.balance) + Number(toDeleteCost);

    try {
        await USER.updateOne({ email: user.email }, { $set: { balance: new_bal } });
        await DETAILS.deleteOne({ _id: toDelete });
        res.json("success");
    }
    catch (e) {
        console.log(e);
    }

})

/*app.post('/update', async (req, res) => {

    const { e_name, u_name } = req.body;

    try {
        await CRUD.updateMany({ name: e_name }, { $set: { name: u_name } });
        res.json("success");
    }
    catch (e) {
        console.log(e);
    }

})

app.post('/delete', async (req, res) => {

    const { name } = req.body;

    try {
        await CRUD.deleteMany({ name: name });
        res.json("success");
    }
    catch (e) {
        console.log(e);
    }

})

app.get('/api', async (req, res) => {
    try {
        const userData = await CRUD.find({});
        res.send({ status: "ok", data: userData });
    }
    catch (e) {
        console.log(e)
    }
})*/

//START THE SERVER
app.listen(port, () => {
    console.log(`Our app listening on port ${port}`)
})