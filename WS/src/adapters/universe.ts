import { Universe } from "../business/core/universe";
import { IUniverseAttribute, UniverseModel } from "../dataaccess/universe";
import { ConnectionAdapter } from "./connection";
import { JoinAdapter } from "./join";

export class UniverseAdapter {
    public static instanciateFromModel(model: UniverseModel) {
        const universe = new Universe();
        universe.id = model.id;
        universe.name = model.name;
        universe.description = model.description;
        if (model.connection) {
            universe.dataLayer.connection = ConnectionAdapter.instanciateFromModel(model.connection);
        }
        if (model.joins) {
            model.joins.forEach(j => { 
                const join = JoinAdapter.instanciateFromModel(j);
                universe.dataLayer.addJoin(join);
            });
        }
        return universe;
    }
}