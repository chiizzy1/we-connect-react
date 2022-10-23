import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Link to="/profile"> Profile </Link>
      <Link to="/feed"> feed </Link>
    </>
  )
}

export default Navbar