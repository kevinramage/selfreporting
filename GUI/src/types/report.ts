import { ICoreObject } from "./coreObject";
import { IDataSource } from "./dataSource";
import { COMPONENT_TYPE, IReportComponent, IStack } from "./reportComponent";
import { IUniverseSelectionnable } from "./universeSelectionnable";

export interface IReport extends ICoreObject {
    selectFields: IUniverseSelectionnable[];
    rootComponent: IReportComponent | null;
    dataSources: IDataSource[];
}

export class ReportUtils {
    public static clone(report: IReport) : IReport {
        const clone = Object.assign({}, report);
        clone.rootComponent = ReportUtils.cloneRootComponent(clone.rootComponent);
        return clone;
    }

    private static cloneRootComponent(rootComponent: IReportComponent | null) {
        if (rootComponent !== null) {
            return ReportUtils.cloneComponent(rootComponent);
        } else {
            return null;
        }
    }

    private static cloneComponent(component: IReportComponent) {
        if (component.type === COMPONENT_TYPE.STACK) {
            const stack = Object.assign({}, component) as IStack;
            stack.subObjects = stack.subObjects.map(so => { return Object.assign({}, so) })
            return stack;
        } else {
            return Object.assign({}, component);
        }
    }
}