import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { info } from "node-sass"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

// "mongodb+srv://ankit:Onetheway123@cluster0.t5vm4.mongodb.net/myaLoginRegisterDB?retryWrites=true&w=majority"
mongoose.connect('mongodb://localhost:27017/myaLoginRegisterDB', {
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

const parcelSchema = mongoose.Schema({
  user : String,
  info : String,
  cost : String,
  startloc : String,
  destination : String,
  SfullName : String,
  SphoneNumber : String,
  Saddress : String,
  RfullName : String,
  RphoneNumber : String,
  Raddress : String,
});

const User=new mongoose.model("User",userSchema)

const Parcel=new mongoose.model("Parcel",parcelSchema)


//routes

app.post("/add", (req, res) => {
    console.log(req.body);
    console.log("Call Recived Added");
    const {
      id,
      user,
      info,
      cost,
      startloc,
      destination,
      SfullName,
      SphoneNumber,
      Saddress,
      RfullName,
      RphoneNumber,
      Raddress,
    } = req.body;
    
    const entry = new Parcel({
      user,
      info,
      cost,
      startloc,
      destination,
      SfullName,
      SphoneNumber,
      Saddress,
      RfullName,
      RphoneNumber,
      Raddress,
    });
    console.log(entry)
    entry.save(err => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Added" });
        }
    })
})

app.post("/con", (req, res) => {
    const { name,email,password } = req.body
    Parcel.find({ user: email }, (error, data) => {
        if (error) {
            res.send(error)
            console.log(error)
            // alert("NO CONTACT")
        } else {
            console.log("Finded Succesfully")
            // console.log(data, email)
            res.send(data)

        }
    })
})


app.post("/read", (req, res) => {
    console.log("HELLOO")
  User.find({}, (error, data) => {
      if (error) {
          console.log(error);
      res.send(error);
    } else {
        console.log(data);
      res.send(data);
    }
  });
});



app.post("/del", (req, res) => {
    console.log("del Call Recived")
    console.log(req.body)
    const {
      id,
      user,
      info,
      cost,
      startloc,
      destination,
      SfullName,
      SphoneNumber,
      Saddress,
      RfullName,
      RphoneNumber,
      Raddress,
    } = req.body;
    Parcel.deleteOne({
      user : user,
      info: info,
    cost :cost,
      startloc : startloc,
      destination : destination,
      SfullName : SfullName,
      SphoneNumber : SphoneNumber,
      Saddress : Saddress,
      RfullName : RfullName,
      RphoneNumber : RphoneNumber,
      Raddress : Raddress,
    }, (err) => {
        if (err) {
            console.log(err)
        } else
        {
            res.send({message : "DELETED"})
            console.log("Deleted")
        }
    });
})

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


app.listen(3001, () => {
    console.log("Back End started")
})
