const express = require("express");
const http = require("http");
const path = require("path");
const nodemailer = require("nodemailer");
const { info, log } = require("console");
const app = express();
const server = http.Server(app);
const port = 4500;
app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../contact.html")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../contact.html"));
});
app.post("/send_mail", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "fenzfashion01@gmail.com",
      pass: "xcnshqmpzwrjdqvu",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: "fenzfashion01@gmail.com",
    subject: `Message from ${req.body.name}: ${req.body.subject}`,
    text: req.body.message,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email send" + info.response);
      res.send("success");
    }
    res.redirect("/");
  });
});
server.listen(port, () => {
  console.log("App running on port" + port);
});
