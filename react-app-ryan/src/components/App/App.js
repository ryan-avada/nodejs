// App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "@shopify/polaris";
import AppFrame from "../AppFrame/AppFrame";

function App() {
    return (
        <BrowserRouter>
            <AppProvider>
                <h1>Ryan</h1>
                <AppFrame />
            </AppProvider>
        </BrowserRouter>
    );
}

export default App;