import React, { useEffect, useState } from "react";
import { DashboardView } from "./DashboardView";
import { Link } from "react-router-dom";
import { ROOT } from "./../../navigation/CONSTANTS";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { getDashboardData } from "./../../services";
import { useAuth } from "./../../navigation/Auth/ProvideAuth";

export const DashboardContainer = () => {
    const [data, setData] = useState([]);
    let auth = useAuth();
    console.log("Dashboard Hit");
    useEffect(() => {
        getData();
        setInterval(getData, 10000);
        function getData() {
            getDashboardData(JSON.parse(auth.getUser()).token)
                .then((res) => {
                    console.log("Dashboard > getDashboardData > res=", res);
                    setData(res);
                })
                .catch((err) => {
                    console.log("axios err=", err);
                });
        };
    }, []);
    debugger;
    return (
        <div>
            <DashboardView />
            <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                <AgGridReact
                    rowData={data}>
                    <AgGridColumn field="queueGroupName" headerName="Queue Group" rowGroup='true'></AgGridColumn>
                    <AgGridColumn field="offered" headerName="Offered" width='150'></AgGridColumn>
                    <AgGridColumn field="handled" headerName="Handled" width='150'></AgGridColumn>
                    <AgGridColumn field="averageTalkTime" headerName="Average Talk Time" ></AgGridColumn>
                    <AgGridColumn field="averageHandlingTime" headerName="Average Handling Time" ></AgGridColumn>
                    <AgGridColumn field="serviceLevel" headerName="Service Level" ></AgGridColumn>
                </AgGridReact>
            </div>
        </div>
    );
};
