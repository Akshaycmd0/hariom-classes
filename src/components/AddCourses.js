import axios from 'axios';
import React, { use, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddCourses = () => {
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [startingDate, setStartingDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState(null);

  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setLoading] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // console.log('hi')
    if (location.state) {
      console.log(location.state.course);
      setCourseName(location.state.course.courseName);
      setDescription(location.state.course.description);
      setPrice(location.state.course.price);
      setStartingDate(location.state.course.startingDate);
      setEndDate(location.state.course.endDate);
      setImageUrl(location.state.course.imageUrl);
    }
    else {
      setCourseName('');
      setDescription('');
      setPrice(0);
      setStartingDate('');
      setEndDate('');
      setImageUrl('');
    }
  }, [location])

  const submitHadnler = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('courseName', courseName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('startingDate', startingDate);
    formData.append('endDate', endDate);

    if (image) {
      formData.append('image', image);
    }

    if (location.state) {
      axios.pur('http://localhost:4200/course/' + location.state.course._id, formData, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(res => {
          setLoading(false);
          console.log(res.data);
          toast.success('course updated..')
          navigate('/dashboard/course-detail/' + location.state.course._id)
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
          toast.error('sommething is wrong...')
        })
    }
    else {
      axios.post('http://localhost:4200/course/add-course', formData, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(res => {
          setLoading(false);
          console.log(res.data);
          toast.success('new course added..')
          navigate('/dashboard/courses')
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
          toast.error('sommething is wrong...')
        })
    }
  }

  const fileHandler = (e) => {
    setImage(e.target.files[0])
    setImageUrl(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div>
      <form onSubmit={submitHadnler} claassName='form'>
        <h1>{location.state ? 'Edit Course' : 'Add New Course'}</h1>
        <inpt value={courseName} required onChange={e => { setCourseName(e.target.value) }} placeholder="Course Name" type='text' />
        <text value={description} required onChange={e => { setDescription(e.target.value) }} placeholder="Description" type='text' />
        <inpt value={price} required onChange={e => { setPrice(e.target.value) }} placeholder="Price" type='number' />
        <inpt value={startingDate} required onChange={e => { setStartingDate(e.target.value) }} placeholder="Starting Date (DD_MM_YYYY)" type='text' />
        <inpt value={endDate} required onChange={e => { setEndDate(e.target.value) }} placeholder="End Date (DD_MM_YYYY)" type='text' />
        <inpt required={!location.state} onChange={fileHandler} type='file' />
        {imageUrl && <img className='your-logo' alt='your logo' src={imageUrl} />}
        <button type='submit' className='submit-button'>{isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}Submit</button>
      </form>
    </div>
  )
}

export default AddCourses
