import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../utils/api-client'
import { toast } from 'react-toastify'


const schema = z.object({
  name: z.string().min(1, { message: "Please enter a valid name" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(3, { message: "Please enter a valid password" }),
  address: z.string().min(3, { message: "Please enter a valid address" })
})

const SignUp = () => {
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange", //immediate validation
    defaultValues: { name: "", email: "", password: "", address: "" }, // ensures fields aren't undefined
  });

  let navigate = useNavigate();


  const onSubmit = (formData) => {
    const body = new FormData();
    body.append("name", formData.name)
    body.append("email", formData.email)
    body.append("password", formData.password)
    body.append("deliveryAddress", formData.address)

    apiClient.post('/user/signup', body)
      .then(res => {
        toast.success("Sign up Successful!")
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
                <em className='error'>{errors.name.message}</em>
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
                <em className='error'>{errors.email.message}</em>
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
                <em className='error'>{errors.password.message}</em>
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
              <em className='error'>{errors.address.message}</em>
            }
          </div>
        </div>


        {
          error &&
          <em className='error'> {error}</em>
        }

        <button type='submit' className='submit' disabled={!isValid}>Sign Up</button>
      </form>

    </section>
  )
}

export default SignUp
