import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function DynamicBackButton() {
  const navigate = useNavigate();
  const history = window.history;

  const handleNavigate = () => {
    if (history.state["idx"] > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <Button
      variant='contained'
      onClick={handleNavigate}
      startIcon={<ArrowBackIcon />}
    >
      Back
    </Button>
  );
}
