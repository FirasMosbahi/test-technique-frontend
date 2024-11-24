import { Box, CircularProgress } from "@mui/material";
import "./loader.css";

export default function Loader() {
  return (
    <div style={{ minHeight: "200px" }}>
      <Box className="loader-wraper">
        <CircularProgress color="inherit" className="loader" />
      </Box>
    </div>
  );
}
