import { useField } from "formik";

type InputFieldProps = {
    name: string;
    label: string;
    type: string;
}

const InputField = ({ label, ...props }: InputFieldProps) => {
    const [field, meta] = useField(props);
    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor={props.name}
                className="text-sm font-semibold text-neutral-700"
            >
                {label}
            </label>

            <input
                id={props.name}
                {...field}
                {...props}
                className="px-4 py-2.5 rounded-lg border text-sm outline-none transition-all duration-200"
            />

            {meta.touched && meta.error ? (
                <div className="text-xs text-red-500 mt-0.5">{meta.error}</div>
            ) : null}
        </div>
    )
}

export default InputField;