import { Form, Formik } from "formik";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import { loginSchema } from "../utils/validationsSchema";
import type { LoginValuesProps } from "../types/login";
import { validateLogin } from "../utils/validateFields";

const initialValues: LoginValuesProps = {
    email: "",
    password: "",
}

const Login = () => {
    const [loginData, setLoginData] = useState<LoginValuesProps | null>(null);
    const handleSubmit = (values: LoginValuesProps) => {
        setLoginData(values);
        console.log(values);
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
            <div className="w-full p-8 max-w-md bg-white rounded-2xl border border-neutral-200">

                <div className="mb-6">
                    <h1 className="text-xl sm:text-2xl text-center font-extrabold">Welcome Back</h1>
                </div>

                <Formik
                    initialValues={initialValues}
                    validate={validateLogin}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="flex flex-col gap-4">
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

                            <div className="mt-2">
                                <Button
                                    label="Login"
                                    type="submit"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>

                <p className="text-sm sm:text-base text-center text-neutral-500 mt-6">
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