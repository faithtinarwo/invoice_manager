Invoice Manager - SAPUI5 Enterprise Worklist
A professional SAP Fiori-compliant web application built with the SAPUI5 framework. This app demonstrates a complete Master-Detail flow for managing corporate invoices, featuring real-time filtering, data visualization, and external data integration.

🚀 Key Features
Master-Detail Routing: Seamless navigation between an overview worklist and detailed invoice views using the UI5 Router.

Smart Filtering: Real-time search by Customer Name and Status using the sap.ui.comp.filterbar.FilterBar.

CSV Data Import: Integrated FileUploader logic to parse and inject external CSV data into the application model locally.

Data Visualization: Conditional formatting of "Amount" states and semantic status icons for quick data scannability.

Excel Export: Built-in functionality to export the current worklist to a spreadsheet format.

Internationalization (i18n): Fully decoupled text labels for multi-language support.

🛠 Tech Stack
Framework: SAPUI5 (OpenUI5)

Architecture: MVC (Model-View-Controller)

Data Handling: JSON Models & Client-side binding

UI Controls: SAP Fiori (sap.m, sap.f, sap.ui.layout)

Tooling: XML Views, JavaScript Controllers, and manifest.json configuration

📂 Project Structure
webapp/view/ - XML Views (App, Worklist, Detail)

webapp/controller/ - Logical controllers handling events and routing

webapp/model/ - Mock data (Invoices.json)

webapp/i18n/ - Language resource bundles

manifest.json - Application descriptor and routing configuration

🏁 How to Run
Clone the repo:

Bash

git clone https://github.com/YOUR_USERNAME/invoice-manager-ui5.git
Serve the app: Open the folder in VS Code and use the Live Server extension on index.html, or use the UI5 CLI:

Bash

ui5 serve
Access in Browser: Navigate to http://localhost:8080 (or your local port)
