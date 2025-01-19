import { useState } from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import './RegisterPage.scss'
import Header from "../../components/Header/Header";

export default function RegisterPage() {
    return (
        <>
            <Header isLoggedIn={false}/>
            <section className="register">
                <h2>Register</h2>
                <RegisterForm/>
            </section>
        </>
        
    )
}