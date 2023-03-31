const express = require("express");
const baseRouter = require("../routers/base");


class DateTimeServer {

    constructor() {
        this.app = express();
    }

    async startServer() {
        try {
            await this.runServer();
        } catch (exception) {
            console.error("Start server error", exception.message);
        }
    }

    async runServer() {
        try {
            this.app.use(express.json());
            this.app.use(express.urlencoded({ extended: true }));
            this.app.use(baseRouter);
            this.app.listen(3000, () => {
                console.log('Server is running on port 3000');
            })
        } catch (exception) {
            throw exception;
        }
    }
}

class Worker extends DateTimeServer {
    start() {
        console.log('Worker started');
        super.startServer();
    }
}

module.exports.worker = new Worker();