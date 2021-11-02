import { DataTypes, Sequelize } from "sequelize";
import { ConnectionModel } from "./connection";
import { UniverseModel } from "./universe";
import { UniverseColumnModel } from "./universeColumn";
import { UniverseTableModel } from "./universeTable";
import { Universe } from "../business/core/universe";
import { UniverseTable } from "../business/core/universeObjects/universeTable";
import { UniverseColumn } from "../business/core/universeObjects/universeColumn";
import { UniverseClass } from "../business/core/universeObjects/universeClass";
import { UniverseDimension } from "../business/core/universeObjects/universeDimension";
import { BusinessObjectModel } from "./businessObject";
import { UniverseMetric } from "../business/core/universeObjects/universeMetric";
import { Report } from "../business/core/report";
import { UniverseConnection } from "../business/core/connection";
import { ReportModel } from "./report";
import { ReportComponentModel } from "./reportComponent";
import { ReportDataGridModel } from "./reportDataGrid";
import { ReportDataGridColumnModel } from "./reportDataGridColumn";
import { DataGridColumn, DataGridComponent } from "../business/core/reportObjects/reportComponent";
import { ReportRestrictionModel } from "./reportRestriction";
import { v4 } from "uuid";
import { ReportRestriction, RESTRICTIONOPERAND_TYPE, RESTRICTIONOPERATION_TYPE } from "../business/core/reportObjects/reportRestriction";
import { UniverseJoinModel } from "./universeJoint";
import { UniverseJoin } from "../business/core/universeObjects/universeJoin";

export class InitDataAccess {

    public run(sequelize: Sequelize) {

        this.defineModels(sequelize);
        this.addRelations();
        this.addModels(sequelize);
    }

    private defineModels(sequelize: Sequelize){

        // Universe
        UniverseModel.init({
            id: { type: DataTypes.STRING, primaryKey: true },
            name: { type: DataTypes.STRING },
            description: { type: DataTypes.STRING }
        }, { sequelize: sequelize, tableName: "universes" });
        
        // Connection
        ConnectionModel.init({
            id: { type: DataTypes.STRING, primaryKey: true },
            name: { type: DataTypes.STRING },
            description: { type: DataTypes.STRING },
            host: { type: DataTypes.STRING },
            username: { type: DataTypes.STRING },
            password: { type: DataTypes.STRING },
            database: { type: DataTypes.STRING },
            universeId: { type: DataTypes.STRING }
        }, { sequelize: sequelize, tableName: "connections" });
        
        UniverseTableModel.init({
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.STRING
            },
            universeId: {
                type: DataTypes.STRING
            }
        }, { sequelize: sequelize, tableName: "universeTables" });

