import { useEffect, useState, type JSX, type ReactNode } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu as SubMenuRaw,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";

import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
//custom theme
import { tokens } from "../theme/theme";
//icon
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
//logo asset
import BTMLogo from "../assets/btm_logo.png";
//redux
import type { RootState } from "../store/store";
import { useSelector } from "react-redux";

import { fetchUserById } from "../services/UserService";

//config for subMenu
type SubMenuPropsFix = {
  title?: string;
  icon?: ReactNode;
  children?: ReactNode;
  [key: string]: unknown;
};

const SubMenu = SubMenuRaw as unknown as React.FC<SubMenuPropsFix>;
//-------------------

type ItemProps = {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  hasSubMenu?: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  subItems?: SubItem[];
};

type SubItem = {
  title: string;
  to: string;
};

const Item: React.FC<ItemProps> = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  hasSubMenu = false,
  subItems = [],
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (hasSubMenu && subItems.length > 0) {
    return (
      <SubMenu title={title} icon={icon}>
        {subItems.map((sub) => (
          <MenuItem
            key={sub.title}
            active={selected === sub.title}
            style={{ color: colors.grey[100] }}
            onClick={() => setSelected(sub.title)}
          >
            <Typography>{sub.title}</Typography>
            <Link to={sub.to} />
          </MenuItem>
        ))}
      </SubMenu>
    );
  }

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const userId = useSelector((state: RootState) => state.user.userId);
  const [user, setUser] = useState(null);

  const getUserById = async () => {
    if (userId != null) {
      const userData = await fetchUserById(userId);
      console.log(userData);

      if (userData) {
        console.log(userData);
        setUser(userData);
      }
    }
  };

  useEffect(() => {
    getUserById();
  }, [userId]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          background: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO and MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography
                  variant="h3"
                  fontWeight={"bold"}
                  color={colors.grey[100]}
                >
                  Interior ERP
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="BTM Global logo"
                  height="80px"
                  src={BTMLogo}
                  style={{ cursor: "pointer" }}
                />
              </Box>
              {/* <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{
                    m: "10px 0 0 0",
                  }}
                >
                  {user?.lastName || "unknown"}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  ADMIN RETAILER
                </Typography>
              </Box> */}
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Order"
              to="/order"
              icon={<ReceiptIcon />}
              selected={selected}
              setSelected={setSelected}
              hasSubMenu
              subItems={[
                { title: "All Order", to: "/order" },
                { title: "Create Order", to: "/order/create-order" },
                { title: "Order Request", to: "/order/order-requests" },
              ]}
            />

            <Item
              title="Customer"
              to="/customer"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Configuration"
              to="/configuration"
              icon={<SettingsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              hasSubMenu
              subItems={[
                {
                  title: "All System Configuration",
                  to: "/configuration",
                },
                {
                  title: "Create Configuration",
                  to: "/configuration/create-configuration",
                },
              ]}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

interface Permission {
  id: number;
  name: string;
}

interface Group {
  id: number;
  name: string;
  type: string | null;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  defaultLanguage: string;
  userName: string;
  active: boolean;
  lastAccess: string | null;
  loginTime: string | null;
  merchant: string;
  permissions: Permission[];
  groups: Group[];
}
