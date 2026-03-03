import { Form, Formik } from "formik";
import Button from "./Button";
import { validateComment } from "../utils/validateTicket";
import TextareaInputField from "./form/TextareaInputField";
import FieldError from "./form/FieldError";

const initialValues = {
    body: ""
}

interface AddCommentProps {
    handleAddComment: (values: {body:string}) => Promise<void>
}

const AddComment = (addCommentProps: AddCommentProps) : React.JSX.Element => {

    return (
        <div className="border-t border-neutral-200 pt-4 space-y-4">
            <h1 className="font-semibold">Add Comment</h1>

            <Formik
                initialValues={initialValues}
                validate={validateComment}
                onSubmit={addCommentProps.handleAddComment}
            >
                {() => (
                    <Form className="flex flex-col gap-4">
                        <div>
                            <TextareaInputField
                                label=""
                                name="body"
                            />
                            <FieldError name="body"/>
                        </div>

                        <div className="mt-2">  
                            <Button
                                label="Add Comment"
                                type="submit"
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddComment;