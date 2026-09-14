const fs = require("fs");

// 1. Write to the file
fs.writeFile("student554.txt", "Name: Harshit\nRoll No: 733", (err) => {
  if (err) throw err;
  console.log("File created successfully");

  // 2. Read the file (Inside the writeFile callback so we know it exists first)
  fs.readFile("student554.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log("\nFile Content:");
    console.log(data);

    // 3. Append new data (Inside the readFile callback)
    fs.appendFile("student554.txt", "\nCourse: B.tech CSE", (err) => {
      if (err) throw err;
      console.log("\nFile updated successfully");

      // 4. Read again to see the updated file (Inside the appendFile callback)npm init -y
      fs.readFile("student554.txt", "utf8", (err, updatedData) => {
        if (err) throw err;
        console.log("\nUpdated File Content:");
        console.log(updatedData);
      });
    });
  });
});