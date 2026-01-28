sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/export/Spreadsheet",
    "sap/m/MessageToast"
], function (Controller, Filter, FilterOperator, Spreadsheet, MessageToast) {
    "use strict";

    return Controller.extend("invoice_manager.controller.Worklist", {

        /**
         * Formatter for Status states
         */
        formatStatusColor: function (sStatus) {
            switch (sStatus) {
                case "Paid": return "Success";
                case "Pending": return "Warning";
                case "Overdue": return "Error";
                default: return "None";
            }
        },

        /**
         * Formatter for Status Icons
         */
        formatStatusIcon: function (sStatus) {
            switch (sStatus) {
                case "Paid": 
                    return "sap-icon://sys-enter-2"; // Green check circle
                case "Pending": 
                    return "sap-icon://status-inactive"; // Neutral circle
                case "Overdue": 
                    return "sap-icon://error"; // Red exclamation/X
                default: 
                    return "";
            }
        },

        /**
         * Triggered by the "Go" button on the FilterBar
         */
        onSearch: function () {
            var aTableFilters = [];
            var sQuery = this.byId("filterCustomer").getValue(); 
            var sStatus = this.byId("filterStatus").getSelectedKey(); 

            if (sQuery && sQuery.length > 0) {
                aTableFilters.push(new Filter("CustomerName", FilterOperator.Contains, sQuery));
            }
            
            if (sStatus && sStatus !== "All") {
                aTableFilters.push(new Filter("Status", FilterOperator.EQ, sStatus));
            }

            this.byId("tableInvoices").getBinding("items").filter(aTableFilters);
        },

        /**
         * Resets all filters and shows all data
         */
        onReset: function () {
            // 1. Clear the Input field
            this.byId("filterCustomer").setValue("");
            
            // 2. Set Select back to "All Statuses"
            this.byId("filterStatus").setSelectedKey("All");
            
            // 3. Clear the table filter (pass an empty array)
            this.byId("tableInvoices").getBinding("items").filter([]);
            
            MessageToast.show("Filters reset");
        },

        /**
         * Triggered by the Excel button in the Table Toolbar
         */
        onExport: function() {
            var oTable = this.byId("tableInvoices");
            var oRowBinding = oTable.getBinding("items");
            var aCols = [
                { label: "Invoice Number", property: "InvoiceNumber" },
                { label: "Customer", property: "CustomerName" },
                { label: "Amount", property: "Amount", type: "number" },
                { label: "Currency", property: "Currency" },
                { label: "Status", property: "Status" }
            ];

            var oSettings = {
                workbook: { columns: aCols },
                dataSource: oRowBinding,
                fileName: "Invoices_Export.xlsx",
                worker: false 
            };

            var oSheet = new Spreadsheet(oSettings);
            oSheet.build().finally(function() {
                oSheet.destroy();
                MessageToast.show("Export complete");
            });
        },

        onDeleteAll: function () {
            var oModel = this.getView().getModel("invoiceModel");
            
            sap.m.MessageBox.confirm("Are you sure you want to clear all invoices?", {
                onClose: function (sAction) {
                    if (sAction === "OK") {
                        oModel.setProperty("/Invoices", []);
                        sap.m.MessageToast.show("All data cleared");
                    }
                }
            });
        },

        /**
         * Navigation to Detail Page
         */
        onListItemPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var sPath = oItem.getBindingContext("invoiceModel").getPath().split("/").pop();
            
            this.getOwnerComponent().getRouter().navTo("detail", {
                invoicePath: window.encodeURIComponent(sPath)
            });
        }
    });
});