import { UniverseDimension } from "../business/core/universeObjects/universeDimension";
import { UniverseMetric } from "../business/core/universeObjects/universeMetric";
import { BusinessObjectModel, BUSINESSOBJECT_TYPE } from "../dataaccess/businessObject";

export class BusinessObjectAdapter {

    public static instanciateFromModel(model: BusinessObjectModel) {
        if (model.objectType === BUSINESSOBJECT_TYPE.DIMENSION) {
            return BusinessObjectAdapter.instanciateDimensionFromModel(model);
        } else if (model.objectType === BUSINESSOBJECT_TYPE.METRIC) {
            return BusinessObjectAdapter.instanciateMetricFromModel(model);
        } else {
            throw new Error("BusinessObjectAdapter.instanciateFromModel - Invalid type: " + model.objectType);
        }
    }

    public static instanciateDimensionFromModel(model: BusinessObjectModel) {
        const dimension = new UniverseDimension(model.name, model.description);
        dimension.id = model.id;
        dimension.tableName = model.tableName;
        dimension.select = model.selectStatement;
        dimension.where = model.whereStatement;
        if (model.referenceId) {
            dimension.referenceId = model.referenceId;
        }
        return dimension;
    }

    public static instanciateMetricFromModel(model: BusinessObjectModel) {
        const metric = new UniverseMetric(model.name, model.description);
        metric.id = model.id;
        metric.tableName = model.tableName;
        metric.select = model.selectStatement;
        metric.where = model.whereStatement;
        if (model.referenceId) {
            metric.referenceId = model.referenceId;
        }
        return metric;
    }
}