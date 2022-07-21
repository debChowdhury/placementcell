const express = require('express');
const app = express();
const port = 8000;

app.listen(port, function(err){
    if(err){
        console.log("Error in running server");
        return;
    }
    console.log(`Server running at port ${port}`);
});