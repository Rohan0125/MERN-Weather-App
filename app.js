
//require modules we can also use import to the same
const express = require("express");
const https= require("https");
const bodyParser= require("body-parser");

const app = express();      //initialize new express app
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/index.html");
});
app.post("/",(req,res)=>{
  console.log(req.body.city);
  let cityname=req.body.city;
  const apiKey="a13660e3effbdc633eaf4b6bf9d68071";
  let url="https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+apiKey+"";

  https.get(url,(response)=>{
    console.log(response.statusCode);   //logs 200 if everything is okay

    response.on("data",(data)=>{        //calling methon on when we recieve data
      var schema = JSON.parse(data);    //without parse data is hexadeci code to convert to json we use json.parse
      var city= schema.name; //name     //accessing city name from json
      let icon= schema.weather[0].icon;
      let temp= schema.main.temp-273.15;
      let desci= schema.weather[0].description;
      let iconURL= "https://openweathermap.org/img/wn/"+icon+".png"
      console.log(city,icon,temp,desci);
      res.write("<h1>city:"+city+"</h1>");
      res.write("<h1>temp:"+temp.toFixed(2)+" C</h1>");
      res.write("<h1>description:"+desci+"</h1>");
      res.write("<img src="+iconURL+">");
      res.send();
    });
  });
});

app.listen(port,()=>{
  console.log("server is running on port :" + port);
})
