import { signIn, useSession, signOut, getSession } from 'next-auth/react'
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Router from 'next/router';


function login() {
    const [email, setEmail] = useState('ak@gmail.com');
    const [password, setPassword] = useState('123456')
    const [isSending, setIsSending] = useState(false)

    const submitData = async () => {
        setIsSending(true)
        const res = await signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
        })
        if (res.status === 401)
            toast.error('Unauthorised User!')
        else if (res.status === 200) {
            toast.success('Login Success!')
            Router.push('/request/')
        }
        else
            toast.error(res.error)
        setIsSending(false)
    }

    return (
        <form onSubmit={() => submitData()} className='max-w-xl mx-auto rounded-xl shadow-lg border border-gray-100 p-5 sm:p-10 my-10'>
            <div><Toaster toastOptions={{ duration: 3000, className: 'text-center sm:min-w-max max-w-xl break-words' }} position="top-center" reverseOrder={true} /></div>
            <h1 className='text-purple-600 text-3xl xl:text-4xl font-bold text-center my-4' onClick={() => signOut()}>User Login</h1>
            <div className="mb-2">
                <label htmlFor="email" className="inline-block mb-1 text-gray-800 font-medium text-lg">Email<span className="mx-1 text-red-500">*</span></label>
                <input
                    placeholder="Your Email"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-2">
                <label htmlFor="password" className="inline-block mb-1 text-gray-800 font-medium text-lg">Password<span className="mx-1 text-red-500">*</span></label>
                <input
                    placeholder="Your Password"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="my-4">
                <button type="submit" className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                    disabled={isSending}
                    onClick={() => submitData()}>{isSending ? `Wait...` : `Login`}</button>
            </div>
        </form>
    )
}

export default login

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session) return {
        redirect: {
            destination: '/', permanent: false
        }
    };
    return {
        props: {
            session
        }
    }
}