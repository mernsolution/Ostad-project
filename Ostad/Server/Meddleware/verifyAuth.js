
const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
    const Token =req.headers['token'];
    jwt.verify(Token,'secretKey123456789',(error,decoded)=>{
        if(error){
         console.log(error)
         res.status(400).json({status:'unauthorize', error:error})
        }else{
            const userMail=decoded['data'];
            req.headers.userMail=userMail
            next();
        }
    })
}



// const jwt= require('jsonwebtoken');

// module.exports=(req,res,next)=>{
//     const Token=req.headers['token'];
//     jwt.verify(Token,'sdowyruituoreyt74hdjgf',(error,decoded)=>{
//         if(error){
//             console.log(error)
//             res.status(402).json({status:'unauthorized', error:error})
//         }else{
//             const email= decoded['data'];
//             req.headers.email=email
//             next();
//         }
//     })
// }
