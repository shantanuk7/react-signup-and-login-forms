import { useField } from "formik";

type TextInputFieldProps = {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
}

const TextInputField = ({ label, type = "text", ...props }: TextInputFieldProps): React.JSX.Element => {
    const [field] = useField(props.name);

    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor={props.name}
                className="text-sm font-medium text-neutral-700"
            >
                {label}
            </label>

            <input
                id={props.name}
                type={type}
                {...props}
                {...field}
                className="px-4 py-2.5 rounded-lg border text-sm outline-none transition-all duration-200"
            />
        </div>
    )
}

export default TextInputField;