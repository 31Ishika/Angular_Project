// custom-datatables.d.ts

declare module 'datatables.net' {
    interface DataTable {
      // Correct the type declaration to match the expected type.
      // In this example, it's using 'Api'.
      DataTable(opts?: DataTables.Settings): DataTables.Api;
    }
  
    interface JQueryStatic {
      // Correct the type declaration for 'dataTable'.
      // It should match the 'StaticFunctions' type.
      dataTable: DataTables.StaticFunctions;
    }
  }
  