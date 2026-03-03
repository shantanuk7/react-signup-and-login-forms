import { ErrorMessage } from "formik";

interface FieldErrorProps {
    name: string
}

const FieldError: React.FC<FieldErrorProps> = ({name}) => {
    return (
        <ErrorMessage
            name={name}
            component="div"
            className="text-xs text-red-500 mt-0.5"
        />
    )
}

export default FieldError;