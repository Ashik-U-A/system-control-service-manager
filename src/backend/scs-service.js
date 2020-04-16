const ws = require("ws");

let ws_server;

function init_scs_websocket_service() {
    ws_server = new ws.Server({port: 9800}, ()=>{
        console.log("SCS Manager Service running at PORT: 9800.");
    });
    
    ws_server.on("connection", ws => {
        console.log("A New Connection was made : " + ws.url);
        ws.on("message", message => {
            console.log(`Message from Client : ${message}`);
        });
    });
}

module.exports = {
    init_scs_websocket_service
};