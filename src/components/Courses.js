import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

const Courses = () => {
  const [courseList, setCourseList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCourses();
  }, [])

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
  return (
    <div className='course-wrapper'>
      {
        courseList.map((course) => (
          <div onClick={()=>{navigate('/dashboard/course-detail/'+course._id)}} className='course-box' key={course._id}>
            <img alt='thumbnill' className='course-thumbnill' src={course.imageUrl}/>
            <h2 className='course-title'>{course.courseName}</h2>
            <p className='course-price'>Rs. {course.price} only</p>
          </div>

        ))
      }
    </div>
  )
}

export default Courses
