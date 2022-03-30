import toast, { Toaster } from "react-hot-toast"
import { useState } from "react"
import Router from "next/router"

const Home = () => {
  const [enrollNo, setEnrollNo] = useState('')

  const onSearch = async (e) => {
    e.preventDefault();
    if (enrollNo?.toString().length !== 11) return toast.error('Invalid Enrollment Number')

    else {
      const res = await fetch('/api/student/', {
        method: 'POST',
        headers: {
          'Content-Type': ' application/json',
          'Request-Type': 'search'
        },
        body: JSON.stringify({ enrollNo: enrollNo.toString() })
      })
      const response = await res.json()
      if (res.status === 200)
        toast.success(response.msg)
      else
        toast.error(response.msg)
    }
  }

  return (
    <>
      <div><Toaster toastOptions={{ duration: 3000, className: 'text-center sm:min-w-max max-w-xl break-words' }} position="top-center" reverseOrder={true} /></div>
      <div className='text-center'>
        <h1 className='text-purple-600 text-3xl xl:text-4xl font-bold text-center mt-10'>Check Your Request</h1>

        <form onSubmit={onSearch} className="my-6 relative max-w-lg mx-auto">
          <input
            placeholder="Enter Enrollment number"
            required
            type="number"
            value={enrollNo}
            onChange={(e) => setEnrollNo(e.target.value)}
            className="w-full max-w-lg h-12 px-5 rounded-3xl transition duration-200 border border-gray-300 shadow-sm appearance-none focus:outline-none focus:shadow-outline"
          />
          <button>
            <svg type="submit" onSubmit={onSearch} xmlns="http://www.w3.org/2000/svg" className="h-full w-16 p-3 cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2 z-10 rounded-3xl" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>

        <h1 className='text-purple-600 text-3xl xl:text-4xl font-bold text-center mt-16 mb-6'>Want to apply for Email or Internet ?</h1>
        <button className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
          onClick={() => Router.push('/request/new')}>Click Apply</button>
      </div>

    </>
  )
}

export default Home
