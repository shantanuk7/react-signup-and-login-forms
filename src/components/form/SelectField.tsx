import { useField } from "formik";
import type { SelectOptions } from "../../types/form";

type SelectFieldProps = {
    name: string;
    label: string;
    options: SelectOptions[];
}

const SelectField = ({ label, options, ...props } : SelectFieldProps) : React.JSX.Element => {
    const [field] = useField(props);

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={props.name} className="text-sm font-medium text-neutral-700">
                {label}
            </label>

            <select
                id={props.name}
                {...props}
                {...field}
                className="p-2.5 rounded-lg border text-sm outline-none transition-all duration-200"
            >
                <option value="">Select {label}</option>
                {options.map(option =>
                        <option key={option.value} value={option.value}>{option.label}</option>
                )}
            </select>
        </div>
    )
}

export default SelectField;