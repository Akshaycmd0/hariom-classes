import React from 'react';
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Courses from './components/Courses';
import Home from './components/Home';
import AddCourses from './components/AddCourses';
import AddStudents from './components/AddStudents';
import Students from './components/Students';
import CollectFee from './components/CollectFee';
import PaymentHistory from './components/PaymentHistory';
import CourseDetail from './components/CourseDetail';
import StudentDetail from './components/StudentDetail';

const App = () => {
  const myRouter = createBrowserRouter([
    { path: '', Component: Login },
    { path: 'login', Component: Login },
    { path: 'signup', Component: Signup },
    {
      path: 'dashboard', Component: Dashboard, children: [
        { path: '', Component: Home },
        { path: 'home', Component: Home },
        { path: 'courses', Component: Courses },
        { path: 'add-courses', Component: AddCourses },
        { path: 'add-students', Component: AddStudents },
        { path: 'Students', Component: Students },
        { path: 'collect-fee', Component: CollectFee },
        { path: 'payment-history', Component: PaymentHistory },
        { path: 'course-detail/:id', Component: CourseDetail },
        { path: 'update-course/:id', Component: AddCourses },
        { path: 'update-student/:id', Component: AddStudents },
        { path: 'student-detail/:id', Component: StudentDetail },
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={myRouter} />
      <ToastContainer />
    </>
  )
}

export default App
