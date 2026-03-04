import { Link } from "react-router-dom";
import useIsAllowed from "../hooks/useIsAllowed";

type TicketActionsPropsType = {
    ticketId: string | undefined;
    status: string | undefined;
}

const TicketActions = ({ ticketId, status }: TicketActionsPropsType) : React.JSX.Element => {
    const isAllowed = useIsAllowed();

    return (
        <>
            <Link to={`/tickets/${ticketId}`} className="text-sky-800 hover:text-sky-500">View</Link>
            {
                status !== "CLOSED" &&
                <>
                    <span className="text-neutral-300">|</span>
                    <Link
                        to={`/tickets/${ticketId}/edit`}
                        className="text-sky-800 hover:text-sky-500"
                    >
                        Update
                    </Link>

                    {isAllowed("REASSIGN_TICKET") &&
                        <>
                            <span className="text-neutral-300">|</span>
                            <Link
                                to={`/tickets/${ticketId}/assign`}
                                className="text-sky-800 hover:text-sky-500"
                            >
                                Assign
                            </Link>
                        </>
                    }
                </>
            }
        </>
    )
}

export default TicketActions;