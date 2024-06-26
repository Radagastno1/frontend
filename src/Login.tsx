import { Box, Typography } from "@mui/material";
import GoogleLoginButton from "./components/GoogleLoginButton";

const LogIn = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
        padding: "20px",
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: "20px" }}>
        Välkommen till Todo-Online
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Här kan du lägga till din logotyp om du har en */}
        {/* Exempel på en logotyp */}
        {/* <img src="/logo.png" alt="logo" style={{ width: "100px" }} /> */}

        <GoogleLoginButton />

        {/* Alternativ knapp för vanlig inloggning */}
        {/* <Button variant="contained" color="primary" fullWidth>
          Logga in
        </Button> */}
      </Box>
    </Box>
  );
};

export default LogIn;
