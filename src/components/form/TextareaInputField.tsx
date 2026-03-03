import { useField } from "formik";

type InputFieldProps = {
    name: string;
    label: string;
    rows?: number;
    placeholder?: string
}

const TextareaInputField = ({ label, rows = 3, ...props }: InputFieldProps): React.JSX.Element => {
    const [field] = useField(props.name);

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={props.name}>
                {label}
            </label>

            <textarea
                id={props.name}
                rows={rows}
                {...props}
                {...field}
                className="px-4 py-2.5 rounded-lg border text-sm outline-none"
            />
        </div>
    )
}

export default TextareaInputField;