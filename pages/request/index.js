import { getSession } from "next-auth/react";
import Router from "next/router";
import { CSVLink } from "react-csv";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function index({ students }) {
    const fileName = "student-detail";
    const [studentData, setStudentData] = useState();
    const [loading, setLoading] = useState(false);
    const [isExport, setIsExport] = useState(false);
    const [initialDate, setInitialDate] = useState();
    const [finalDate, setFinalDate] = useState();

    const headers = [
        { label: "Id", key: "id" },
        { label: "Name", key: "name" },
        { label: "Email", key: "email" },
        { label: "Phone Number", key: "phone" }
    ];

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


    return (
        <>
            <div><Toaster toastOptions={{ duration: 3000, className: 'text-center sm:min-w-max max-w-xl break-words' }} position="top-center" reverseOrder={true} /></div>
            <button onClick={() => setIsExport(true)} className="px-5 py-2 mt-10 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer mx-auto block">Export Student Data</button>
            <section className='p-5 flex flex-wrap gap-10'>
                {students?.length > 0 ? students.map(student => <div key={student._id} className='flex flex-grow items-center gap-x-2 p-2 sm:px-4 rounded-lg max-w-2xl mt-8 mx-auto border border-purple-100 cursor-pointer transform hover:scale-[1.01] hover:border-purple-500 transition-all duration-200 ease-out' onClick={() => Router.push(`/request/${student?._id}`)}>
                    <div className='shrink-0 p-1'>
                        <img className="w-10 h-10 sm:h-14 sm:w-14 rounded-full border-4 border-purple-50 shadow-lg shadow-purple-200 object-cover" src={student?.profileImage || "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"} alt="" />
                    </div>
                    <div className="flex-1 p-1 font-medium text-sm">
                        <p className='text-gray-400'>{`${student.firstName} ${student?.lastName}`}</p>
                        <p className='text-lg text-gray-700'>{student.enrollNo}</p>
                        <p className='text-xs font-light text-gray-400'>{new Date(student.createdAt).toDateString()}</p>
                    </div>
                    <button
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
    const { data } = await fetch(`${process.env.HOST}/api/student/?verified=${session?.user?.type == 'admin'}`).then((res) => res.json())
    return {
        props: {
            session,
            students: data
        }
    }
}