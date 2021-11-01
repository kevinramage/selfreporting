import sequelize from "sequelize";
import { Sequelize } from "sequelize";
import * as winston from "winston";
import { InitDataAccess } from "../dataaccess/init";

export class DatabaseManager {

    private _sequelize : Sequelize | null = null;

    public init() {
        return new Promise<void>(async (resolve, reject) => {

            // Init SQL connection
            this._sequelize = new Sequelize("mysql://root:@localhost:3306/selfreporting", { logging: false});
            try {
                await this._sequelize.authenticate();
                winston.info('DatabaseManager.init - Connection has been established successfully.');
            } catch (error) {
                winston.error('DatabaseManager.init - Unable to connect to the database:', error);
                reject(error);
            }

            // Init model
            const initDataAccess = new InitDataAccess();
            initDataAccess.run(this._sequelize);
            await this._sequelize.sync({ force: true });
            await initDataAccess.generateData(this._sequelize);

            resolve();
        });
    }

    public close() {
        if (this._sequelize != null) {
            try {
                this._sequelize.close();
            } finally {

            }
        }
    }
}