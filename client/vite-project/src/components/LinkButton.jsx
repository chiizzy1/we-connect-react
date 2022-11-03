import { Link } from "react-router-dom";

const LinkButton = ({ link, style, text }) => (
    <Link to={link} className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none hover:bg-sky-700 ${style}`}>
        {text}
    </Link>
)

export default LinkButton