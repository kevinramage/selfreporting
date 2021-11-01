import { Universe } from "../business/core/universe";
import { UniverseModel } from "../dataaccess/universe";
import { ConnectionAdapter } from "./connection";

export class UniverseAdapter {
    public static instanciateFromModel(model: UniverseModel) {
        const universe = new Universe();
        universe.id = model.id;
        universe.name = model.name;
        universe.description = model.description;
        if (model.connection) {
            universe.dataLayer.connection = ConnectionAdapter.instanciateFromModel(model.connection);
        }
        return universe;
    }
}