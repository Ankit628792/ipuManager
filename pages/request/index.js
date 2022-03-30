import { getSession, useSession } from "next-auth/react";
import Router from "next/router";
import { CSVLink } from "react-csv";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

let temp = [];

export default function index({ data }) {
    const [collection, setCollection] = useState([])
    const { data: session } = useSession()
    const [students, setStudents] = useState(data);
    const fileName = "student-detail";
    const [studentData, setStudentData] = useState();
    const [isExport, setIsExport] = useState(false);
    const [initialDate, setInitialDate] = useState();
    const [finalDate, setFinalDate] = useState();

    const [loading, setLoading] = useState(false)
    const [isVerify, setIsVerify] = useState(false)
    const [filter, setFilter] = useState({ verified: session?.user?.type !== 'dean' })

    const headers = [
        { label: "Id", key: "_id" },
        { label: "First Name", key: "firstName" },
        { label: "Last Name", key: "lastName" },
        { label: "Gender", key: "gender" },
        { label: "Registered Email", key: "email" },
        { label: "Alternate Email", key: "email" },
        { label: "Registered Mobile no", key: "mobileNo" },
        { label: "Alternate Mobile no", key: "alternateMobileNo" },
        { label: "Enrollment no", key: "enrollNo" },
        { label: "Admission Year", key: "admissionYear" },
        { label: "School", key: "school" },
        { label: "Programme", key: "programme" },
        { label: "Course", key: "course" },
        { label: "Verified", key: "isVerified" },
        { label: "Profile Image", key: "profileImage" },
        { label: "Id Proof", key: "idImage" },
        { label: "Address Proof", key: "addressProof" },
        { label: "Requested for Email Id", key: "requestEmail" },
        { label: "Reason for Email Id", key: "emailReason" },
        { label: "IPU Email Id", key: "ipuEmail" },
        { label: "IPU Email Password", key: "ipuPassword" },
        { label: "Requested for Internet Id", key: "requestInternet" },
        { label: "Reason for Internet Id", key: "internetReason" },
        { label: "IPU Internet Id", key: "internetId" },
        { label: "IPU Internet Password", key: "internetPassword" },
        { label: "Student Rejected", key: "rejected" },
        { label: "Rejected Reason", key: "rejectedReason" },
        { label: "Student Removed", key: "closed" },
        { label: "Removed Reason", key: "closedReason" },
    ];

    useEffect(() => { if (!session) return Router.push('/user/login') }, [session])


    const getStudentData = async () => {
        if (!initialDate) return toast.error('Starting Date is required')
        if (!finalDate) return toast.error('Starting Date is required')
        setLoading(true);
        const res = await fetch('/api/student/export', {
            method: 'POST',
            headers: {
                'Content-Type': ' application/json',
                'Request-Type': 'export'
            },
            body: JSON.stringify({ initialDate: new Date(initialDate).toISOString(), finalDate: new Date(finalDate).toISOString(), owner: true })
        })
        if (res.status === 200) {
            const data = await res.json()
            setStudentData(data);
        }
        else
            toast.error(res.msg)
        setLoading(false);
    };

    useEffect(() => {
        initialDate && finalDate && getStudentData();
    }, [initialDate, finalDate])

    const handleCheckbox = (id) => {
        let temp = [...collection];
        const i = temp?.findIndex(item => item == id)
        if (i >= 0) {
            temp.splice(i, 1);
            setCollection(temp)
        }
        else {
            temp?.push(id)
            setCollection(temp)
        }
    }

    const updateStudent = async (e) => {
        e?.preventDefault();
        setLoading(true)
        const res = await fetch('/api/student/verify', {
            method: 'PATCH',
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify({ collection: collection, _id: session?.user?._id, owner: true, isVerified: true })
        })
        const response = await res.json()
        if (res.status == 200) {
            toast.success(response.msg);
            setIsVerify(false)
            window.location.reload()
        }
        else
            toast.error(response.msg)
        setLoading(false)
    }

    useEffect(() => {
        fetch(`http://localhost:3000/api/student/?verified=${filter.verified}&school=${session?.user?.school}&closed=${filter.verified}`).then((res) => res.json()).then(data => setStudents(data.data))
    }, [filter])

    return (
        <>
            {collection?.length > 0 && <div className="absolute z-50 grid place-items-center bottom-0 left-0 right-0 p-4 backdrop-filter backdrop-blur-md bg-purple-100 bg-opacity-40">
                <button
                    onClick={() => setIsVerify(true)}
                    className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                >Accept Selected</button>
            </div>
            }
            {
                isVerify && <div className='fixed top-0 left-0 w-full h-full min-h-screen bg-gray-50 bg-opacity-20 backdrop-filter backdrop-blur grid place-items-center z-10'>
                    <div className='max-w-xl rounded-xl shadow-lg border border-gray-100 p-5 sm:p-10 bg-white flex flex-col justify-center items-center'>
                        <h1 className='text-purple-800 text-2xl xl:text-3xl font-medium text-center mb-8'>Please confirm to Accept Selected Student</h1>
                        <div className='flex items-center justify-around gap-x-5'>
                            <button className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                                onClick={() => updateStudent()} disabled={loading}>{loading ? 'Wait...' : 'Set Verified'}</button>
                            <button className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                                onClick={() => setIsVerify(false)} disabled={loading}>Cancel</button>
                        </div>
                    </div>
                </div>
            }

            <div><Toaster toastOptions={{ duration: 3000, className: 'text-center sm:min-w-max max-w-xl break-words' }} position="top-center" reverseOrder={true} /></div>
            <button onClick={() => setIsExport(true)} className="px-5 py-2 mt-10 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer mx-auto block">Export Student Data</button>
            {session?.user?.type !== 'dean' && <div className="w-full flex justify-self-end min-w-full my-2 px-5">
                <select className="p-1 outline-none border rounded px-2 ml-auto" value={filter.verified} onChange={(e) => setFilter({ verified: e.target.value })}>
                    <option value={true}>Verified</option>
                    <option value={false}>Unverified</option>
                    <option value="closed">Closed</option>
                </select>
            </div>}
            <section className='p-5 flex flex-wrap gap-10'>
                {students?.length > 0 ? students.map(student => <div key={student._id} className='flex flex-grow items-center gap-x-2 p-2 sm:px-4 rounded-lg max-w-2xl mx-auto border border-purple-100 transform hover:scale-[1.01] hover:border-purple-500 transition-all duration-200 ease-out'>
                    <div className='shrink-0 p-1'>
                        <img className="w-10 h-10 sm:h-14 sm:w-14 rounded-full border-4 border-purple-50 shadow-lg shadow-purple-200 object-cover" src={student?.profileImage || "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"} alt="" />
                    </div>
                    <div className="flex-1 p-1 font-medium text-sm cursor-pointer" onClick={() => Router.push(`/request/${student?._id}`)}>
                        <p className='text-gray-400'>{`${student.firstName} ${student?.lastName} | ${student?.programme}`}</p>
                        <p className='text-lg text-gray-700'>{student.enrollNo}</p>
                        <p className='text-xs font-light text-gray-400'>Applied on: {new Date(student.createdAt).toDateString()}</p>
                    </div>
                    {!student?.isVerified && <div className="w-7 h-7 grid place-items-center flex-shrink-0">
                        <input type="checkbox" className="accent-purple-600 w-5 h-5" onClick={() => handleCheckbox(student?._id)} />
                    </div>}
                    <button
                        onClick={() => Router.push(`/request/${student?._id}`)}
                        className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                    >View</button>
                </div>) :
                    <h1 className='text-purple-600 text-3xl xl:text-4xl font-bold text-center w-full'>No New Request</h1>
                }
            </section>

            {isExport && <div className='fixed top-0 left-0 w-full h-full min-h-screen bg-gray-50 bg-opacity-20 backdrop-filter backdrop-blur grid place-items-center z-10'>
                <div className='max-w-xl rounded-xl shadow-lg border border-gray-100 p-5 sm:p-10 bg-white flex flex-col justify-center items-center'>
                    <h1 className='text-purple-800 text-3xl xl:text-4xl font-semibold text-center'>Select a time range of student data</h1>
                    <div className="flex flex-wrap items-center justify-center gap-5 font-medium my-4 md:my-8">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <span>Start Date</span>
                            <input
                                placeholder="Start Date"
                                required
                                type="date"
                                value={initialDate}
                                onChange={(e) => setInitialDate(e.target.value)}
                                className="select-none h-12 px-4 rounded-3xl transition duration-200 border border-gray-300 shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2">
                            <span>Last Date</span>
                            <input
                                placeholder="Last Date"
                                required
                                type="date"
                                value={finalDate}
                                onChange={(e) => setFinalDate(e.target.value)}
                                className="select-none h-12 px-4 rounded-3xl transition duration-200 border border-gray-300 shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                    <div className='flex items-center justify-around gap-x-5'>
                        {studentData && <CSVLink
                            headers={headers}
                            data={studentData}
                            filename={fileName}
                        >
                            <button className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                                disabled={loading}>{loading ? 'Wait...' : 'Download'}</button>
                        </CSVLink>}
                        <button className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                            onClick={() => { setInitialDate(); setFinalDate(); setStudentData(); setIsExport(false) }} disabled={loading}>Cancel</button>
                    </div>
                </div>
            </div>}
        </>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) return {
        redirect: {
            destination: '/user/login', permanent: false
        }
    };
    // const { data } = await fetch(`${process.env.HOST}/api/student/?verified=${session?.user?.type != 'dean'}&school=${session?.user?.school}`).then((res) => res.json())
    return {
        props: {
            session,
            // data: data
        }
    }
}