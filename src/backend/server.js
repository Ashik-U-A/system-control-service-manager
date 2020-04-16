let express = require("express");
let path = require("path");
let { init_scs_websocket_service } = require("./scs-service");

let app = express();

app
.use(express.static(path.join(__dirname, "..", "frontend")))
.get("/", serve_home_page)
.listen(9000, ()=>{
    console.log("Server Ready and Listening to PORT : 9000");
    init_scs_websocket_service();
});

function serve_home_page(request, response) {
    response.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
}