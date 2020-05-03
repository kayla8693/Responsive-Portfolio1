require("dotenv").config();
const express = require("express");
const path = require("path");
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(morgan('dev'));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/portfolio", function (req, res) {
    res.sendFile(path.join(__dirname, "/portfolio.html"));
});

app.get("/contact", function (req, res) {
    res.sendFile(path.join(__dirname, "/contact.html"));
});

app.post("/mail", (req, res) => {
    const apiKey = process.env.MAILGUN_API_KEY;
    const domain = 'sandbox7fcfa03e79db46efb3aa81f47bd48a9a.mailgun.org';
    const mailgun = require('mailgun-js')({ apiKey, domain });

    const { from, subject, text } = req.body;
    console.log(req.body);

    let data = {
        from,
        to: 'kaylag044@gmail.com',
        subject,
        text
    };

    mailgun.messages().send(data, function (error, body) {
        console.log(error, body);
        if (error) {
            throw error;
        }
        console.log("Email Sent");
        res.status(200).json(body);
    });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
