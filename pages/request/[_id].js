import { getSession, useSession } from 'next-auth/react';
import Router from 'next/router'
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';

const ProvideEmail = ({ setIsEmail, _id }) => {
    const [data, setData] = useState({ ipuEmail: '', ipuPassword: '' })
    const [isSending, setIsSending] = useState(false)

    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const updateStudent = async (e) => {
        if (!data.ipuEmail || !data.ipuPassword) {
            return toast.error('All Fields are required')
        }
        e.preventDefault();
        setIsSending(true)
        const res = await fetch('/api/student/', {
            method: 'PATCH',
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify({ ...data, _id: _id, owner: true })
        })
        const response = await res.json()
        if (res.status == 200) {
            toast.success(response.msg);
            setIsEmail(false)
        }
        else
            toast.error(response.msg)
        setIsSending(false)
    }

    return (
        <div className='fixed top-0 left-0 w-full h-full min-h-screen bg-gray-50 bg-opacity-20 backdrop-filter backdrop-blur grid place-items-center z-10'>
            <form onSubmit={updateStudent} className='max-w-xl rounded-xl shadow-lg border border-gray-100 p-5 sm:p-10 bg-white'>
                <h1 className='text-purple-600 text-3xl xl:text-4xl font-bold text-center mb-8'>Assign Email</h1>
                <div className="mb-2">
                    <label htmlFor="email" className="inline-block mb-1 text-gray-800 font-medium text-lg">Email<span className="mx-1 text-red-500">*</span></label>
                    <input
                        placeholder="Email"
                        required
                        type="email"
                        name='ipuEmail'
                        value={data.ipuEmail}
                        onChange={handleChange}
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="password" className="inline-block mb-1 text-gray-800 font-medium text-lg">Password<span className="mx-1 text-red-500">*</span></label>
                    <input
                        placeholder="Password"
                        required
                        type="password"
                        name="ipuPassword"
                        value={data.ipuPassword}
                        onChange={handleChange}
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="my-4 flex items-center gap-x-5">
                    <button type="submit" className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                        disabled={isSending}
                        onClick={updateStudent}>{isSending ? 'Wait...' : 'Send Credentials'}</button>

                    <button className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                        onClick={() => setIsEmail(false)}>Cancel</button>
                </div>
            </form>
        </div>

    )
}

const ProvideInternet = ({ setIsInternet, _id }) => {
    const [data, setData] = useState({ internetId: '', internetPassword: '' })
    const [isSending, setIsSending] = useState(false)
    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const updateStudent = async (e) => {
        if (!data.internetId || !data.internetPassword) {
            return toast.error('All Fields are required')
        }
        e.preventDefault();
        setIsSending(true)
        const res = await fetch('/api/student/', {
            method: 'PATCH',
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify({ ...data, _id: _id, owner: true })
        })
        const response = await res.json()
        if (res.status == 200) {
            toast.success(response.msg);
            setIsInternet(false)
        }
        else
            toast.error(response.msg)
        setIsSending(false)
    }

    return (
        <div className='fixed top-0 left-0 w-full h-full min-h-screen bg-gray-50 bg-opacity-20 backdrop-filter backdrop-blur grid place-items-center z-10'>
            <form onSubmit={updateStudent} className='max-w-xl rounded-xl shadow-lg border border-gray-100 p-5 sm:p-10 bg-white'>
                <h1 className='text-purple-600 text-3xl xl:text-4xl font-bold text-center mb-8'>Assign Internet Id</h1>
                <div className="mb-2">
                    <label className="inline-block mb-1 text-gray-800 font-medium text-lg">Id<span className="mx-1 text-red-500">*</span></label>
                    <input
                        placeholder="Email"
                        required
                        type="text"
                        name='internetId'
                        value={data.internetId}
                        onChange={handleChange}
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-2">
                    <label className="inline-block mb-1 text-gray-800 font-medium text-lg">Password<span className="mx-1 text-red-500">*</span></label>
                    <input
                        placeholder="Password"
                        required
                        type="password"
                        name="internetPassword"
                        value={data.internetPassword}
                        onChange={handleChange}
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="my-4 flex items-center gap-x-5">
                    <button type="submit" className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                        disabled={isSending}
                        onClick={updateStudent}>{isSending ? 'Wait...' : 'Send Credentials'}</button>

                    <button className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                        onClick={() => setIsInternet(false)}>Cancel</button>
                </div>
            </form>
        </div>

    )
}


