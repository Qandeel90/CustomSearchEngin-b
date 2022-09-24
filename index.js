const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors");
const path = require('path');
const router = express.Router();
const app = express()
app.use(cors());
app.options("*", cors());
const fs = require('fs');
// create our express app
// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// file read
var obj;

// Read the file and send to the callback
fs.readFile('./bigdata.json', handleFile)

// Write the callback function
function handleFile(err, data) {
    if (err) throw err
    obj = JSON.parse(data)
    // You can now play with your datas
}

app.get("/",(req,res)=>{
  res.json(obj);
}
)
app.get("/data",(req,res)=>{
  const {q} = req.query;
  const keys =["first_name","gender","industry"];
  const search=(data)=>{
    return data.filter((item)=>{
     
      
if(q==""){

return null;
}
      
        return  (
        item.first_name?.toLowerCase().includes(q.toLowerCase())||
        item.gender?.toLowerCase().includes(q.toLowerCase())||
        item.job_title?.toLowerCase().includes(q.toLowerCase())||
        item.location_country?.toLowerCase().includes(q.toLowerCase())||
        item.industry?.toLowerCase().includes(q.toLowerCase())
         );
    }
   
)}
    
    
res.json(search(obj));
}
)

/* const nameFilter =data.filter(d => {
  if (query === '') {
    return "";
  } else if (d.full_name.toLowerCase().includes(query.toLowerCase())) {
    return d;
  }
  
})
 */


app.use('/', router);
//start server
const server = app.listen(process.env.PORT || 8000, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});