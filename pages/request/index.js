import { getSession } from "next-auth/react";
import Router from "next/router";

export default function index({ students }) {
    return (
        <>
            <button className="px-5 py-2 mt-10 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer mx-auto block">Export Student Data</button>
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