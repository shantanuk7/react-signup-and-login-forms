import type { TicketType } from '../types/ticket'

type TicketCardProps = {
    ticket: TicketType | null;
    isAllowed: (permission: string) => boolean;
}

const TicketCard = ({ticket, isAllowed}: TicketCardProps) : React.JSX.Element => {
    return (
        <div>
            <h2><span className="font-semibold">Title: </span>{ticket?.title}</h2>
            <h2><span className="font-semibold">Description: </span>{ticket?.description}</h2>
            <h2><span className="font-semibold">Status: </span>{ticket?.status}</h2>
            <h2>
                {isAllowed("VIEW_OWN_TICKETS") &&
                    <>
                        <span className="font-semibold">Support Agent: </span>{ticket?.agentName}
                    </>
                }
                {isAllowed("VIEW_ASSIGNED_TICKETS") &&
                    <>
                        <span className="font-semibold">Priority: </span>{ticket?.priority}
                    </>
                }
            </h2>
            <h2><span className="font-semibold">Created On: </span>{ticket?.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : "-"}</h2>
        </div>
    )
}

export default TicketCard
