import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import CreateTicket from "../pages/CreateTicket";
import Tickets from "../pages/Tickets";
import Layout from "../components/Layout";
import UpdateTicket from "../pages/UpdateTicket";
import AssignTicket from "../pages/AssignTicket";
import Ticket from "../pages/Ticket";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }>
                    <Route path="/" element={<Home />} />
                    <Route path="/tickets" element={<Tickets />} />
                    <Route path="/tickets/create" element={<CreateTicket />} />
                    <Route path="/tickets/:id" element={<Ticket />} />
                    <Route path="/tickets/:id/edit" element={<UpdateTicket />} />
                    <Route path="/tickets/:id/assign" element={<AssignTicket />} />
                </Route>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes