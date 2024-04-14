import React from "react";
import { Fab, Tooltip, Zoom } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ActionButtonProps {
  children: any;
  link?: string;
  onClick?: Function;
  tooltipText?: string;
}

export const ActionButton = (props: ActionButtonProps) => {
  const navigate = useNavigate();
  const { link, onClick } = props;

  const handleClick = () => {
    if (link) {
      navigate(link);
      return;
    }
    if (typeof onClick === "function") {
      onClick();
      return;
    }
  };

  return (
    <Zoom in={true}>
      <Tooltip title={props.tooltipText} placement="top-end">
        <Fab
          color="secondary"
          className="fab"
          onClick={handleClick}
          sx={{ bottom: 16, right: 16, position: "fixed" }}
        >
          {props.children}
        </Fab>
      </Tooltip>
    </Zoom>
  );
};

export default ActionButton;
