import React from 'react';
import { Link } from "react-router-dom";
import "./dashboard.css"



const Dashboard = () => {

    const users = [
        { id: 1, name: 'Nathan', role: 'Web Developer' },
        { id: 2, name: 'John', role: 'Web Designer' },
        { id: 3, name: 'Jane', role: 'Team Leader' },
      ]
    return (
        
        <div>
            <h1> dashboard </h1>
            <h2>summary</h2> 
            
            <h2>saved dorms</h2>

         
      {
        users.map(function(user){
          // returns Nathan, then John, then Jane
          return <h3> <Link to ="/reviews">{user.name} as the {user.role}</Link> </h3>
        })
      }
      
      

        </div>
    )
}

export default Dashboard;