// before run this script make sure the kepler_data file is imported beside this file

const parse = require("csv-parse");
const fs = require("fs");

const result = [];

//* stream larg data set ( from a csv file in our case )
// 1: streaming file content using Event Emiter
fs.createReadStream("csv-stream/kepler_data.csv")
  .pipe(
    // just for parsing csv buffer to a valid json
    parse({
      comment: "#", // whenever he see # will know it's just a comment
      columns: true, // indicate whether the csv has columns or not , in our case the csv has columns
    })
  )
  .on("data", (chunk) => {
    // this is an Evernt Emiter
    // chunk mean a peace of data (represented by buffer <buffer>0932k32 4204...</buffer>)
    // each chunk returned as buffer (bytes)
    result.push(chunk);
  })
  .on("end", () => {
    // on the streaming of data is end
    console.log(result);
    console.log("end of streaming data");
  })
  .on("error", (err) => console.log(err)); // in case we accur an error

// we could keep going using on depending on how much event emiter we have in our stream
