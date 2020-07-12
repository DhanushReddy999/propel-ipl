const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const noofmatcheswonbyeachteam = require("./ipl/noofmatcheswonbyeachteam");
const economicbowler = require("./ipl/economicbowler");
const extrarunsbyeachteam = require("./ipl/extrarunsbyeachteam");
const mostmanofmatch = require("./ipl/mostmanofmatch");


const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH="./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";
const JSON_OUTPUT_FILE_PATH1 = "./public/data1.json";


function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {
      let result = matchesPlayedPerYear(matches);
      let result1=noofmatcheswonbyeachteam(matches);
      let result4=mostmanofmatch(matches);
     
      
       console.log(result4);
      //console.log(result1);
      csv()
      .fromFile(DELIVERIES_FILE_PATH)
      .then(deliveries => {
        let result2=economicbowler(matches,deliveries);
        let result3=extrarunsbyeachteam(matches,deliveries);
       // console.log(result2);
      // console.log(result3);
        saveeconomicbowler(result2,result3);
        
      });
      saveMatchesPlayedPerYear(result,result1,result4);
      
    });
}

function saveMatchesPlayedPerYear(result,result1,result4) {
  const jsonData = {
    matchesPlayedPerYear: result,
    noofmatcheswonbyeachteam:result1,
    mostmanofmatch:result4
   
   
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}
function saveeconomicbowler(result2,result3) {
  const jsonData1= {
    economicbowler:result2,
   extrarunsbyeachteam:result3
  };
  const jsonString1 = JSON.stringify(jsonData1);
  fs.writeFile(JSON_OUTPUT_FILE_PATH1, jsonString1, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}


main();
