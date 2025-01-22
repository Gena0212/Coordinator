import { useState } from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import './RegisterPage.scss'
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    return (
        <>
            <Header isLoggedIn={false}/>
            <section className="register">
                <h1 className="register__title">Register</h1>
                <RegisterForm/>
                <Link className="register__link" to={'/login'}>
                    <p className="register__text">Already have an account? Click here to log in!</p>
                </Link>
            </section>
        </>
        
    )
}