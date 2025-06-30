const express = require("express"); 
const bodyParser = require("body-parser");
const v1AccountRouter = require("./v1/routes/accountRoutes"); 

const server = express(); 
const PORT = process.env.PORT || 3000; 

server.use(bodyParser.json());
server.use("/api/v1/accounts", v1AccountRouter);

server.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});