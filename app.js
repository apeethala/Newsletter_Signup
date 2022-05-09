const express= require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { post } = require("request");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('images'));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var firstname = req.body.firstname;
    var secondname = req.body.secondname;
    var email = req.body.email;
    var data={
        members:[

            {
             email_address :email,
             status:"subscribed",
             merge_fields:{
                 FNAME:firstname,
                 LNAME:secondname,
             }
            }
        ]
    }; 
    var jsonData=JSON.stringify(data);
    const url="https://us8.api.mailchimp.com/3.0/lists/b0ec3aea92";
    const options={
        method:"POST",
        auth:"Alekhya:d8eba71c852a3de3a8645aff1c9a8ef7-us8",

    }
    var request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
                console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();

    console.log(firstname+" "+secondname+" "+email);

});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("server is started and running at port 3000");
});

//d8eba71c852a3de3a8645aff1c9a8ef7-us8
//audienceid b0ec3aea92