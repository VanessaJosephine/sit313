// JavaScript source code
const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser")

const app = express()

/*require('dotenv').config()*/
const sgMail = require("@sendgrid/mail")
sgMail.setApiKey('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')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cors())
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.sendfile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
    const email = req.body.email;
    console.log(email)
    const msg = {
        to: email,
        from: "bryantwills77@gmail.com",
        subject: "Welcome, New Subscriber!",
        html: `
            <p>Welcome, New Subscriber!</p>
            <h3>Details</h3>
            <li>Email: ${email}</li>
            `,
    }
    sgMail.send(msg, function (err, info) {
        if (err) {
            console.error(err)
        } else {
            console.log("Email sent successfully")
        }
    })
})

app.listen(8088, function () {
    console.log("Server running on port 8088")
})

module.exports = app;