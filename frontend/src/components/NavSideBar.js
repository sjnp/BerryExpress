import React from "react";
import {
  Link, useRouteMatch 
} from 'react-router-dom'
import './css/NavSideBar.css'
import MaterialIcon from "../icons/MaterialIcon";

const NavSideBar = ({className}) => {

  const path = useRouteMatch().path.substring(1)
  const [mainPath, subPath] = path.split('/')

  const tabs = {
    admin: [
      { path: "addStaff", label: "เพิ่มพนักงาน", iconName: "person_add"},
      { path: "getStaff", label: "เรียกดูพนักงาน", iconName: "person_search" },
      { path: "addBranch", label: "เพิ่มสาขา", iconName: "add_business"},
      { path: "getBranch", label: "เรียกดูสาขา", iconName: "map"},
    ],
    staff: [
      { path: "addParcel", label: "เพิ่มพัสดุ", iconName: "add"},
      { path: "updateParcelStatus", label: "อัปเดตสถานะพัสดุ", iconName: "local_shipping"},
    ],
    postman: [
      { path: "updateParcelStatus", label: "อัปเดตสถานะพัสดุ", iconName: "local_shipping"},
    ]
  }

  const handleLogout = () => {
    sessionStorage.removeItem('session')
  }

  return (
    <div className={className}>
      <div className="navlist-container">
        <ul> { 
          tabs[mainPath].map(({path, label, iconName}, index) => 
            <li key={index}
              className={ 
                subPath === path
                ? "active"
                : "inactive"
              }
            >
              <MaterialIcon iconName={iconName} />
              <Link to={`/${mainPath}/${path}`}>
                {label}
              </Link>
            </li>
          )}
        </ul>
        <div className="logout-section">
          <Link to={"/login"} onClick={handleLogout}>
            <MaterialIcon iconName="logout" />
            {"Logout"}
          </Link>
        </div>
      </div>
      
    </div>
 )
}

export default NavSideBar