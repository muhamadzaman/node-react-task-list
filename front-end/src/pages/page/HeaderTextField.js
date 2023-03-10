import React, { useContext } from "react";
import { makeStyles } from "@mui/styles";
import PageContext from "../../context/PageContext";

const HeaderTextField = ({ onKeyDown }) => {
  const { handleTitleChange, page } = useContext(PageContext);
  const classes = useStyles();

  return (
    <input
      className={classes.inputHeader}
      placeholder={"Add Header Text"}
      type="text"
      aria-label={"header"}
      name={"header"}
      value={page.name}
      onChange={handleTitleChange}
      onKeyDown={onKeyDown}
    />
  );
};

const useStyles = makeStyles({
  inputHeader: {
    backgroundColor: "transparent",
    border: 0,
    fontSize: "34px",
    fontWeight: 900,
    padding: "8px",
    "&:hover": {
      cursor: "pointer",
    },
  },
});
export default HeaderTextField;
