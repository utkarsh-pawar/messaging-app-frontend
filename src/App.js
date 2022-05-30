import "./App.css";
import Header from "./components/Header";
import Messages from "./pages/Messages";
import Contacts from "./pages/Contacts";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Loading from "./components/Loading";
import ContactInfo from "./pages/ContactInfo/index.js";
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./constants/ProtectedRoute";
import { Container } from "@chakra-ui/react";
import { useEffect } from "react";
import { isUser } from "./api/auth";

function App() {
  const isLoading = useSelector((state) => state.loading.isLoading);
  console.log(isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    isUser(dispatch);
  }, [dispatch, isLoading]);

  return (
    <BrowserRouter>
      <Container maxW="container.xl">
        <Header />
        {isLoading && <Loading />}

        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/contact/:id" element={<ContactInfo />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/contacts" replace />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
