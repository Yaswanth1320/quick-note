import NavbarClient from "./NavbarClient";
import { getSession } from "@/lib/auth";

const Navbar = async () => {
  const session = await getSession(); // server-side fetch
  return <NavbarClient session={session} />;
};

export default Navbar;
