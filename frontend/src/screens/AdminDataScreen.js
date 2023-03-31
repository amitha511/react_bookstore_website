import React from "react"
import BoxData from "../components/BoxData"
import SocketIO from "../components/SocketIO"
import MenuAdmi from "../components/MenuAdmi"
import './AdminDataScreen.css'

function AdminDataScreen() { 
  useEffect(() => {
    const socket = io();
    // Socket.IO event listener for userCount updates
    socket.on('userCount', (count) => {
      //setUserCount(count);
    });

    return () => {
      socket.disconnect();
    };

  },[]);
    return (
        <div className="screenAdmin">
        <MenuAdmi></MenuAdmi>
            <iframe className="sold"
                 src="https://charts.mongodb.com/charts-project-0-sdfqk/embed/dashboards?id=81e5c7fb-5257-474e-a758-8442a092c2bf&theme=light&autoRefresh=true&maxDataAge=60&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed">
            </iframe>   

     </div>   
    )
}

export default AdminDataScreen