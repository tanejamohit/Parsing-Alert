var execFile = require('child_process').execFile;
var newStudy = "Text for Body of Email";
execFile('./mailSend.sh',[newStudy],{timeout: 90000});

