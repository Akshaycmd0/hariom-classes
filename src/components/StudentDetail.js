import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'

const StudentDetail = () => {
    const [student, setStudent] = useState({});
    const [paymentList, setPaymentList] = useState([]);
    const [course, setCourse] = useState({});

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getStudentsDetail();
    }, [])

    const getStudentsDetail = () => {
        axios.get('http://localhost:4200/student/student-detail/' + params.id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(res.data)
                setStudent(res.data.StudentDetail);
                setPaymentList(res.data.feeDetail);
                setCourse(res.data.courseDetail);
            })
            .catch(err => {
                console.log(err);
                toast.error('sommething is wrong...')
            })
    }

    const deleteStudent = (studentId) => {
        if (window.confirm('Are you sure u want to delete ?')) {
            axios.delete('http://localhost:4200/student/'+studentId, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(res => {
                    console.log(res.data)
                    navigate('/dashboard/course-detail/' + course._id);
                    toast.success('Student Deleted Successfully')
                })
                .catch(err => {
                    console.log(err);
                    toast.error('sommething is wrong...')
                })
        }
    }
    return (
        <div className='student-detail-main-wrapper'>
            <div className='student-detail-wrapper'>
                <div className='student-detail-header'>
                    <h2>Student Full Detail</h2>
                    <div className='sd-btn-container'>
                        <button className='primary-btn' onClick={() => { navigate('/dashboard/update-student' + student._id, { state: { student } }) }}>Edit</button>
                        <button className='secondary-btn' onClick={()=>{deleteStudent(student._id)}}>Delete</button>
                    </div>
                </div>
                <div className='sd-detail'>
                    <img alt='student pic' src={student.imageUrl} />
                    <div>
                        <h2>{student.fullName}</h2>
                        <p>phone :- {student.phone}</p>
                        <p>email :- {student.email}</p>
                        <p>address :- {student.address}</p>
                        <h4>Course Name :- {course.courseName}</h4>
                    </div>
                </div>
                <div>

                </div>
            </div>
            <br />
            <h2 className='payment-history-title'>Payment History</h2>
            <div className='fee-detail-wrapper'>
                <table>
                    <thead>
                        <th>Date and Time</th>
                        <th>Amount</th>
                        <th>Remark</th>
                    </thead>
                    <tbody>
                        {
                            paymentList.map((payment) => (
                                <tr key={payment._id}>
                                    <td>{payment.createAt}</td>
                                    <td>{payment.amount}</td>
                                    <td>{payment.remark}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StudentDetail
