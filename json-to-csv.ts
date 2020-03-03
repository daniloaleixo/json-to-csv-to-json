import { getArgs } from "./helper";
import * as jsonfile from "jsonfile";
import * as fs from "fs";

const usageString: string = `
Args: node dist/utils/json-to-csv.js --json <bla.json> --csv <bla.csv>
\n
Ex: node dist/utils/json-to-csv.js --json bla.json --csv bla.csv
\n
\n
Parameters: \n
\t - json: JSON input
\t - csv: CSV output
`;

const args: any = getArgs(usageString);
const hashLines: any = {};
const separator = "__"

main().then(() => console.log("Foi")).catch((err) => console.log("Deu erro", err))



async function main() {
  const JSONInput: any = jsonfile.readFileSync(args["json"]);
  const csvFile = args["csv"];

  transformJSONIntoCSV(JSONInput, "")

  let csv = "Key, Value\n";
  Object.keys(hashLines).forEach(key =>
    csv += `${key}, ${typeof hashLines[key] == "string" ? hashLines[key].replace(/,/g, "<comma>").replace(/\n/g, "<newline>") : hashLines[key]}\n`
  )


  fs.writeFileSync(csvFile, csv)
}

function transformJSONIntoCSV(JSONInput: any, headerString: string) {
  for (const key of Object.keys(JSONInput)) {
    const myHeaderString: string = headerString ? headerString + separator + key : key;
    const value = JSONInput[key];

    if (!value) {
      hashLines[myHeaderString] = value;
    }
    // Caso quando eh objeto (obj ou array)
    else if (typeof value == "object") {
      // Array
      if (value.length != undefined)
        value.forEach((element: any, i: number) => transformJSONIntoCSV(element, myHeaderString + separator + i))
      // Objeto 
      else
        transformJSONIntoCSV(value, myHeaderString)
    }
    else {
      hashLines[myHeaderString] = value;
    }
  }
}