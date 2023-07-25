const fs = require("fs").promises;

var dataSync = "";

function readFileAsync(path) {
  return fs.readFile(
    path,
    { encoding: "utf-8", flag: "r" },
    function (err, data) {
      if (err) {
        console.log("read Async failed");
      } else {
        console.log("Read file succeded");
        dataSync = data;
      }
    }
  );
}

function writeFileAsync(path, data) {
  console.log("Write started");
  fs.writeFile(
    path,
    data,
    { encoding: "utf-8", flag: "w" },
    function (err, data) {
      if (err) {
        console.log("write Async failed");
      } else {
        console.log("write file succeded");
      }
    }
  );
}
function readwriteAsync() {
  console.log("Started Reading........");
  readFileAsync("./ReadFile/ReadData.txt")
    .then((dataSync) => {
      writeFileAsync("./WriteFile/WriteFile.txt", dataSync);
    })
    .catch((err) => {
      console.log("Failed read");
    });

  console.log("Finishing Read and Write");
}

readwriteAsync();
