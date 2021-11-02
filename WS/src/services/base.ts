import { Response } from "express";
import { Result, ValidationError } from "express-validator";
import { format } from "util";

export class BaseService {

    protected static sendData(res: Response, data: any) {
        const message = {
            code: 200,
            message: "Success",
            data: data
        };
        res.statusCode = 200,
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify(message));
        res.end();
    }

    protected static sendDataCreated(res: Response, data: any) {
        const message = {
            code: 201,
            message: "Success",
            data: data
        };
        res.statusCode = 201,
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify(message));
        res.end();
    }

    protected static sendInvalidRequest(res: Response, errors: Result<ValidationError>) {
        const message = {
            code: 400,
            message: "Invalid request",
            errors: errors.array()
        };
        res.statusCode = 400,
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify(message));
        res.end();
    }
    
    protected static sendResourceNotFound(res: Response) {
        const message = {
            code: 404,
            message: "Resource not found"
        };
        res.statusCode = 404,
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify(message));
        res.end();
    }

    protected static sendInternalError(res: Response, err: Error) {
        const message = {
            code: 500,
            message: err.message
        };
        res.statusCode = 500,
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify(message));
        res.end();
    }
}