        UniverseColumnModel.init({
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING
            },
            type: {
                type: DataTypes.STRING
            },
            universeTableId: {
                type: DataTypes.STRING
            },
        }, { sequelize: sequelize, tableName: "universeColumns"});

        BusinessObjectModel.init({
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            objectType: { type: DataTypes.STRING },
            name: {
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.STRING
            },
            tableName: {
                type: DataTypes.STRING
            },
            selectStatement: {
                type: DataTypes.STRING
            },
            whereStatement: {
                type: DataTypes.STRING
            },
            referenceId: { type: DataTypes.STRING },
            linkId: { type: DataTypes.STRING },
            businessObjectId: { type: DataTypes.STRING },
            universeId: { type: DataTypes.STRING },
            reportId: { type: DataTypes.STRING }
        }, { sequelize: sequelize, tableName: "businessObjects"});

        ReportModel.init({
            id: { type: DataTypes.STRING, primaryKey: true },
            name: { type: DataTypes.STRING },
            description: { type: DataTypes.STRING },
            universeId: { type: DataTypes.STRING }
        },{ sequelize: sequelize, tableName: "reports"});

        // ReportComponent
        ReportComponentModel.init({
            id: { type: DataTypes.STRING, primaryKey: true }
        }, {sequelize: sequelize, tableName: "reportComponent"});

        // ReportDataGrid
        ReportDataGridModel.init({
            id: { type: DataTypes.STRING, primaryKey: true },
            rowPerPage: { type: DataTypes.INTEGER }
        }, { sequelize: sequelize, tableName: "reportDataGrid" });

        // ReportDataGridColumn
        ReportDataGridColumnModel.init({
            id: { type: DataTypes.STRING, primaryKey: true },
            fieldName: { type: DataTypes.STRING },
            headerName: { type: DataTypes.STRING },
            description: { type: DataTypes.STRING },
            width: { type: DataTypes.INTEGER },
            order: { type: DataTypes.INTEGER }
        }, {sequelize: sequelize, tableName: "reportDataGridColumn"});

        // ReportRestriction
        ReportRestrictionModel.init({
            id: { type: DataTypes.STRING, primaryKey: true },
            operationType: { type: DataTypes.STRING },
            operand2Type: { type: DataTypes.STRING },
            operand2Constant: { type: DataTypes.STRING }
        }, {sequelize: sequelize, tableName: "reportRestriction"});

        // Universe join
        UniverseJoinModel.init({
            id: { type: DataTypes.STRING, primaryKey: true },
            nameA: { type: DataTypes.STRING },
            nameB: { type: DataTypes.STRING }
        }, {sequelize: sequelize, tableName: "universeJoins"})
    }

    private addRelations() {

        // Universes
        ConnectionModel.belongsTo(UniverseModel, { targetKey: "id" });
        UniverseModel.hasOne(ConnectionModel, { sourceKey: "id", as: "connection" });

        // Tables and joins
        UniverseModel.hasMany(UniverseTableModel, { sourceKey: "id", as: "tables" });
        UniverseTableModel.hasMany(UniverseColumnModel, { sourceKey: "id", as: "columns"});
        UniverseModel.hasMany(UniverseJoinModel, { sourceKey: "id", as: "joins" });
        UniverseJoinModel.belongsTo(UniverseTableModel, { targetKey: "id", as: "tableA" });
        UniverseJoinModel.belongsTo(UniverseTableModel, { targetKey: "id", as: "tableB" });

        UniverseModel.hasMany(BusinessObjectModel, { sourceKey: "id", as: "objects" });
        BusinessObjectModel.hasMany(BusinessObjectModel, { sourceKey: "id", as: "subObjects"});

        // Report data access
        ReportModel.belongsTo(UniverseModel, { targetKey: "id", as: "universe" });
        ReportModel.hasMany(BusinessObjectModel, { sourceKey: "id", foreignKey: "reportId", as: "selectFields"});
        ReportModel.hasOne(ReportRestrictionModel, { sourceKey: "id", as: "restriction" });
        ReportRestrictionModel.hasOne(BusinessObjectModel, { sourceKey: "id", as: "operand1"});
        ReportRestrictionModel.hasOne(BusinessObjectModel, { sourceKey: "id", as: "operand2"});

        // Report presentation
        ReportModel.hasOne(ReportComponentModel, { sourceKey: "id", as: "rootComponent" });
        ReportComponentModel.hasOne(ReportDataGridModel, { sourceKey:"id", as: "dataGrid" });
        ReportDataGridModel.hasMany(ReportDataGridColumnModel, { sourceKey: "id", as: "columns"});
    }

    private addModels(sequelize: Sequelize) {
        sequelize.modelManager.addModel(UniverseModel);
        sequelize.modelManager.addModel(ConnectionModel);
        sequelize.modelManager.addModel(UniverseTableModel);
        sequelize.modelManager.addModel(UniverseColumnModel);
        sequelize.modelManager.addModel(BusinessObjectModel);
        sequelize.modelManager.addModel(ReportModel);
        sequelize.modelManager.addModel(ReportComponentModel);
        sequelize.modelManager.addModel(ReportDataGridModel);
        sequelize.modelManager.addModel(ReportDataGridColumnModel);
        sequelize.modelManager.addModel(ReportRestrictionModel);
        sequelize.modelManager.addModel(UniverseJoinModel);
    }

    public generateData(sequelize: Sequelize) {
        return new Promise<void>(async(resolve) => {
            const universe = new Universe();
            universe.name = "Example - Products";

            const salesTypes = new UniverseTable();
            salesTypes.name = "dim_sales_type";
            salesTypes.addColumn(new UniverseColumn("sales_type_id", "int"));
            salesTypes.addColumn(new UniverseColumn("type_name", "string"));
            universe.dataLayer.addTable(salesTypes);

            const store = new UniverseTable();
            store.name = "dim_store";
            store.addColumn(new UniverseColumn("store_id", "int"));
            store.addColumn(new UniverseColumn("store_address", "string"));
            store.addColumn(new UniverseColumn("city", "string"));
            store.addColumn(new UniverseColumn("region", "string"));
            store.addColumn(new UniverseColumn("state", "string"));
            store.addColumn(new UniverseColumn("country", "string"));
            universe.dataLayer.addTable(store);

            const employee = new UniverseTable();
            employee.name = "dim_employee";
            employee.addColumn(new UniverseColumn("employee_id", "int"));
            employee.addColumn(new UniverseColumn("first_name", "string"));
            employee.addColumn(new UniverseColumn("last_name", "string"));
            employee.addColumn(new UniverseColumn("birth_year", "int"));
            universe.dataLayer.addTable(employee);

            const product = new UniverseTable();
            product.name = "dim_product";
            product.addColumn(new UniverseColumn("product_id", "int"));
            product.addColumn(new UniverseColumn("product_name", "string"));
            product.addColumn(new UniverseColumn("product_type", "string"));
            universe.dataLayer.addTable(product);

            const time = new UniverseTable();
            time.name = "dim_time";
            time.addColumn(new UniverseColumn("time_id", "int"));
            time.addColumn(new UniverseColumn("action_date", "date"));
            time.addColumn(new UniverseColumn("action_week", "int"));
            time.addColumn(new UniverseColumn("action_month", "int"));
            time.addColumn(new UniverseColumn("action_year", "int"));
            time.addColumn(new UniverseColumn("action_weekday", "string"));
            universe.dataLayer.addTable(time);

            const sales = new UniverseTable();
            sales.name = "fact_sales";
            sales.addColumn(new UniverseColumn("product_id", "int"));
            sales.addColumn(new UniverseColumn("time_id", "int"));
            sales.addColumn(new UniverseColumn("store_id", "int"));
            sales.addColumn(new UniverseColumn("employee_id", "int"));
            sales.addColumn(new UniverseColumn("sales_type_id", "int"));
            sales.addColumn(new UniverseColumn("price", "float"));
            sales.addColumn(new UniverseColumn("quantity", "float"));
            universe.dataLayer.addTable(sales);

            const storesSalesJoin = new UniverseJoin();
            storesSalesJoin.nameA = "store_id";
            storesSalesJoin.tableA = store;
            storesSalesJoin.nameB = "store_id";
            storesSalesJoin.tableB = sales;
            universe.dataLayer.addJoin(storesSalesJoin);

            const saleTypesSalesJoin = new UniverseJoin();
            saleTypesSalesJoin.nameA = "sales_types_id";
            saleTypesSalesJoin.tableA = salesTypes;
            saleTypesSalesJoin.nameB = "sales_types_id";
            saleTypesSalesJoin.tableB = sales;
            universe.dataLayer.addJoin(saleTypesSalesJoin);

            const employeesSalesJoin = new UniverseJoin();
            employeesSalesJoin.nameA = "employee_id";
            employeesSalesJoin.tableA = employee;
            employeesSalesJoin.nameB = "employee_id";
            employeesSalesJoin.tableB = sales;
            universe.dataLayer.addJoin(employeesSalesJoin);

            const productsSalesJoin = new UniverseJoin();
            productsSalesJoin.nameA = "product_id";
            productsSalesJoin.tableA = product;
            productsSalesJoin.nameB = "product_id";
            productsSalesJoin.tableB = sales;
            universe.dataLayer.addJoin(productsSalesJoin);

            const timesSalesJoin = new UniverseJoin();
            timesSalesJoin.nameA = "time_id";
            timesSalesJoin.tableA = time;
            timesSalesJoin.nameB = "time_id";
            timesSalesJoin.tableB = sales;
            universe.dataLayer.addJoin(timesSalesJoin);



            const saleTypeId = new UniverseDimension("Sale type id", "Id of the SaleType");
            saleTypeId.tableName = "dim_sales_type";
            saleTypeId.select = "sales_type_id";
            const saleTypeName = new UniverseDimension("Sale type name", "Name of the SaleType");
            saleTypeName.tableName = "dim_sales_type";
            saleTypeName.select = "type_name";
            
            const salesTypesClass = new UniverseClass();
            salesTypesClass.name = "Sale Type";
            salesTypesClass.addObject(saleTypeId);
            salesTypesClass.addObject(saleTypeName);
            universe.businessLayer.addObject(salesTypesClass);

            const storeId = new UniverseDimension("Store id", "Id of the store");
            storeId.tableName = "dim_store";
            storeId.select = "store_id";
            const storeAddress = new UniverseDimension("Store address", "Postal address of the store");
            storeAddress.tableName = "dim_store";
            storeAddress.select = "store_address";
            const city = new UniverseDimension("Store city", "City of the store");
            city.tableName = "dim_store";
            city.select = "city";
            const region = new UniverseDimension("Store region", "Region of the store");
            region.tableName = "dim_store";
            region.select = "region";
            const state = new UniverseDimension("Store state", "State of the store");
            state.tableName = "dim_store";
            state.select = "state";
            const country = new UniverseDimension("Store country", "Country of the store");
            country.tableName = "dim_store";
            country.select = "country";

            const storeClass = new UniverseClass();
            storeClass.name = "Store";
            storeClass.addObject(storeId);
            storeClass.addObject(storeAddress);
            storeClass.addObject(city);
            storeClass.addObject(region);
            storeClass.addObject(state);
            storeClass.addObject(country);
            universe.businessLayer.addObject(storeClass);

            const employeeId = new UniverseDimension("Employee Id", "Id of the employee");
            employeeId.tableName = "dim_employee";
            employeeId.select = "employee_id";
            const employeeFirstName = new UniverseDimension("Employee first name", "First name of the employee");
            employeeFirstName.tableName = "dim_employee";
            employeeFirstName.select = "fist_name";
            const employeeLastName = new UniverseDimension("Employee last name", "Last name of the employee");
            employeeLastName.tableName = "dim_employee";
            employeeLastName.select = "last_name";
            const employeeBirthYear = new UniverseDimension("Employee birth year", "Birth year of the employee");
            employeeBirthYear.tableName = "dim_employee";
            employeeBirthYear.select = "birth_year";

            const employeeClass = new UniverseClass();
            employeeClass.name = "Employee";
            employeeClass.addObject(employeeId);
            employeeClass.addObject(employeeFirstName);
            employeeClass.addObject(employeeLastName);
            employeeClass.addObject(employeeBirthYear);
            universe.businessLayer.addObject(employeeClass);

            const timeId = new UniverseDimension("Time id", "Time id");
            timeId.tableName = "dim_time";
            timeId.select = "time_id";
            const timeDate = new UniverseDimension("Time date", "Time date");
            timeDate.tableName = "dim_time";
            timeDate.select = "action_date";
            const timeWeek = new UniverseDimension("Time week", "Time week");
            timeWeek.tableName = "dim_time";
            timeWeek.select = "action_week";
            const timeMonth = new UniverseDimension("Time month", "Time month");
            timeMonth.tableName = "dim_time";
            timeMonth.select = "action_month";
            const timeYear = new UniverseDimension("Time year", "Time year");
            timeYear.tableName = "dim_time";
            timeYear.select = "action_year";
            const timeWeekDay = new UniverseDimension("Time week day", "Time week day");
            timeWeekDay.tableName = "dim_time";
            timeWeekDay.select = "action_weekday";

            const timeClass = new UniverseClass();
            timeClass.name = "Time";
            timeClass.addObject(timeId);
            timeClass.addObject(timeDate);
            timeClass.addObject(timeWeek);
            timeClass.addObject(timeMonth);
            timeClass.addObject(timeYear);
            timeClass.addObject(timeWeekDay);
            universe.businessLayer.addObject(timeClass);

            const productId = new UniverseDimension("Product id", "Id of the product");
            productId.tableName = "dim_product";
            productId.select = "product_id";
            const productName = new UniverseDimension("Product name", "name of the product");
            productName.tableName = "dim_product";
            productName.select = "product_name";
            const productType = new UniverseDimension("Product type", "type of the product");
            productType.tableName = "dim_product";
            productType.select = "product_type";

            const productClass = new UniverseClass();
            productClass.name = "Product";
            productClass.addObject(productId);
            productClass.addObject(productName);
            productClass.addObject(productType);
            universe.businessLayer.addObject(productClass);

            const salesPrice = new UniverseMetric("Sales price", "Price of the sales");
            salesPrice.tableName = "fact_sales";
            salesPrice.select = "price";
            const salesQuantity = new UniverseMetric("Sales quantity", "Quantity of the sales");
            salesQuantity.tableName = "fact_sales";
            salesQuantity.select = "quantity";

            const salesClass = new UniverseClass();
            salesClass.name = "Sales";
            salesClass.addObject(salesPrice);
            salesClass.addObject(salesQuantity);
            universe.businessLayer.addObject(salesClass);

            const connection = new UniverseConnection();
            connection.host = "localhost";
            connection.username = "root";
            connection.database = "selfreporting_products";
            universe.dataLayer.connection = connection;

            const productIdColumn = new DataGridColumn();
            productIdColumn.headerName = "Product Id";
            //productIdColumn.fieldName = "{{Query(a.productId)}}";
            productIdColumn.fieldName = "product_type";
            productIdColumn.description = "Id of the product";

            const productNameColumn = new DataGridColumn();
            productNameColumn.headerName = "Product Name";
            //productIdColumn.fieldName = "{{Query(a.productId)}}";
            productNameColumn.fieldName = "product_name";
            productNameColumn.description = "Name of the product";

            const priceColumn = new DataGridColumn();
            priceColumn.headerName = "Price";
            priceColumn.fieldName = "price";
            priceColumn.description = "Price";

            const quantityColumn = new DataGridColumn();
            quantityColumn.headerName = "Quantity";
            quantityColumn.fieldName = "quantity";
            quantityColumn.description = "Quantity";

            const component = new DataGridComponent();
            component.addColumn(productIdColumn);
            component.addColumn(productNameColumn);
            component.addColumn(priceColumn);
            component.addColumn(quantityColumn);

            const restrictionProductType = productType.clone();
            restrictionProductType.id = v4();
            restrictionProductType.referenceId = productType.id;

            const restriction = new ReportRestriction();
            restriction.operand1 = restrictionProductType;
            restriction.operationType = RESTRICTIONOPERATION_TYPE.EQUALS;
            restriction.operand2Type = RESTRICTIONOPERAND_TYPE.CONSTANT;
            restriction.operand2Constant = "Kids";

            const report = new Report("myProductType");
            report.universe = universe;
            report.dataSource.addObject(productType);
            report.dataSource.addObject(productName);
            report.dataSource.addObject(salesPrice);
            report.dataSource.addObject(salesQuantity);
            report.dataSource.restriction = restriction;
            report.rootComponent = component;
            
            await universe.create();
            await report.create();

            resolve();
        });
    }
}