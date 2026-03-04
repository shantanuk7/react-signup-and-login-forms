import { Link } from "react-router-dom"

const NotFound = () : React.JSX.Element => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold">404 - Page Not Found</h1>
        <Link
            to="/"
            className="py-2.5 px-4 bg-sky-700 hover:bg-sky-800 text-white font-semibold rounded-lg transition-colors duration-200"
        >
            Go Back
        </Link>
    </div>
  )
}

export default NotFound