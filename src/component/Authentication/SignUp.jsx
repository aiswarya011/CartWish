import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../utils/api-client'


const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(3),
  address: z.string().min(3)
})

const SignUp = () => {
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(schema)
  });

  let navigate = useNavigate();

  // const onSubmit = async (formData) => {
  //   await signUp(formData)
  //     .then(res => {
  //       navigate('/login')
  //     })
  //     .catch(error => {
  //        setError(error.message)
  //     })

  // }
  const onSubmit = (formData) => {
    const body = new FormData();
    body.append("name", formData.name)
    body.append("email", formData.email)
    body.append("password", formData.password)
    body.append("deliveryAddress", formData.address)

    apiClient.post('/user/signup', body)
      .then(res => {
        navigate('/login')
      }).catch(error => {
        setError(error.message)
      })
  }


  return (
    <section className='align_center form_page'>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign Up Form</h2>
        <div className='inputs'>
          {/* 1 */}
          <div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                {...register('name')}
                id='name'
                type='text'
                placeholder='Enter name'
                className='input_text'
              />
              {
                errors.name &&
                <em className='error'>Please enter name</em>
              }

            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                {...register('email')}
                id='email'
                type='email'
                placeholder='Enter email'
                className='input_text'
              />
              {
                errors.email &&
                <em className='error'>Please enter email</em>
              }
            </div>
          </div>
          {/* 2 */}
          <div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                {...register('password')}
                id='password'
                type='password'
                placeholder='Enter password'
                className='input_text'
              />
              {
                errors.password &&
                <em className='error'>Please enter password</em>
              }
            </div>
          </div>
          {/* 3 */}
          <div>
            <label htmlFor="address">Address</label>
            <input
              {...register('address')}
              id='address'
              type='text'
              placeholder='Enter address'
              className='input_text'
            />
            {
              errors.address &&
              <em className='error'>Please enter address</em>
            }
          </div>
        </div>
        <button type='submit' className='submit' disabled={!isValid}>Sign Up</button>
      </form>

      {
        error &&
        <em> {error}</em>
      }
    </section>
  )
}

export default SignUp
