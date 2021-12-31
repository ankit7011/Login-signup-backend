import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb+srv://ankit:Onetheway123@cluster0.t5vm4.mongodb.net/myaLoginRegisterDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology:true
},()=> {
    console.log("DB connect")
});


const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password:String
})

const User=new mongoose.model("User",userSchema)



//routes

app.post("/login", (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            if (password === user.password)
            {
                res.send({ message: "Login Successfull", user: user })
                
            } else {
                res.send({message : "Incorrect Password"})
                }
        } else {
            res.send({message :"User not Registered"})
        }
        
    } )
})


app.post("/register", (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body

    User.findOne({ email: email }, (err, user) => {
        if (user)
        {
            res.send({message : "User already Registered"})
        }
        else {
            
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if (err)
                {
                    res.send(err)   
                }
                else
                {
                    res.send({message : "Successfully Register. Please Login Now "})
                }
            })
        }
    })


});


app.listen(process.env.PORT || 3001, () => {
    console.log("Back End started")
})
