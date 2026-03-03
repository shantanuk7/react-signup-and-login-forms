type ButtonProps = {
    type: "submit" | "reset" | "button";
    label: string;
}

const Button = ({ type, label }: ButtonProps): React.JSX.Element => {
    return (
        <button
            type={type}
            className="w-full py-2.5 px-4 bg-sky-700 hover:bg-sky-800 text-white font-semibold rounded-lg transition-colors duration-200 cursor-pointer"
        >
            {label}
        </button>
    )
}

export default Button;