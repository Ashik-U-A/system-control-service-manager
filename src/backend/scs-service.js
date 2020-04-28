const https = require("https");
const path = require("path");
const fs = require("fs");
const ws = require("ws");

let https_server;
let ws_server;

function init_scs_websocket_service() {
    https_server = https.createServer({
        cert: fs.readFileSync(path.resolve(__dirname, "..", "..", "certificates", "server.crt"), "utf8"),
        key: fs.readFileSync(path.resolve(__dirname, "..", "..", "certificates", "key.pem"), "utf8")
    });
    https_server.listen(9800, ()=>{
        console.log("HTTPS Server Ready and Listening to PORT : 9800");
    });

    ws_server = new ws.Server({server: https_server});
    
    ws_server.on("connection", ws => {
        console.log("A New Connection was made : " + ws.url);
        ws.send("The Message From Server!");

        ws.on("message", message => {
            console.log(`Message from Client : ${message}`);
        });

        ws.on("close", (ws, code, reason) => {
            console.log(`Connection Closed | ${code} - ${reason}`);
        });
    });
}

module.exports = {
    init_scs_websocket_service
};