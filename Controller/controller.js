var Role=require('../Role');
var jwt=require('jsonwebtoken');

const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
];

//Gives Authentication and JWT
exports.Authentication=function(req,res)
{  
    var user=users.find(x=>x.username===req.body.username && x.password===req.body.password);   
    if(user)
    {
   const token=jwt.sign({Name:user.firstName,Role:user.role},"Your_Secret_Key",{expiresIn:"2m"});
    return res.json({"Token":token,"Name":user.firstName});
    }
    return res.status(403).json({message:"Wrong credential"});
}

//Authorization
exports.RestrictToAdmin=function(req,res)
{
    var token=req.headers.authorization.split(" ")[1];
    decodeToken=jwt.verify(token,"Your_Secret_Key",function(err,decode)
    {
      if(decode)
      {              
        if(decode.Role==Role.Admin)
        {
         var refreshToken = jwt.sign({Name:decode.Name,Role:decode.Role},"Your_Secret_Key",{expiresIn:'2m'});
        return res.json({"Token":refreshToken,message:"Message from server:This method can be accessed only by Admin users"}) ;
        }
        return res.status(401).json({message:"UnAuthorized"});
      }
      return res.status(400).json({message:"Session has expired"});
    });        
}

//Authorization
exports.CommonMethod=function(req,res)
{
    var token=req.headers.authorization.split(" ")[1];
    decodeToken=jwt.verify(token,"Your_Secret_Key",function(err,decode)
    {
      if(decode)
      {             
        var refreshToken = jwt.sign({Name:decode.Name,Role:decode.Role},"Your_Secret_Key",{expiresIn:'2m'});       
        return res.json({"Token":refreshToken,message:"Message from server: This method can be accessed by all users"}) ;
      }
      return res.status(400).json({message:"Session has expired"});
    });          
}