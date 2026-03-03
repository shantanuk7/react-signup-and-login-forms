import { Toaster } from "react-hot-toast";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";

const App = (): React.JSX.Element => {
  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  )
}

export default App;
