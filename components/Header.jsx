import React from 'react'
import Router from 'next/router'
import { signOut, useSession } from 'next-auth/react'

function Header() {
    const { data: session } = useSession()
    return (
        <header className='p-5 lg:px-10 sticky top-0 w-full flex items-center justify-between max-w-7xl mx-auto bg-white z-50'>
            <h1 className='text-3xl font-bold text-purple-600 hover:text-purple-400 cursor-pointer' onClick={() => Router.push('/')}>GGSIPU</h1>
            <nav>
                <ul className='flex items-center gap-x-3 sm:gap-x-6 text-lg font-semibold'>
                    {
                        session ?
                            <>
                                <li className='text-purple-600 hover:text-purple-800 cursor-pointer' onClick={() => Router.push('/request/')}>Requests</li>
                                {['owner', 'dean'].includes(session?.user?.type) && <li className='text-purple-600 hover:text-purple-800 cursor-pointer' onClick={() => Router.push('/user/')}>Users</li>}
                                <li className='bg-purple-600 w-10 h-10 grid place-items-center text-2xl hover:bg-purple-800 text-white rounded-3xl cursor-pointer' onClick={() => signOut()}>{session?.user?.name?.[0]}</li>
                                {/* <li className='bg-purple-600 hover:bg-purple-800 text-white px-5 py-2 rounded-3xl cursor-pointer' onClick={() => signOut()}>Logout</li> */}
                            </>
                            :
                            <>
                                <li className='text-purple-600 hover:text-purple-800 cursor-pointer' onClick={() => Router.push('/request/new')}>Apply</li>
                                <li className='bg-purple-600 hover:bg-purple-800 text-white px-5 py-2 rounded-3xl cursor-pointer' onClick={() => Router.push('/user/login')}>Login</li>
                            </>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header