import express from "express";
import morgan from "morgan";
import DefaultRoute from "./routes";
import UniverseRoute from "./routes/universe";
import ReportRoute from "./routes/report";
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

export class App {

    public app : express.Application;

    constructor() {
        this.app = express();
        this.run();
    }

    public async run() {

        // Configure express
        this.app.set("port", process.env.PORT || 7001);
        this.app.use(morgan("dev"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.xml());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        // Middleware
        this.app.use(DefaultRoute.middleware);
        this.app.use("/universe", UniverseRoute.router);
        this.app.use("/report", ReportRoute.router);
        //this.app.use(DefaultRoute.sendMethodNotAllow);
        //this.app.use("/", DefaultRoute.router);

        // Error handling
        //this.app.use(DefaultRoute.sendResourceNotFound.bind(DefaultRoute));
        //this.app.use(DefaultRoute.sendInternalError);
    }
}

export default new App().app;