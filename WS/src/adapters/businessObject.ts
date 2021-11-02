import { UniverseClass } from "../business/core/universeObjects/universeClass";
import { UniverseDimension } from "../business/core/universeObjects/universeDimension";
import { UniverseMetric } from "../business/core/universeObjects/universeMetric";
import { BusinessObjectModel, BUSINESSOBJECT_TYPE, IBusinessObjectAttribute } from "../dataaccess/businessObject";
import { IUniverseClass } from "../types/universeClass";
import { IUniverseDimension } from "../types/universeDimension";
import { IUniverseMetric } from "../types/universeMetric";

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

    public static createModel(attributes: IBusinessObjectAttribute) {
        if (attributes.objectType === BUSINESSOBJECT_TYPE.DIMENSION) {
            
        } else if (attributes.objectType === BUSINESSOBJECT_TYPE.METRIC) {

        } else if (attributes.objectType === BUSINESSOBJECT_TYPE.CLASS) {

        } else {
            throw new Error("BusinessObjectAdapter.createModel");
        }
    }

    private static createDimensionModel(attributes: IUniverseDimension) {
        const universeDimension = new UniverseDimension(attributes.name, attributes.description);
        universeDimension.select = attributes.select;
        universeDimension.where = attributes.where;
        universeDimension.tableName = attributes.tableName;
        //universeDimension.referenceId = attributes.referenceId;
        return universeDimension;
    }

    private static createMetricModel(attributes: IUniverseMetric) {
        const universeMetric = new UniverseMetric(attributes.name, attributes.description);
        universeMetric.select = attributes.select;
        universeMetric.where = attributes.where;
        universeMetric.tableName = attributes.tableName;
        //universeMetric.referenceId = attributes.referenceId;
        return universeMetric;
    }

    private static createClassModel(attributes: IUniverseClass) {
        const universeMetric = new UniverseClass();
        universeMetric.name = attributes.name
        universeMetric.description = attributes.description;
        //universeMetric.referenceId = attributes.referenceId;
        return universeMetric;
    }

    public static updateModel(model: BusinessObjectModel, attributes: IBusinessObjectAttribute) {

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