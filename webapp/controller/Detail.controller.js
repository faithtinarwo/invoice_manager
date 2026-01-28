sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, History, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("invoice_manager.controller.Detail", {

        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },

        /**
         * Binds the view to the specific invoice path passed in the URL
         */
        _onObjectMatched: function (oEvent) {
            var sPath = window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath);
            
            this.getView().bindElement({
                path: "/Invoices/" + sPath,
                model: "invoiceModel"
            });
        },

        /**
         * Formatter for Status states (needed since it's used in the view)
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
         * Logic for the Back button
         */
        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getOwnerComponent().getRouter().navTo("worklist", {}, true);
            }
        },

        onApprove: function() {
            MessageToast.show("Invoice has been approved successfully!");
        },

        onReject: function() {
            MessageBox.error("Invoice has been rejected.");
        }
    });
});