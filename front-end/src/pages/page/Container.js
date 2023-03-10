import { useCallback, useContext, useEffect } from "react";
import PageContext from "../../context/PageContext.js";
import { Card } from "./Card.js";
import Add from "@mui/icons-material/Add";
import Box from "@mui/material/Box";

export const Container = () => {
  const {
    fields,
    moveField,
    onKeyDownField,
    removeField,
    addNewField,
    updateFields,
  } = useContext(PageContext);

  useEffect(() => {
    const setTheSorting = () => {
      const sortedArray = [];
      if (fields && fields.length > 1) {
        fields.map((field, index) =>
          sortedArray.push({ ...field, sort_order: index })
        );
        updateFields(sortedArray);
      }
    };

    setTheSorting();
  }, [fields]);

  const renderCard = useCallback(
    (field, index) => {
      return (
        <Card
          key={field.Id}
          index={index}
          id={field.Id}
          text={field.name}
          moveCard={moveField}
          onKeyDown={(e) => onKeyDownField(e, field.Id)}
          removeField={removeField}
        />
      );
    },
    [fields]
  );
  return (
    <>
      <div style={style}>{fields.map((card, i) => renderCard(card, i))}</div>
      <Box display="flex" alignItems="center">
        <Add
          onClick={(e) => addNewField(e)}
          fontSize="medium"
          sx={{
            color: "grey",
            "&:hover": {
              color: "green",
              cursor: "pointer",
            },
          }}
        />
      </Box>
    </>
  );
};

const style = {
  width: 400,
};
