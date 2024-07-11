import { AppBar, Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import GoogleLogoutButton from "./components/GoogleLogoutButton";
import { useAppSelector } from "./slices/store";

const RootLayout = () => {
  const activeUser = useAppSelector((state) => state.userSlice.activeUser);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: "100vh",
        alignItems: "center",
        width: "100%",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          height: "4rem",
          flexDirection: "row",
          backdropFilter: "blur(10px)",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginX: "20px"
          }}
        >
          <Typography sx={{color: "black"}}variant="h6">Inloggad som {activeUser?.name}</Typography>
          <GoogleLogoutButton />
        </Box>

      </AppBar>

      <main
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flex: 1,
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "center",
          padding: 0,
          margin: 0,
          boxSizing: "border-box",
        }}
      >
        <Outlet />
      </main>

      <footer className="flex bg-neutral-900"></footer>
    </div>
  );
};

export default RootLayout;

