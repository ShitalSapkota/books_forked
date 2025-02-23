import { Outlet } from "react-router-dom";
import Header from "../components/Header";

// Calling the Header and children path here
function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Root;
