import { getSession, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { programmeList } from '../../util'


const NewUser = ({ setIsNew, owner, isEdit, preData }) => {
    const schools = [... new Set(programmeList.map(item => item.school))]
    const { data: session } = useSession()
    const [data, setData] = useState({
        _id: preData?._id || '',
        name: preData?.name || '',
        email: preData?.email || '',
        type: session?.user?.type === 'owner' ? 'dean' : 'admin',
        password: '',
        school: session?.user?.type === 'dean' ? session?.user?.school : '',
        owner: owner
    })
    const [isSending, setIsSending] = useState(false)
    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true)
        const res = await fetch('/api/user/', {
            method: isEdit ? 'PATCH' : 'POST',
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify(data)
        })
        const response = await res.json()
        if (res.status === 201 || res.status == 200) {
            toast.success(response.msg)
            setData({
                name: '',
                email: '',
                password: ''
            })
            setIsNew(false)
        }
        else
            toast.error(response.msg)
        setIsSending(false)
    }

    return (

        <div className='fixed top-0 left-0 w-full h-full min-h-screen bg-gray-50 bg-opacity-20 backdrop-filter backdrop-blur grid place-items-center z-10'>
            <form onSubmit={handleSubmit} className='max-w-xl w-full rounded-xl shadow-lg border border-gray-100 p-5 sm:p-10 bg-white'>
                <h1 className='text-purple-600 text-3xl xl:text-4xl font-bold text-center mb-8'>{isEdit ? 'Update User' : 'Create New User'}</h1>
                <div className="mb-2">
                    <label htmlFor="name" className="inline-block mb-1 text-gray-800 font-medium text-lg">Name<span className="mx-1 text-red-500">*</span></label>
                    <input
                        placeholder=" Name"
                        required
                        type="text"
                        name='name'
                        value={data.name}
                        onChange={handleChange}
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="email" className="inline-block mb-1 text-gray-800 font-medium text-lg">Email<span className="mx-1 text-red-500">*</span></label>
                    <input
                        placeholder=" Email"
                        required
                        type="email"
                        name='email'
                        value={data.email}
                        onChange={handleChange}
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="password" className="inline-block mb-1 text-gray-800 font-medium text-lg">Password<span className="mx-1 text-red-500">*</span></label>
                    <input
                        placeholder=" Password"
                        required
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                    />
                </div>
                {session?.user?.type === 'owner' && <div className="mb-1 sm:mb-2">
                    <label htmlFor="password" className="inline-block mb-1 text-gray-800 font-medium text-lg">School<span className="mx-1 text-red-500">*</span></label>
                    <select
                        required
                        name="school"
                        value={data.school}
                        onChange={handleChange}
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                    >
                        <option value='' disabled>Select school</option>
                        {schools.map(school => <option key={school} value={school} className='capitalize'>{school}</option>)}
                    </select>
                </div>}
                <div className="my-4 flex items-center gap-x-5">
                    <button type="submit" className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                        disabled={isSending}
                        onClick={handleSubmit}>{isSending ? 'Wait...' : isEdit ? 'Update' : 'Add User'}</button>

                    <button className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                        onClick={() => setIsNew(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

const DelModel = ({ setIsDelete, _id }) => {
    const [isSending, setIsSending] = useState(false)

    const handleDelete = async (e) => {
        e.preventDefault();
        setIsSending(true)
        const res = await fetch(`/api/user/?_id=${_id}`, {
            method: "DELETE"
        })
        const response = await res.json()
        if (res.status == 200) {
            toast.success(response.msg)
            setIsDelete(false)
        }
        else
            toast.error(response.msg)
        setIsSending(false)
    }
    return (
        <div className='fixed top-0 left-0 w-full h-full min-h-screen bg-gray-50 bg-opacity-20 backdrop-filter backdrop-blur grid place-items-center z-10'>
            <div className='max-w-xl rounded-xl shadow-lg border border-gray-100 p-5 sm:p-10 bg-white flex flex-col justify-center items-center'>
                <h1 className='text-purple-800 text-2xl xl:text-3xl font-medium text-center mb-8'>Please confirm to remove user</h1>
                <div className='flex items-center justify-around gap-x-5'>
                    <button className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                        onClick={handleDelete} disabled={isSending}>{isSending ? 'Wait...' : 'Delete'}</button>
                    <button className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                        onClick={() => setIsDelete(false)} disabled={isSending}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

const User = ({ user }) => {
    const { data: session } = useSession()
    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    return (
        <>
            <div className='relative max-w-xs rounded-xl border border-purple-100 shadow-lg shadow-purple-50 p-5 pt-8 text-lg font-semibold text-gray-600'>
                <svg onClick={() => setIsEdit(true)} xmlns="http://www.w3.org/2000/svg" className="absolute -top-5 right-10 cursor-pointer h-10 w-10 p-2 rounded-full bg-white text-blue-500 shadow-lg shadow-blue-100 border border-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                <svg onClick={() => setIsDelete(true)} xmlns="http://www.w3.org/2000/svg" className="absolute -top-5 -right-2 cursor-pointer h-10 w-10 p-2 rounded-full bg-white text-red-500 shadow-lg shadow-red-100 border border-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <h1>Name: <span className='text-purple-600 font-medium ml-1'>{user?.name}</span></h1>
                <h1 className='my-2'>Email: <span className='text-purple-600 font-medium ml-1'>{user?.email}</span></h1>
                <h1>Type: <span className='text-purple-600 font-medium ml-1 capitalize'>{user?.type}</span> </h1>
                {user?.school && <h1 className='mt-2'>School: <span className='text-purple-600 font-medium ml-1 capitalize'>{user?.school}</span> </h1>}
            </div>
            {isEdit && <NewUser owner={session?.user?._id} isEdit={true} setIsNew={setIsEdit} preData={user} />}
            {isDelete && <DelModel setIsDelete={setIsDelete} _id={user?._id} />}
        </>
    )
}


function index({ users }) {
    const { data: session } = useSession()
    const [isNew, setIsNew] = useState(false)
    const [userList, setUserList] = useState(users || {})
    useEffect(() => {
        if (session) {
            fetch(`/api/user/?ownerId=${session?.user?._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': ' application/json',
                }
            })
                .then(res => res.json())
                .then(data => setUserList(data))
        }
    }, [session, isNew])

    return (
        <>
            <div><Toaster toastOptions={{ duration: 3000, className: 'text-center sm:min-w-max max-w-xl break-words' }} position="top-center" reverseOrder={true} /></div>
            <section className='flex items-center justify-evenly gap-x-10 gap-y-14 flex-wrap p-5 sm:py-10'>
                {
                    userList?.length > 0 && userList.map(user => <User key={user._id} user={user} />
                    )
                }
                <div onClick={() => setIsNew(true)} className="max-w-xs hover:border-purple-600 hover:border-solid hover:bg-white hover:text-purple-800 group w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-purple-300 text-sm leading-6 text-purple-600 font-medium py-3 cursor-pointer">
                    <svg className="group-hover:text-purple-600 mb-1 text-slate-400" width="20" height="20" fill="currentColor" aria-hidden="true">
                        <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                    </svg>
                    New User
                </div>
            </section>
            {
                isNew && <NewUser setIsNew={setIsNew} owner={session?.user?._id} />
            }
        </>
    )
}

export default index

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) return {
        redirect: {
            destination: '/user/login', permanent: false
        }
    };;
    const authorized = ['owner', 'dean'].includes(session?.user?.type)
    if (!authorized) return {
        redirect: {
            destination: '/', permanent: false
        }
    };
    const data = await fetch(`${process.env.HOST}/api/user/?ownerId=${session?.user?._id}`).then(res => res.json())
    return {
        props: {
            session,
            users: data
        }
    }
}