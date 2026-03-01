import { useEffect, useState } from "react";
import { getAllTickets } from "../api/ticket.api";
import type { TicketType } from "../types/ticket";
import { Link } from "react-router-dom";

const Tickets = () => {
    const [tickets, setTickets] = useState<(TicketType | null)[]>();

    useEffect(() => {
        const fetchTickets = async () => {
            const data = await getAllTickets();
            setTickets(data.data);
        };

        fetchTickets();
    }, []);

    return (
        <div className="w-full flex flex-col items-center justify-center gap-4 p-4 md:p-20">
            <h1 className="text-xl sm:text-2xl font-extrabold">Tickets</h1>

            <div className="w-full shadow-xs rounded-2xl border border-neutral-200 bg-white overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-sm text-body border-b border-neutral-200">
                        <tr>
                            <th className="px-3 md:px-6 py-3 font-semibold">
                                Title
                            </th>
                            <th className="px-3 md:px-6 py-3 font-semibold">
                                Description
                            </th>
                            <th className="px-3 md:px-6 py-3 font-semibold">
                                Status
                            </th>
                            <th className="px-3 md:px-6 py-3 font-semibold text-nowrap">
                                Support Agent
                            </th>
                            <th className="px-3 md:px-6 py-3 font-semibold">
                                Create At
                            </th>
                            <th className="px-3 md:px-6 py-3 font-semibold">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets?.map((ticket) => (
                            <tr key={ticket?.id} className="border-b last:border-b-0 border-neutral-200">
                                <td className="px-3 md:px-6 py-4 font-medium whitespace-nowrap">
                                    {ticket?.title}
                                </td>
                                <td className="px-3 md:px-6 py-4 max-w-md">
                                    <p className="truncate text-nowrap">
                                        {ticket?.description}
                                    </p>
                                </td>
                                <td className="px-3 md:px-6 py-4">
                                    {ticket?.status}
                                </td>
                                <td className="px-3 md:px-6 py-4 text-center text-nowrap">
                                    {ticket?.agentName}
                                </td>
                                <td className="px-3 md:px-6 py-4">
                                    {ticket?.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : "-"}
                                </td>
                                <td className="px-3 md:px-6 py-4 space-x-1">
                                    <Link to={`/tickets/${ticket?.id}`} className="text-sky-800 hover:text-sky-500">View</Link>
                                    {
                                        ticket?.status !== "CLOSED" &&
                                        <>
                                            <span className="text-neutral-300">|</span>
                                            <Link 
                                                to={`/tickets/${ticket?.id}/edit`} 
                                                className="text-sky-800 hover:text-sky-500"
                                            >
                                                Update
                                            </Link>
                                        </>
                                    }
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Tickets;