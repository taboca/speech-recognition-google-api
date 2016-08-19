
var fs = require('fs');
var path = require('path');

var DIRECTORY_FILE = path.join(__dirname, process.argv[2]);


fs.readFile(DIRECTORY_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var d = (JSON.parse(data));
 
    var l = d.results.length;
  
    for(i=0;i<l;i++) { 
      console.log(d.results[i].alternatives[0].transcript+"\n\n");
    } 

});

