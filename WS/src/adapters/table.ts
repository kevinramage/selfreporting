import { UniverseTable } from "../business/core/universeObjects/universeTable";
import { UniverseTableModel } from "../dataaccess/universeTable";
import { ColumnAdapter } from "./column";

export class TableAdapter {
    public static instanciateFromModel(model: UniverseTableModel) {
        const table = new UniverseTable();
        table.id = model.id;
        table.name = model.name;
        table.description = model.description;
        if (model.columns) {
            model.columns.forEach(c => { 
                const column = ColumnAdapter.instanciateFromModel(c);
                table.addColumn(column);
            });
        }
        return table;
    }
}