import { Form, Formik } from "formik";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import type { SignupValuesProps } from "../types/signup";
import { validateSignup } from "../utils/validateFields";
import axios from "axios";

const initialValues: SignupValuesProps = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const Signup = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values: SignupValuesProps) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_AUTH_URI}/register`, values);
            if (response.data.success) {
                alert(response.data.message);
                navigate("/login");
            }
            console.log(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data?.message || "Something went wrong. Try again");
            }
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
            <div className="w-full p-8 max-w-md bg-white rounded-2xl border border-neutral-200">

                <div className="mb-6">
                    <h1 className="text-xl sm:text-2xl text-center font-extrabold">Create an account</h1>
                </div>

                <Formik
                    initialValues={initialValues}
                    validate={validateSignup}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="flex flex-col gap-4">
                            <InputField
                                label="Full Name"
                                name="name"
                                type="text"
                            />
                            <InputField
                                label="Email"
                                name="email"
                                type="email"
                            />
                            <InputField
                                label="Password"
                                name="password"
                                type="password"
                            />
                            <InputField
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                            />

                            <div className="mt-2">
                                <Button
                                    label="Sign Up"
                                    type="submit"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>

                <p className="text-sm sm:text-base text-center text-neutral-500 mt-6">
                    Already have an account?&nbsp;
                    <Link to="/login" className="text-sky-800 font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default Signup;