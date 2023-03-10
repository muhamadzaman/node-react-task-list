import React from "react";
import { Grid } from "@mui/material";
import SideNavbar from "../../components/navbars/SideNavbar";
import Page from "../page/Page";

const Home = () => {
  return (
    <Grid container>
      <Grid item md={2}>
        <SideNavbar />
      </Grid>
      <Grid item md={10}>
        <Page />
      </Grid>
    </Grid>
  );
};

export default Home;
