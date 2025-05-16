import React, { useState } from 'react'
import '../components/style.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    axios.post('http://locathost:4200/users/signup', {
      email: email,

    })
      .then(res => {
        setLoading(false);
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('fullName',res.data.fullName)
        localStorage.setItem('imageUrl',res.data.imageUrl)
        localStorage.setItem('imageId',res.data.imageId)
        localStorage.setItem('email',res.data.email)
        navigate('/dashboard')
        console.log(res.data)
      })
      .catch(err => {
        setLoading(false);
        toast.error('something is wrong...')
        console.log(err)
      })
  }


  return (
    <div className='signup-wrapper'>
      <div className='signup-box'>
        <div className='signup-left'>
          <img alt='logo' src={require('../assets/logo.png')} />
          <h2 className='signup-left-heading'>HariOm Online Classes</h2>
          <p className='signup-left-para'>Learn Coading in easy way...</p>
        </div>

        <div className='signup-right'>
          <hr />
          <form onSubmit={submitHandler} className='form'>
            <h1>Login with Your Account</h1>
            <input required onChange={e => { setEmail(e.target.value) }} type='email' placeholder='Email' />
            <input required onChange={e => { setPassword(e.target.value) }} type='password' placeholder='Password' />
            <button type='submit'>{isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}Submit</button>
            <Link className='link' to='/signup'>Login with Your Account</Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
