import { Button, styled } from "@mui/material";
import { purpleDark } from "../constants";

export const ButtonStyleTheme = styled(Button)({
  width: "100%",
  height: "45px",
  borderRadius: "10px",
  borderColor: purpleDark,
  color: purpleDark,
  "&:hover": {
    backgroundColor: "white",
    borderColor: purpleDark,
    color: purpleDark,
  },
});
