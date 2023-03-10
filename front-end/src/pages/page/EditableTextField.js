import React, { useState } from "react";
import { makeStyles } from "@mui/styles";

const EditableTextField = ({ text, onKeyDown }) => {
  const classes = useStyles();
  const [field, setField] = useState(text);

  const handleFieldChange = (e) => {
    e.preventDefault();
    setField(e.target.value);
  };

  return (
    <>
      <input
        className={classes.inputField}
        placeholder={"Add Field Text"}
        type="text"
        aria-label={"field"}
        name={"field"}
        value={field}
        onChange={handleFieldChange}
        onKeyDown={onKeyDown}
      />
    </>
  );
};

const useStyles = makeStyles({
  inputField: {
    backgroundColor: "transparent",
    border: 0,
    fontSize: "18px",
    padding: "8px",
    "&:hover": {
      cursor: "pointer",
    },
  },
});
export default EditableTextField;
