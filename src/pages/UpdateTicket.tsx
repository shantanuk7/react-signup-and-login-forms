import { Form, Formik } from "formik";
import Button from "../components/Button";
import useIsAllowed from "../hooks/useIsAllowed";
import CheckboxField from "../components/CheckboxField";
import type { UpdateTicketType } from "../types/ticket";
import { updateTicket } from "../api/ticket.api";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import SelectField from "../components/SelectField";
import TextareaInputField from "../components/form/TextareaInputField";
import FieldError from "../components/form/FieldError";

const initialValues: UpdateTicketType = {
    description: "",
    status: "",
    priority: "",
}

const UpdateTicket = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isAllowed = useIsAllowed();
    const handleSubmit = async (values: UpdateTicketType) => {
        try {
            const data = await updateTicket(id, values);
            if (data.success) {
                toast.success(data.message);
                navigate("/tickets");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            }
        }
    }

    return (
        <section className="w-full flex items-center justify-center mt-20 p-4">
            <div className="w-full p-8 max-w-md bg-white rounded-2xl border border-neutral-200 space-y-6">
                <h1 className="text-xl sm:text-2xl text-center font-extrabold">Update Ticket</h1>

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="flex flex-col gap-4">
                            {isAllowed("UPDATE_TICKET_DESCRIPTION") && (
                                <div>
                                    <TextareaInputField
                                        label="Description"
                                        name="description"
                                    />
                                    <FieldError name="description"/>
                                </div>
                            )}

                            {isAllowed("CLOSE_TICKET") && (
                                <div>
                                    <CheckboxField
                                        label="Close Ticket"
                                        name="status"
                                        type="checkbox"
                                        value="CLOSED"
                                    />
                                    <FieldError name="status" />
                                </div>
                            )}

                            {isAllowed("UPDATE_TICKET_STATUS") && (
                                <div>
                                    <SelectField
                                        label="Status"
                                        name="status"
                                        options={["IN_PROGRESS", "CLOSED"]}
                                    />
                                    <FieldError name="status"/>
                                </div>
                            )}

                            {isAllowed("UPDATE_TICKET_PRIORITY") && (
                                <div>
                                    <SelectField
                                        label="Priority"
                                        name="priority"
                                        options={["LOW", "MEDIUM", "HIGH"]}
                                    />
                                    <FieldError name="priority"/>
                                </div>
                            )}

                            <div className="mt-2">
                                <Button
                                    label="Update Ticket"
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

export default UpdateTicket;