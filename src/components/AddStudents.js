import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddStudents = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setemail] = useState('');
  const [address, setaddress] = useState('');
  const [image, setImage] = useState(null);

  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setLoading] = useState('');

  const [courseList, setCourseList] = useState([]);
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    getCourses();
    if (location.state) {
      setFullName(location.state.student.fullName);
      setPhone(location.state.student.phone);
      setemail(location.state.student.email);
      setaddress(location.state.student.address);
      setCourseId(location.state.student.courseId);
      setImageUrl(location.state.student.imageUrl);
    }
    else {
      setFullName('');
      setPhone('');
      setemail('');
      setaddress('');
      setCourseId('');
      setImageUrl('');
    }
  }, [location])

  const getCourses = () => {
    axios.get('http://localhost:4200/course/all-courses', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        console.log(res.data.Courses);
        setCourseList(res.data.Courses);
      })
      .catch(err => {
        console.log(err);
        toast.error('sommething is wrong...')
      })
  }

  const submitHadnler = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('courseId', courseId);

    if (image) {
      formData.append('image', image);
    }

    if (location.state) {
      axios.put('http://localhost:4200/student/' + location.state.student._id, formData, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(res => {
          setLoading(false);
          console.log(res.data);
          toast.success('student detail updated..')
          navigate('/dashboard/student-detail/' + location.state.student._id)
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
          toast.error('sommething is wrong...')
        })
    }
    else {
      axios.post('http://localhost:4200/student/add-student', formData, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(res => {
          setLoading(false);
          console.log(res.data);
          toast.success('new student added..')
          navigate('/dashboard/course-detail/' + courseId)
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
        <h1>{location.state ? 'Edit Student Dettail' : 'Add New Student'}</h1>
        <input value={fullName} onChange={(e) => { setFullName(e.target.value) }} placeholder='Student Name' />
        <input value={phone} onChange={(e) => { setPhone(e.target.value) }} placeholder='Phone Number' />
        <input value={email} onChange={(e) => { setemail(e.target.value) }} placeholder='Email' />
        <input value={address} onChange={(e) => { setaddress(e.target.value) }} placeholder='Full Address' />
        <select disabled={location.state} value={courseId} onChange={(e) => { setCourseId(e.target.value) }}>
          <option>Select Course</option>
          {
            courseList.map((course) => (
              <option key={course._id} value={course._id}>{course.courseName}</option>
            ))
          }
        </select>
        <inpt required={!location.state} onChange={fileHandler} type='file' />
        {imageUrl && <img className='your-logo' alt='student-pic' src={imageUrl} />}
        <button type='submit' className='submit-button'>{isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}Submit</button>
      </form>
    </div>
  )
}

export default AddStudents
