import { useState } from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import './RegisterPage.scss'

export default function RegisterPage() {
    return (
        <section className="register">
            <h2>Register</h2>
            <RegisterForm/>
        </section>
        
    )
}