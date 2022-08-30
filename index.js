const express = require('express');
const aap = express();
const port = 8000;

aap.listen(port,function(err){
    if(err)
        console.log(`error while connecting to server error in database connectivity`);
     console.log('succesfully connected to database');
});
