import React from "react"
import SocketIO from "../components/SocketIO"
import MenuAdmi from "../components/MenuAdmi"
import './AdminDataScreen.css'

function AdminUsersScreen() { 

    return (
        <div className="screenAdmin">
        <MenuAdmi></MenuAdmi>
            <SocketIO></SocketIO>
        
            <iframe className="sold1"
                src="https://charts.mongodb.com/charts-project-0-sdfqk/embed/dashboards?id=86ac6b67-09e2-4b3d-8f9a-2f6ad63d90e9&theme=light&autoRefresh=true&maxDataAge=60&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"></iframe>      
    </div>
    )
    
}

export default AdminUsersScreen;