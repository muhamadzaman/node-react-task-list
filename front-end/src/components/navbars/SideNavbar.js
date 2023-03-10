import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import ExitToApp from "@mui/icons-material/ExitToApp";
import AuthContext from "../../context/AuthContext";
import { Button } from "@mui/material";
import PageContext from "../../context/PageContext";

const drawerWidth = 240;

const SideNavbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { pages, addNewPage, removePage, handleClick } =
    useContext(PageContext);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography>{user.name}</Typography>
        </Toolbar>

        <Divider />
        <Box>
          <List
            sx={{
              overflow: "auto",
              height: "80vh",
            }}
          >
            {pages &&
              pages.map((page, index) => (
                <ListItem
                  key={page}
                  display="flex"
                  justifyContent="space-around"
                >
                  <ListItemText
                    disablePadding
                    onClick={(e) => {
                      handleClick(e, page.Id);
                    }}
                    primary={page.name}
                    sx={{
                      "&:hover": {
                        color: "blue",
                        cursor: "pointer",
                      },
                    }}
                  />
                  <ListItemIcon>
                    <Delete
                      onClick={(e) => {
                        removePage(e, page.Id);
                      }}
                      fontSize="small"
                      sx={{
                        ml: 1,
                        color: "grey",
                        "&:hover": {
                          color: "red",
                          cursor: "pointer",
                        },
                      }}
                    />
                  </ListItemIcon>
                </ListItem>
              ))}
            <ListItem key={"new page"}>
              <ListItemButton onClick={addNewPage}>
                <Add />
                <ListItemText sx={{ ml: 1 }} disablePadding primary={"Page"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Divider sx={{ my: "10px" }} />
        <Box>
          <List
            sx={{
              bottom: 0,
              position: "fixed",
            }}
          >
            <ListItem
              components={Button}
              onClick={logoutUser}
              key={"logout"}
              disablePadding
            >
              <ListItemButton disablePadding>
                <ExitToApp />
                <ListItemText
                  disablePadding
                  sx={{ ml: 1 }}
                  primary={"Logout"}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SideNavbar;
