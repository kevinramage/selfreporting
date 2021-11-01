import * as winston from "winston";
import DailyRotateFile = require("winston-daily-rotate-file");
import app from "./app";
import { DatabaseManager } from "./manager/databaseManager";

export class Main {
    public run() {

        // Configure logs
        const myFormat = winston.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} - ${level.toUpperCase()}: ${message}`;
        });
        winston.add(new DailyRotateFile({ filename: "logs/SelfReporting_%DATE%.log", datePattern: 'YYYY-MM-DD', 
            level: 'debug', zippedArchive: true, maxSize: '20m', maxFiles: '14d', format: winston.format.combine(winston.format.timestamp(), myFormat)}));
        winston.remove(winston.transports.Console);
        winston.add(new winston.transports.Console({level: "info", format: winston.format.combine(winston.format.timestamp(), myFormat) }));
        winston.info("Main.start - Begin");

        // Init database
        const databaseManager = new DatabaseManager();
        databaseManager.init().then(() => {
            winston.info("Main.start - DatabaseManager initialized");
        }).catch((err) => {
            process.exit(-1);
        });

        process.on("uncaughtException", (err) => {
            winston.error("Main.start - Server crashed");
            winston.error(err.stack);
            databaseManager.close();
        });

        // Listen
        const port = 7000;
        app.listen(port,() => {
            winston.info("Main.start - Server started on " + port);
        });
    }
}

new Main().run();