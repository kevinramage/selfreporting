import { UniverseColumn } from "../business/core/universeObjects/universeColumn";
import { UniverseColumnModel } from "../dataaccess/universeColumn";

export class ColumnAdapter {
    public static instanciateFromModel(model: UniverseColumnModel) {
        const column = new UniverseColumn(model.name, model.type);
        column.id = model.id;
        return column;
    }
}