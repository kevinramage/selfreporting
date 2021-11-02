import { UniverseJoin } from "../business/core/universeObjects/universeJoin";
import { UniverseJoinModel } from "../dataaccess/universeJoint";
import { TableAdapter } from "./table";

export class JoinAdapter {
    public static instanciateFromModel(model: UniverseJoinModel) {
        const universeJoin = new UniverseJoin();
        universeJoin.id = model.id;
        universeJoin.nameA = model.nameA;
        universeJoin.nameB = model.nameB;
        if (model.tableA) {
            universeJoin.tableA = TableAdapter.instanciateFromModel(model.tableA);
        }
        if (model.tableB) {
            universeJoin.tableB = TableAdapter.instanciateFromModel(model.tableB);
        }
        return universeJoin;
    }
}