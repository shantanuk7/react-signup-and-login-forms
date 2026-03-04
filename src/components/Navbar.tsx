import { Link } from "react-router-dom";
import useIsAllowed from "../hooks/useIsAllowed";

const Navbar = (): React.JSX.Element => {
    const isAllowed = useIsAllowed();

    return (
        <nav className="w-full p-4 md:px-20 md:py-6 flex items-center justify-between shadow-2xs">
            <h1 className="text-2xl font-bold text-sky-800">REACT</h1>

            <ul className="flex items-center gap-6">
                <li>
                    <Link
                        to="/"
                        className="text-lg font-medium hover:text-sky-800 transition duration-300 ease-in-out"
                    >
                        Home
                    </Link>
                </li>
                {isAllowed("CREATE_TICKET") &&
                    <li>
                        <Link
                            to="/tickets/create"
                            className="text-lg font-medium hover:text-sky-800 transition duration-300 ease-in-out"
                        >
                            Create Ticket
                        </Link>
                    </li>
                }
                <li>
                    <Link
                        to="/tickets"
                        className="text-lg font-medium hover:text-sky-800 transition duration-300 ease-in-out"
                    >
                        Tickets
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;