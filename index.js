const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

require('dotenv').config();

const app = express();

const port = process.env.PORT;

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname));

//routes
app.get("/", (req, res) => {

    res.render('index');
});

//email message route
app.post("/msg", async (req, res) => {

    try
    {
        //mail config
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'justinjoelbrown@gmail.com',
                pass: process.env.GMAIL_PASS
            }
        });

        //gather data from form
        console.log(req.body);

        let email = req.body.email.trim();
        let name = req.body.name.trim();
        let subject = req.body.subject;
        let message = req.body.message;

        let mailOptions = {
            from: 'justinjoelbrown@gmail.com',
            to: `justin.j.brown@outlook.com`,
            subject: `From ${name} (${email}) - ${subject}`,
            text: message
        };

        let result = await transporter.sendMail(mailOptions);

        console.log('Email sent ' + result.response);

        res.send("<script>alert('Message sent'); window.location.href = '/#contact'; </script>");
    }

    catch (err)
    {
        console.log(err);
        res.send("<script>alert('Error occured, please email Justin directly'); window.location.href = '/#contact'; </script>");
    }

});

//start app
app.listen(port, () => console.log('Server is listening'));