export default function StudentDetails({ student }) {
    const { data: session } = useSession()
    const [isSending, setIsSending] = useState(false)
    const [isVerify, setIsVerify] = useState(false)
    const [isReject, setIsReject] = useState(false)
    const [isClosed, setIsClosed] = useState(false)
    const [isEmail, setIsEmail] = useState(false)
    const [isInternet, setIsInternet] = useState(false)
    const [reason, setReason] = useState('');

    useEffect(() => { if (!session) return Router.push('/user/login') }, [session])


    const updateStudent = async (e) => {
        e?.preventDefault();
        setIsSending(true)
        const res = await fetch('/api/student/verify', {
            method: 'PATCH',
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify({ collection: [student?._id], owner: true, isVerified: true })
        })
        const response = await res.json()
        if (res.status == 200) {
            toast.success(response.msg);
            setIsVerify(false)
            Router.back()
        }
        else
            toast.error(response.msg)
        setIsSending(false)
    }

    const close = async (data) => {
        setIsSending(true)
        const res = await fetch('/api/student/close', {
            method: 'PATCH',
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify(data)
        })

        const response = await res.json()
        if (res.status == 200) {
            toast.success(response.msg);
            setIsVerify(false) || setIsReject(false) || setIsClosed(false)
            Router.back()
        }
        else
            toast.error(response.msg)
        setIsSending(false)
    }

    const rejectStudent = (e) => {
        e?.preventDefault();
        const data = { _id: student?._id, owner: true, rejected: true, rejectedReason: reason || 'Not Mentioned' }
        close(data);
    }
    const closeStudent = (e) => {
        e?.preventDefault();
        const data = { _id: student?._id, owner: true, closed: true, closedReason: reason || 'Not Mentioned' }
        close(data);
    }

    return (
        <>
            <div><Toaster toastOptions={{ duration: 3000, className: 'text-center sm:min-w-max max-w-xl break-words' }} position="top-center" reverseOrder={true} /></div>

            <div className='text-gray-800 font-semibold text-base sm:text-lg max-w-3xl mx-auto p-5 sm:px-10 border rounded-lg shadow mt-5 mb-10'>
                <div className='flex items-center gap-6 px-4 py-2'>
                    <img className='w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 rounded-full border-8 border-purple-50 shadow-md shadow-purple-100 object-cover' src={student?.profileImage} alt="" />
                    <div className='md:text-xl'>
                        <h1>Name: <span className='info__text'>{student?.firstName}&nbsp;{student?.lastName}</span></h1>
                        <h1>Enrollment no: <span className='info__text'>{student?.enrollNo}</span></h1>
                        {student?.isVerified ?
                            <h1 className='flex items-center gap-x-2'>
                                Verified
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </h1>
                            :
                            <h1 className='flex items-center gap-x-2'>
                                Not Verified
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
                                </svg>
                            </h1>
                        }
                    </div>
                </div>
                <div className='space-y-2 py-4'>
                    <div className='flex flex-wrap gap-x-5 gap-y-2'>
                        <h1>Admission Year: <span className='info__text'>{student?.admissionYear}</span></h1>
                        <h1>School: <span className='info__text'>{student?.school}</span></h1>
                        <h1>Programme: <span className='info__text'>{student?.programme}</span></h1>
                        <h1>Course: <span className='info__text'>{student?.course}</span></h1>
                        <h1>Gender: <span className='info__text capitalize'>{student?.gender}</span></h1>
                        <h1>Email: <span className='info__text'>{student?.email}</span></h1>
                        {student?.alternateEmail && <h1>Alternate Email: <span className='info__text'>{student?.alternateEmail}</span></h1>}
                        <h1>Mobile no: <span className='info__text'>{student?.mobileNo}</span></h1>
                        {student?.alternateMobileNo && <h1>Alternate Mobile no: <span className='info__text'>{student?.alternateMobileNo}</span></h1>}
                    </div>
                    <h1>Requested For: <span className='info__text capitalize'>{student?.requestEmail && 'Email'} {student?.requestEmail && student?.requestInternet && 'and'} {student?.requestInternet && 'Internet'}</span></h1>
                    {student?.requestEmail && <h1>Reason for Email: <span className='info__text'>{student?.emailReason} </span></h1>}
                    {student?.internetReason && < h1 > Reason for Internet: <span className='info__text'>{student?.internetReason} </span></h1>}
                    <h1>Address Proof: <a className='ml-1 text-purple-600 hover:text-purple-800' href={student?.addressProof} target="_blank">View/Download</a></h1>

                    <h1>Id Card: </h1>
                    <a href={student?.idImage} target="_blank" className='cursor-pointer'><img className='object-contain rounded-xl my-3 max-h-96 bg-yellow-100 max-w-max inline-block' src={student?.idImage} alt="" /></a>
                    <div>
                    </div>
                </div>

                <div className='flex items-center justify-center gap-5 my-5'>

                    {student?.requestEmail && student?.isVerified && <button className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer" onClick={() => setIsEmail(true)}> Assign Email Id</button>}
                    {student?.requestInternet && student?.isVerified && <button className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer" onClick={() => setIsInternet(true)}> Assign Internet Id</button>}
                    {!student?.isVerified && <button className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer" onClick={() => setIsVerify(true)} >Accept</button>}
                    {!student?.isVerified && <button className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer" onClick={() => setIsReject(true)} >Reject</button>}
                    {student?.isVerified && <button className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer" onClick={() => setIsClosed(true)} >Close Application</button>}
                    <button className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer" onClick={() => Router.back()}>Back</button>
                </div>
            </div>
            {isEmail && <ProvideEmail setIsEmail={setIsEmail} _id={student?._id} />}
            {isInternet && <ProvideInternet setIsInternet={setIsInternet} _id={student?._id} />}
            {
                isVerify && <div className='fixed top-0 left-0 w-full h-full min-h-screen bg-gray-50 bg-opacity-20 backdrop-filter backdrop-blur grid place-items-center z-10'>
                    <div className='max-w-xl rounded-xl shadow-lg border border-gray-100 p-5 sm:p-10 bg-white flex flex-col justify-center items-center'>
                        <h1 className='text-purple-800 text-2xl xl:text-3xl font-medium text-center mb-8'>Please confirm to Verify Student</h1>
                        <div className='flex items-center justify-around gap-x-5'>
                            <button className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                                onClick={() => updateStudent()} disabled={isSending}>{isSending ? 'Wait...' : 'Set Verified'}</button>
                            <button className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                                onClick={() => setIsVerify(false)} disabled={isSending}>Cancel</button>
                        </div>
                    </div>
                </div>
            }
            {
                isReject && <div className='fixed top-0 left-0 w-full h-full min-h-screen bg-gray-50 bg-opacity-20 backdrop-filter backdrop-blur grid place-items-center z-10'>
                    <div className='max-w-xl rounded-xl shadow-lg border border-gray-100 p-5 sm:p-10 bg-white flex flex-col justify-center items-center'>
                        <h1 className='text-purple-800 text-2xl xl:text-3xl font-medium text-center'>Confirm to Reject this Student application</h1>
                        <textarea className='resize-none h-20 border w-full my-8 p-2' placeholder='Mention reason of closing this student application' onChange={(e) => setReason(e.target.value)}></textarea>
                        <div className='flex items-center justify-around gap-x-5'>
                            <button className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                                onClick={() => rejectStudent()} disabled={isSending}>{isSending ? 'Wait...' : 'Set Rejected'}</button>
                            <button className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                                onClick={() => setIsReject(false)} disabled={isSending}>Cancel</button>
                        </div>
                    </div>
                </div>
            }
            {
                isClosed && <div className='fixed top-0 left-0 w-full h-full min-h-screen bg-gray-50 bg-opacity-20 backdrop-filter backdrop-blur grid place-items-center z-10'>
                    <div className='max-w-xl rounded-xl shadow-lg border border-gray-100 p-5 sm:p-10 bg-white flex flex-col justify-center items-center'>
                        <h1 className='text-purple-800 text-2xl xl:text-3xl font-medium text-center'>Confirm to Close this Student application</h1>
                        <textarea className='resize-none h-20 border w-full my-8 p-2' placeholder='Mention reason of closing this student application' onChange={(e) => setReason(e.target.value)}></textarea>
                        <div className='flex items-center justify-around gap-x-5'>
                            <button className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                                onClick={() => closeStudent()} disabled={isSending}>{isSending ? 'Wait...' : 'Close Application'}</button>
                            <button className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                                onClick={() => setIsClosed(false)} disabled={isSending}>Cancel</button>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) return {
        redirect: {
            destination: '/user/login', permanent: false
        }
    };
    const { _id } = context.params;
    const { data } = await fetch(`${process.env.HOST}/api/student/?_id=${_id}`).then((res) => res.json())
    return {
        props: {
            session,
            student: data
        }
    }
}