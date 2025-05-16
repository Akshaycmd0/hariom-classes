import React, { useState } from 'react'
import '../components/style.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('phone', Phone);
        formData.append('password', password);
        formData.append('image', image)

        axios.post('http://locathost:4200/users/signup', formData)
            .then(res => {
                setLoading(false);
                toast.success('Tour Account is Created...')
                navigate('/login')
                console.log(res)
            })
            .catch(err => {
                setLoading(false);
                toast.error('something is wrong...')
                console.log(err)
            })
    }

    const fileHandler = (e) => {
        setImage(e.target.files[0])
        setImageUrl(URL.createObjectURL(e.target.files[0]))
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
                        <h1>Create Your Account</h1>
                        <input required onChange={e => { setFullName(e.target.value) }} type='text' placeholder='Institute Full Name' />
                        <input required onChange={e => { setEmail(e.target.value) }} type='email' placeholder='Email' />
                        <input required onChange={e => { setPhone(e.target.value) }} type='text' placeholder='Phone' />
                        <input required onChange={e => { setPassword(e.target.value) }} type='password' placeholder='Password' />
                        <input required onChange={fileHandler} type='file' />
                        {imageUrl && <img className='your-logo' alt='your logo' src={imageUrl} />}
                        <button type='submit'>{isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}Submit</button>
                        <Link className='link' to='/login'>Create Your Account</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
