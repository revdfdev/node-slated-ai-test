const express = require("express");
const baseRouter = require("../routers/base");


class DateTimeServer {

    constructor() {
        this.app = express();
    }

    runServer() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(baseRouter);
        this.app.listen(3000, () => {
            console.log('Server is running on port 3000');
        })
    }
}

class Worker extends DateTimeServer {
    start() {
        console.log('Worker started');
        super.runServer();
    }
}

module.exports.worker = new Worker();