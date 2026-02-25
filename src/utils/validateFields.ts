import type { LoginValuesProps } from "../types/login";
import type { SignupValuesProps } from "../types/signup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateSignup = (values: SignupValuesProps) => {
    const errors: Partial<SignupValuesProps> = {};

    if (!values.name) {
        errors.name = "Name is required";
    }

    if (!values.email) {
        errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
        errors.email = "Enter a valid email address"
    }

    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = "Please confirm your password";
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
}

export const validateLogin = (values: LoginValuesProps) => {
    const errors: Partial<LoginValuesProps> = {};

    if (!values.email) {
        errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
        errors.email = "Enter a valid email address"
    }

    if (!values.password) {
        errors.password = "Password is required";
    }

    return errors;
}