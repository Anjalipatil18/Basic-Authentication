const express=require("express")
const app=express()
const fs=require("fs")
const bodyParser=require("body-parser")
app.use(bodyParser.json())

app.post("/signup",(req,res)=>{
    var userDetails={
        userName:req.body.userName,
        emailId:req.body.emailId,
        mobileNo:req.body.mobileNo,
        Password:req.body.Password
    }
    let jsonData = fs.readFileSync('userDetail.json')
    data = jsonData.toString();
    let Data = JSON.parse(data)
    if(userDetails.Password>=6 && userDetails.Password<=15){
        return res.end("week password....")
    }
    for (index in Data){
        if (Data[index].emailId==req.body.emailId){
            return res.send("It is emailId Already exist...")
        }
    }
    userDetails.id = Data.length + 1;
    Data.push(userDetails)
    fs.writeFileSync("userDetail.json", JSON.stringify(Data,null,2))
    return res.json(Data)
})
app.listen(6000, () => console.log('server is listening 6000....'));

