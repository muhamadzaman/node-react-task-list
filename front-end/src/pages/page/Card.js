import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import EditableTextField from "./EditableTextField";
import { Box } from "@mui/material";
import Delete from "@mui/icons-material/Delete";

export const Card = ({ id, text, index, moveCard, onKeyDown, removeField }) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
      <Box display="flex" justifylContent="space-around" alignItems="center">
        <EditableTextField text={text} onKeyDown={onKeyDown} />
        <Delete
          onClick={(e) => removeField(e, id)}
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
      </Box>
    </div>
  );
};

const style = {
  backgroundColor: "white",
  cursor: "move",
};
