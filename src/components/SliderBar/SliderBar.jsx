import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaSistrix, FaGithub, FaUserPlus, FaBars } from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";

const SlideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapsedChange = (checked) => {
    if (collapsed === true) {
      setCollapsed(false);
    } else {
      setCollapsed(checked);
    }
  };

  const headerStyle = {
    padding: "24px",
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: "1px",
  };

  return (
    <div className="sidebar">
      <ProSidebar collapsed={collapsed}>
        <div className="btn-toggle" onClick={() => handleCollapsedChange(true)}>
          <FaBars />
        </div>
        <SidebarHeader style={headerStyle}>
          {collapsed ? "" : "Vitoria Vicentin"}
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<FaUserPlus />}>
              Cadastrar Cliente <Link to="/Form" />
            </MenuItem>
            <MenuItem icon={<FaSistrix />}>
              Consultar Cliente <Link to="/Table" />
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <div className="sidebar-btn-wrapper">
            <a
              href="https://github.com/vitoriavicentin"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span>Github</span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default SlideBar;
