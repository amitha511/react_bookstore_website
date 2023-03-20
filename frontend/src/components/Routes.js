import React from "react";
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen'
import ProductScreen from '../screens/ProductScreen';
import AdminScreen from "../screens/AdminScreen";
import CartScreen from "../screens/CartScreen";
import CatalogScreen from "../screens/catalogScreen";
import { Route, Routes } from 'react-router-dom';
import Container from "react-bootstrap/esm/Container";
import RegisterScreen from '../screens/RegisterScreen'
import AdminDataScreen from "../screens/AdminDataScreen";
import AdminUsersScreen from "../screens/AdminUsersScreen";
import AboutScreen from "../screens/AboutScreen";

function RoutesComponent() {
    return (
        <Container className="mt-3">
            <Routes>
              <Route path="/product/:name" element={<ProductScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/Admin" element={<AdminScreen/>} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/" element={<HomeScreen />} />
                <Route path="/catalog" element={<CatalogScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
            <Route path="/Admin" element={<AdminScreen />} />
            <Route path="/Admin/dataProduct" element={<AdminDataScreen />} />
                <Route path="/Admin/dataUsers" element={<AdminUsersScreen />} />
            <Route path="/About" element={<AboutScreen />} />


            </Routes>
        </Container>
    );
}

export default RoutesComponent;