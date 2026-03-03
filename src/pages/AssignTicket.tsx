import { Form, Formik } from "formik";
import Button from "../components/form/Button";
import { useEffect, useState } from "react";
import type { SupportAgentType, User } from "../types/user";
import { getAllSupportAgents } from "../api/user.api";
import SelectField from "../components/form/SelectField";
import { assignTicket } from "../api/ticket.api";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useUser from "../hooks/useUser";
import axios from "axios";
import FieldError from "../components/form/FieldError";
import type { SelectOptions } from "../types/form";

type AssignTicketType = {
    assignedToUserId: string;
}

const initialValues: AssignTicketType = {
    assignedToUserId: "",
}

const AssignTicket = () => {
    const { id } = useParams();
    const { user } = useUser();
    const navigate = useNavigate();
    const [supportAgents, setSupportAgents] = useState<SupportAgentType[]>([]);

    useEffect(() => {
        const fetchAllSupportAgents = async () => {
            const data = await getAllSupportAgents();
            const agents = data.data
            .filter((agent: User) => agent.id !== user?.id)
            .map((agent: User) => ({
                id: agent.id,
                name: agent.name,
            }));
            setSupportAgents(agents);
        };

        fetchAllSupportAgents();
    }, [user?.id]);

    const supportAgentOptions: SelectOptions[] = supportAgents.map(agent => ({
        value: agent.id,
        label: agent.name,
    }));

    const handleSubmit = async (values: AssignTicketType) => {
        try {
            const data = await assignTicket(id, user?.id, values?.assignedToUserId);
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
                <h1 className="text-xl sm:text-2xl text-center font-extrabold">Assign Ticket</h1>

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="flex flex-col gap-4">
                            <div>
                                <SelectField
                                    label="Select Support Agent"
                                    name="assignedToUserId"
                                    options={supportAgentOptions}
                                />
                                <FieldError name="assignedToUserId"/>
                            </div>

                            <div className="mt-2">
                                <Button
                                    label="Assign Ticket"
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

export default AssignTicket;