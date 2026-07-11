import fs from "fs";

// 1. Read and execute the file in the global context
const fileContent = fs.readFileSync("./ragas.js", "utf8");
globalThis.eval(fileContent); 

// 2. Now 'obj' is globally available!
const TARGET_KEY = "name";

obj.ragas
  .filter(item => item.kritis && item.kritis.length === 3)
  .forEach(item => console.log(item[TARGET_KEY], item.kritis));

