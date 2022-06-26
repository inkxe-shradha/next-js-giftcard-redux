import { useRouter } from "next/router";
import React from "react";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@emotion/react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import menuItems from "../../../config/menu.config";
import ListItemButton from "@mui/material/ListItemButton";
const NavBar = ({
  drawer,
  open,
  handleDrawerClose,
  toolbar,
  drawerPaper,
  navDrawer,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const navigate = (pathName) => {
    router.push(pathName);
  };
  return (
    <nav className={navDrawer}>
      <Paper
        sx={{ display: { xs: "none", sm: "block", md: "block" } }}
        className={drawerPaper}
      >
        <Drawer
          variant="temporary"
          elevation={0}
          open={open}
          className={drawer}
          onClose={handleDrawerClose}
          classes={{
            paper: drawerPaper,
          }}
          anchor={theme.direction === "rtl" ? "right" : "left"}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.id}
                selected={router.pathname === item.path}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      </Paper>
    </nav>
  );
};

export default NavBar;
