import React, { useContext } from "react";
import { Box } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container } from "./Container";
import Edit from "@mui/icons-material/Edit";
import HeaderTextField from "./HeaderTextField";
import PageContext from "../../context/PageContext";

const Page = () => {
  const { EditExistingPage, isOpen } = useContext(PageContext);

  return isOpen ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={"column"}
      sx={{ mt: 10 }}
    >
      <form onSubmit={EditExistingPage}>
        <Box display="flex" justifylContent="space-around" alignItems="center">
          <HeaderTextField />
          <Edit
            fontSize="medium"
            sx={{
              ml: 1,
              color: "grey",
              "&:hover": {
                color: "green",
                cursor: "pointer",
              },
            }}
          />
        </Box>

        <hr />
        <div>
          <DndProvider backend={HTML5Backend}>
            <Container />
          </DndProvider>
        </div>
      </form>
    </Box>
  ) : (
    ""
  );
};

export default Page;
