import { Form, Formik } from "formik";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import type { SupportAgentType, User } from "../types/user";
import { getAllSupportAgents } from "../api/user.api";
import SelectField from "../components/SelectField";

type AssignTicketType = {
    assignedToUserId: string;
}

const initialValues: AssignTicketType = {
    assignedToUserId: "",
}

const AssignTicket = () => {
    const [supportAgents, setSupportAgents] = useState<SupportAgentType[]>([]);

    useEffect(() => {
        const fetchAllSupportAgents = async () => {
            const data = await getAllSupportAgents();
            const agents = data.data.map((agent: User) => ({
                id: agent.id,
                name: agent.name,
            }));
            setSupportAgents(agents);
        };

        fetchAllSupportAgents();
    }, []);

    const handleSubmit = () => {

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
                            <SelectField
                                label="Select Support Agent"
                                name="assignedToUserId"
                                options={supportAgents}
                            />

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