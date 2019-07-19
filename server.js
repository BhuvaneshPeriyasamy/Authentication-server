var express=require('express');
var bodyparse=require('body-parser');
var route=require('./Route/route');
var app=express();
var cors=require('cors');

const port=process.env.PORT||3000;

app.use(bodyparse.urlencoded({extended:true}));
app.use(bodyparse.json());
app.use(cors());
route(app);

app.listen(port,function(err)
{
    if(err)
    console.log(err);
    console.log("API is online");
})
