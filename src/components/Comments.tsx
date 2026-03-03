import type { CommentType } from "../types/comment";

interface CommentsProps {
    comments: CommentType[];
}

const Comments = ({ comments }: CommentsProps) : React.JSX.Element => {

    return (
        <div className="border-t border-neutral-200 pt-4 space-y-4">
            <h1 className="font-semibold">Comments</h1>

            {comments.map((comment) => (    
                <div key={comment.id}>
                    <div className="flex items-center gap-4 text-sm text-neutral-400">
                        <h5>{comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "-"}</h5>
                        <h5>{comment.commenter}</h5>
                    </div>

                    <p className="text-sm sm:text-base">{comment.comment}</p>
                </div>
            ))}

            {comments.length === 0 &&
                <p className="text-neutral-400">No Comments</p>
            }
        </div>
    )
}

export default Comments;