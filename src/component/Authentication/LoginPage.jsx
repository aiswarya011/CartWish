import React, { useState } from 'react'
import './LoginPage.css'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import apiClient from '../../utils/api-client'

// form validation using schema
const schema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }).min(3),
    password: z.string().min(3, { message: "Please enter a valid password" }),
});

const LoginPage = () => {
    const [error, setError] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [token, setToken] = useState('')

    const
        {
            register,
            handleSubmit,
            formState: { errors, isValid }
        } = useForm({
            resolver: zodResolver(schema),
            mode: "onChange", //immediate validation
            defaultValues: { email: "", password: "" }, // ensures fields aren't undefined
        });


    const onSubmit = (formData) => {
        const body = new FormData();
        body.append("email", formData.email)
        body.append("password", formData.password)

        apiClient.post('/user/login', body,
            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => {
                setToken(res.data.token) 
                sessionStorage.setItem("token", res.data.token) // store JWT token in session storage
                window.location = '/'
            })
            .catch(error => setError(error.message))

    }

    return (
        <section className='align_center form_page'>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <h2>Login</h2>

                <div className='inputs'>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id='email'
                            className='input_text'
                            placeholder='Enter email'
                            {...register("email")}
           
                        />
                        {
                            errors.email &&
                            <em className='error'>
                                {errors.email.message}
                            </em>
                        }
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id='password'
                            className='input_text'
                            placeholder='Enter password'
                            {...register("password")} />

                        {
                            errors.password &&
                            <em className='error'>
                                {errors.password.message}
                            </em>
                        }

                    </div>

                    {
                        error &&
                        <em className='error'>Incorrect Credentials..Please try again.</em>
                    }

                    <button type='submit' disabled={!isValid} className='submit'>Log In</button>
                </div>
            </form>

        </section >
    )
}

export default LoginPage
