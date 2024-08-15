import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;

var NumofMed = 8;
var userName = null; 
var userEmail = null;
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

app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.json());

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
  res.header("Refresh", "5");
  dashboardRen(res);
});

app.post("/saveData", (req, res,) => {
  var isthere = true;

  for (let i = 0; i < 8; i++){
    if (addedMedi[i] == req.body["medi-name"]){
      isthere = false;
    }
  }
  if (isthere){
    addedMedi.push(req.body["medi-name"]);
    mediInfo[req.body["medi-name"]]["medicineMom"]=req.body["meal-mom"];
  }
  mediInfo[req.body["medi-name"]]["medicineTime"]=req.body["reminder-time"]
  res.redirect("/");
});

app.post("/remTime", (req, res,) => {
  mediInfo[req.body.data]["medicineStatus"] = "pending";
  addedMedi = addedMedi.filter(addedMedi => addedMedi !== req.body.data);
  res.redirect("/");
});

app.post("/userData",(req,res)=>{
    userName = req.body["fname"];
    userEmail = req.body["email"];
    res.redirect("/");
});

app.get("/espGet", (req, res) => {
  var sendMediList = {};
  for (let i = 0; i < addedMedi.length; i++){
    sendMediList[addedMedi[i]] = mediInfo[addedMedi[i]];
  }
  res.send(sendMediList);
});

app.post("/espPost", (req, res) => {
  for (let i = 0; i < Object.values(req.body).length; i++){
    mediInfo[Object.keys(req.body)[i]]["medicineStatus"] = Object.values(req.body)[i];
  }
  res.status(200).json({ message: "Received Data" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});



