import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { ButtonStyleTheme } from "../../theme";
import { purpleDark } from "../../constants";

interface IButtonBackAndRegister {
  titleBackButton: string;
  titleRegisterButton: string;
}

export const ButtonBackAndRegister: React.FC<IButtonBackAndRegister> = ({
  titleBackButton,
  titleRegisterButton,
}) => {
  const navigate = useNavigate();

  const onNagivate = (route: string) => navigate(route);
  return (
    <Box
      sx={{ mt: 7 }}
      mt={10}
      className="flex flex-col md:flex-row space-between gap-3"
    >
      <ButtonStyleTheme onClick={() => onNagivate("/")} variant="outlined">
        {titleBackButton}
      </ButtonStyleTheme>
      <Button
        type="submit"
        variant="contained"
        style={{
          backgroundColor: purpleDark,
          width: "100%",
          height: "45px",
          borderRadius: "10px",
        }}
      >
        {titleRegisterButton}
      </Button>
    </Box>
  );
};
