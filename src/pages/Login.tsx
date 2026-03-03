import { Form, Formik } from "formik";
import TextInputField from "../components/form/TextInputField";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/form/Button";
import type { LoginPropsType } from "../types/login";
import { validateLogin } from "../utils/validateFields";
import axios from "axios";
import { setAuthToken } from "../utils/authToken";
import { userLogin } from "../api/auth.api";
import toast from "react-hot-toast";
import useUser from "../hooks/useUser";
import FieldError from "../components/form/FieldError";

const initialValues: LoginPropsType = {
    email: "",
    password: "",
}

const Login = () => {
    const { fetchCurrentUser } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (values: LoginPropsType) => {
        try {
            const data = await userLogin(values);
            if (data.success) {
                toast.success(data.message);
                setAuthToken(data.data.token);
                await fetchCurrentUser();
                navigate("/");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Something went wrong. Try again");
            }
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
            <div className="w-full p-8 max-w-md bg-white rounded-2xl border border-neutral-200 space-y-6">
                <h1 className="text-xl sm:text-2xl text-center font-extrabold">Welcome Back</h1>

                <Formik
                    initialValues={initialValues}
                    validate={validateLogin}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="flex flex-col gap-4">
                            <TextInputField
                                label="Email"
                                name="email"
                                type="email"
                            />
                            <FieldError name="email"/>

                            <TextInputField
                                label="Password"
                                name="password"
                                type="password"
                            />
                            <FieldError name="password"/>

                            <div className="mt-2">
                                <Button
                                    label="Login"
                                    type="submit"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>

                <p className="text-sm sm:text-base text-center text-neutral-500">
                    Don't have an account?&nbsp;
                    <Link to="/signup" className="text-sky-800 font-semibold hover:underline">
                        Signup
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default Login;