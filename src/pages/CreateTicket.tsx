import { Form, Formik } from "formik";
import type { TicketType } from "../types/ticket";
import { validateTicket } from "../utils/validateTicket";
import axios from "axios";
import { createTicket } from "../api/ticket.api";
import toast from "react-hot-toast";
import TextInputField from "../components/form/TextInputField";
import Button from "../components/form/Button";
import { useNavigate } from "react-router-dom";
import useIsAllowed from "../hooks/useIsAllowed";
import { useEffect } from "react";
import TextareaInputField from "../components/form/TextareaInputField";
import FieldError from "../components/form/FieldError";

const initialValues: TicketType = {
    title: "",
    description: "",
}

const CreateTicket = () : React.JSX.Element => {
    const navigate = useNavigate();
    const isAllowed = useIsAllowed();
    const handleSubmit = async (values: TicketType) => {
        try {
            const data = await createTicket(values)
            if (data.success) {
                toast.success(data.message);
                navigate("/tickets");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Something went wrong. Try again");
            }
        }
    }

    useEffect(() => {
        if (!isAllowed("CREATE_TICKET")) {
            navigate("/");
        }
    }, []);

    return (
        <section className="w-full flex items-center justify-center mt-20 p-4">
            <div className="w-full p-8 max-w-md bg-white rounded-2xl border border-neutral-200 space-y-6">
                <h1 className="text-xl sm:text-2xl text-center font-extrabold">Create Ticket</h1>

                <Formik
                    initialValues={initialValues}
                    validate={validateTicket}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="flex flex-col gap-4">
                            <div>
                                <TextInputField
                                    label="Title"
                                    name="title"
                                    type="text"
                                />
                                <FieldError name="title"/>
                            </div>

                            <div>
                                <TextareaInputField
                                    label="Description"
                                    name="description"
                                />
                                <FieldError name="description"/>
                            </div>

                            <div className="mt-2">
                                <Button
                                    label="Create Ticket"
                                    type="submit"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    )
}

export default CreateTicket;