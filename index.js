import bodyParser from "body-parser";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const port = 3000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);


var NumofMed = 8; // how many medicine containers are in our project
var userName = "SLIIT"; // default username
var userEmail = "sliit@gmail.com"; // default email
var addedMedi = [];
var mediInfo = {"1":
                   {"medicineStatus":"pending",
                    "medicineMom":"before",
                    "medicineTime":"08:00",
                  },
                  "2":
                   {"medicineStatus":"pending",
                    "medicineMom":"before",
                    "medicineTime":"10:00",
                  },
                  "3":
                   {"medicineStatus":"pending",
                    "medicineMom":"before",
                    "medicineTime":"08:00",
                  },
                  "4":
                   {"medicineStatus":"pending",
                    "medicineMom":"before",
                    "medicineTime":"10:00",
                  },
                  "5":
                   {"medicineStatus":"pending",
                    "medicineMom":"before",
                    "medicineTime":"12:00",
                  },
                  "6":
                   {"medicineStatus":"pending",
                    "medicineMom":"before",
                    "medicineTime":"10:00",
                  },
                  "7":
                   {"medicineStatus":"pending",
                    "medicineMom":"before",
                    "medicineTime":"08:00",
                  },
                  "8":
                   {"medicineStatus":"pending",
                    "medicineMom":"before",
                    "medicineTime":"10:00",
                  }               
                };

// make the get request body readable for json and urlencoded                
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.json());

// make the public folder accessable for our client
app.use(express.static("public"));

function dashboardRen(res){
  res.render("index.ejs",{
    medNum: NumofMed,
    userEmail:userEmail,
    userName:userName,
    addedMedi:addedMedi,
    mediInfo:mediInfo,
  });
}

app.get("/", (req, res) => {
  dashboardRen(res);
});

// save the time and medicine name to the database
app.post("/saveData", (req, res,) => {
  var isthere = true;
  // chech if the saving medicine has already entered. if so 
  // just change the time and the medicine status pending 
  for (let i = 0; i < 8; i++){
    if (addedMedi[i] == req.body["medi-name"]){
      isthere = false;
    }
  }
  if (isthere){
    addedMedi.push(req.body["medi-name"]);
    mediInfo[req.body["medi-name"]]["medicineMom"] = req.body["meal-mom"];
  }
  mediInfo[req.body["medi-name"]]["medicineStatus"] = "pending";
  mediInfo[req.body["medi-name"]]["medicineTime"]= req.body ["reminder-time"];
  res.redirect("/");
});

// give function to reset button and remove the medicine from the list
app.post("/remTime", (req, res,) => {
  addedMedi = addedMedi.filter(addedMedi => addedMedi !== req.body.data);
  res.redirect("/");
});

app.post("/userData",(req,res)=>{
    userName = req.body["fname"];
    userEmail = req.body["email"];
    res.redirect("/");
});

// send the added medi list to esp32
app.get("/espGet", (req, res) => {
  var sendMediList = {};
  for (let i = 0; i < addedMedi.length; i++){
    sendMediList[addedMedi[i]] = mediInfo[addedMedi[i]];
  }
  res.send(sendMediList);
});

// receive the medicine status from esp32
app.post("/espPost", (req, res) => {
  // for (let i = 0; i < Object.values(req.body).length; i++){
  //   mediInfo[Object.keys(req.body)[0]]["medicineStatus"] = Object.values(req.body)[0];
  // }
  mediInfo[Object.keys(req.body)[0]]["medicineStatus"] = Object.values(req.body)[0];
  res.status(200).json({ message: "Received Data" });
  io.emit('force-refresh');
});

// host the server in port 3000
httpServer.listen(3000, () => {
    console.log(`Server started on port ${port}`);
  });



