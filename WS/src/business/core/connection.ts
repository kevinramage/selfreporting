import { Connection, createConnection, ResultSetHeader } from "mysql2";
import { CoreObject } from "./coreObject";

export class UniverseConnection extends CoreObject {
    private _connection: Connection | null;
    private _host: string;
    private _username: string;
    private _password: string;
    private _database: string;

    constructor() {
        super();
        this._connection = null;
        this._host = "";
        this._username = "";
        this._password = "";
        this._database = "";
    }

    public connect() {
        return new Promise<void>((resolve, reject) => {
            this._connection = createConnection({
                host: this.host,
                user: this.username,
                password: this.password,
                database: this.database
            });
            this._connection.ping((err) => {
                if (!err) { 
                    resolve(); 
                } else {
                    reject(err);
                }
            });
        });
    }

    public query(query: string) {
        return new Promise<any>((resolve, reject) => {
            if (this._connection) {
                this._connection.query(query, (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            } else {
                reject(new Error("No connection found"));
            }
        });
    }

    public disconnect() {
        if (this._connection) {
            this._connection.destroy();
        }
    }

    public get host() {
        return this._host;
    }
    public set host(value) {
        this._host = value;
    }

    public get username() {
        return this._username;
    }
    public set username(value) {
        this._username = value;
    }

    public get password() {
        return this._password;
    }
    public set password(value) {
        this._password = value;
    }

    public get database() {
        return this._database;
    }
    public set database(value) {
        this._database = value;
    }

    public get data() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            host: this.host,
            username: this.username,
            password: this.password,
            database: this.database
        };
    }
}