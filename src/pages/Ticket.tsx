import { useEffect, useState } from "react";
import type { TicketType } from "../types/ticket";
import { addComment, getCommentsByTicketId, getTicketById } from "../api/ticket.api";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import AddComment from "../components/AddComment";
import useIsAllowed from "../hooks/useIsAllowed";
import toast from "react-hot-toast";
import axios from "axios";
import type { CommentType } from "../types/comment";
import TicketCard from "../components/TicketCard";

const Ticket = (): React.JSX.Element => {

    const { id } = useParams();
    const [ticket, setTicket] = useState<TicketType | null>(null);
    const [comments, setComments] = useState<(CommentType)[]>();
    const isAllowed = useIsAllowed();

    useEffect(() => {
        const fetchTicket = async (): Promise<void> => {
            const data = await getTicketById(id);
            setTicket(data.data);
        };

        const fetchComments = async (): Promise<void> => {
            const data = await getCommentsByTicketId(id);
            setComments(data.data);
        };

        fetchTicket();
        fetchComments();
    }, [id]);

    const handleAddComment = async (values: { body: string }): Promise<void> => {
        try {
            const data = await addComment(id, values.body);
            if (data.success) {
                toast.success(data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            }
        }
    }

    return (
        <div className="w-full flex justify-center px-4 py-10 md:p-20">
            <div className="w-full border border-neutral-200 p-6 rounded-2xl space-y-2">
                <TicketCard ticket={ticket} isAllowed={isAllowed}/>
                <AddComment handleAddComment={handleAddComment} />
                {comments &&<Comments comments={comments} />}
            </div>
        </div>
    )
}

export default Ticket
