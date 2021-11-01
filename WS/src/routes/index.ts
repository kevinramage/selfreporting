import { Router } from "express";

import * as express from "express";
import * as winston from "winston";

class DefaultRoute {
    public router: Router;

    public constructor() {
      this.router = Router();
    }

    public middleware(req: express.Request, res: express.Response, next: Function) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', 'true');

        next();
    }

    public sendMethodNotAllow(req: express.Request, res: express.Response, next: Function) {
        if (!["GET", "POST", "PUT", "DELETE"].includes(req.method.toUpperCase())) {

            // Manage error handling
            res.status(405);
            const data : any = { code: 405, message: "Method not allowed" };

            // Add debug informations
            if (true) {
                data.method = req.method;
                data.autorizedMethods = ["GET", "POST", "PUT", "DELETE"];
                data.version = "SelfReporting v1.0.0";
            }
            
            // Send response
            const message = JSON.stringify(data);
            res.setHeader("Content-Type", "application/json");
            res.send(message);
            res.end();

        } else {
            next();
        }
    }

    public sendResourceNotFound(req: express.Request, res: express.Response, next: Function) {

        // Manage error handling
        res.status(404);
        const data : any = { code: 404, message: "Ressource not found" };

        // Add debug informations
        if (true) {
            data.requestPath = req.path;
            data.version = "SelfReporting v1.0.0";
        }
        
        // Send response
        const message = JSON.stringify(data);
        res.setHeader("Content-Type", "application/json");
        res.send(message);
        res.end();
    }

    public sendInternalError(err: Error, req: express.Request, res: express.Response, next: Function) {

        // Error handling
        res.status(500);
        const data : any = { code: 500, message: "Internal error: " + err.message || "" };

        // Add debug informations
        if (true) {
            data.stack = err.stack;
            data.version = "SelfReporting v1.0.0";
        }

        // Log informations
        winston.error("App.run - Internal error occured: " + err.message);
        winston.error(err.stack);

        // Send response
        res.setHeader("Content-Type", "application/json");
        res.send(data);
        res.end();
    }
}
  
const defaultRoute = new DefaultRoute();
export default defaultRoute;