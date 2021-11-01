import { UniverseConnection } from "../business/core/connection";
import { ConnectionModel } from "../dataaccess/connection";

export class ConnectionAdapter {

    public static instanciateFromModel(model: ConnectionModel) {
        const connection = new UniverseConnection();
        connection.host = model.host;
        connection.username = model.username;
        connection.password = model.password;
        connection.database = model.database;
        return connection;
    }
}