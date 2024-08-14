import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;

var NumofMed = 8;
var userName ="Alen"; 
var userEmail ="alen@gmail.com";
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
  dashboardRen(res);
});

app.post("/saveData", (req, res,) => {
  addedMedi.push(req.body["medi-name"]);
  mediInfo[req.body["medi-name"]]["medicineMom"]=req.body["meal-mom"];
  mediInfo[req.body["medi-name"]]["medicineTime"]=req.body["reminder-time"]
  res.redirect("/");
});

app.post("/remTime", (req, res,) => {
  addedMedi = addedMedi.filter(addedMedi => addedMedi !== req.body.data);
  res.redirect("/");
});

app.post("/userData",(req,res)=>{
    userName = req.body["fname"];
    userEmail = req.body["email"];
    res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});



