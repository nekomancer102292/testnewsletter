const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",(req,res)=>{

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.uemail;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                    EMAIL: email
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us12.api.mailchimp.com/3.0/lists/1f797d09b6";

    const options = {
        method: "POST",
        auth: "testuname:68b744b09cb58451fa05d1c503beb3bb-us12"
    }

    const request = https.request(url, options, (response)=>{
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        } else {
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", (data)=>{
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", (req,res)=>{
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,()=>{console.log("server is running on port 3000")});

//api key
//68b744b09cb58451fa05d1c503beb3bb-us12

//audience id
//1f797d09b6


