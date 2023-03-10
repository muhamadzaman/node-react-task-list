import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footerContainer}>
      <Typography variant="p">
        Copyrights {new Date().getFullYear()} © Notion. All Rights Reserved
      </Typography>
    </div>
  );
};

const useStyles = makeStyles({
  flexGrow: {
    flex: "1",
  },

  footerContainer: {
    position: "fixed",
    textAlign: "center",
    fontSize: "14px",
    height: "25px",
    bottom: "0px",
    left: "0px",
    right: "0px",
    marginBottom: "0px",
  },
});

export default Footer;
