import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';


function apply() {
    const [data, setData] = useState({
        name: '',
        email: '',
        rollNo: ''
    })
    const [image, setImage] = useState();
    const [isSending, setIsSending] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const uploadImage = async () => {
        let data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "ankit_kumar")
        data.append("cloud_name", "ankit628792")
        const resp = await fetch(`https://api.cloudinary.com/v1_1/ankit628792/image/upload`, {
            method: "post",
            body: data
        })
        let res = await resp.json();
        return res.secure_url

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (image) {
        // const image_url = await uploadImage()
        // if (image_url) {
        setIsSending(true)
        const res = await fetch('/api/student/', {
            method: 'POST',
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify(data)
        })
        const response = await res.json()
        if (res.status === 201) {
            toast.success(response.msg)
            setData({
                name: '',
                email: '',
                rollNo: ''
            })
            setImage('')
        }
        else
            toast.error(response.msg)
        setIsSending(false)
    }

    return (
        <div className='p-10 max-w-4xl mx-auto'>
            <div><Toaster toastOptions={{ duration: 3000, className: 'text-center sm:min-w-max max-w-xl break-words' }} position="top-center" reverseOrder={true} /></div>
            <form onSubmit={handleSubmit}>
                <fieldset className='border p-5'>
                    <legend>Enrollment Details</legend>
                    <div className="mb-1 sm:mb-2">
                        <input
                            placeholder="Enter Enrollment Number"
                            required
                            minLength={2}
                            type="number"
                            name="rollNo"
                            value={data.rollNo}
                            onChange={handleChange}
                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-1 sm:mb-2">
                        <input
                            placeholder="Re-Enter Enrollment Number"
                            required
                            minLength={2}
                            type="number"
                            name="rollNo"
                            value={data.rollNo}
                            onChange={handleChange}
                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-1 sm:mb-2">
                        <select
                            required
                            name="rollNo"
                            value={data.rollNo}
                            onChange={handleChange}
                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                        >
                            <option value='' disabled>Year of Admission</option>
                            <option value='2022'>2022</option>
                            <option value='2021'>2021</option>
                            <option value='2020'>2020</option>
                            <option value='2019'>2019</option>
                            <option value='2018'>2018</option>
                            <option value='2017'>2017</option>
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Programme &amp; Corse</legend>
                    <div className="mb-1 sm:mb-2">
                        <select
                            required
                            name="rollNo"
                            value={data.rollNo}
                            onChange={handleChange}
                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                        >
                            <option value='' disabled>Year of Admission</option>
                            <option value='2022'>2022</option>
                            <option value='2021'>2021</option>
                            <option value='2020'>2020</option>
                            <option value='2019'>2019</option>
                            <option value='2018'>2018</option>
                            <option value='2017'>2017</option>
                        </select>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Basic Information</legend>
                    <div className="mb-1 sm:mb-2">
                        {/* <label htmlFor="name" className="inline-block mb-1 text-gray-800 font-medium">Name<span className="mx-1 text-red-500">*</span></label> */}
                        <input
                            placeholder="Your Full Name"
                            required
                            minLength={2}
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-1 sm:mb-2">
                        <label htmlFor="email" className="inline-block mb-1 text-gray-800 font-medium">Email<span className="mx-1 text-red-500">*</span></label>
                        <input
                            placeholder="Your Email"
                            required
                            minLength={2}
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-1 sm:mb-2">
                        <label htmlFor="rollNo" className="inline-block mb-1 text-gray-800 font-medium">Roll No<span className="mx-1 text-red-500">*</span></label>
                        <input
                            placeholder="Your Roll Number"
                            required
                            minLength={2}
                            type="number"
                            name="rollNo"
                            value={data.rollNo}
                            onChange={handleChange}
                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-1 sm:mb-2">
                        <label htmlFor="Profile Image" className="inline-block mb-1 text-gray-800 font-medium">Profile Image<span className="mx-1 text-red-500">*</span></label>
                        <input type="file" required name="image" accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="flex-grow w-full py-2 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                        />
                        {(image?.size > 200000) && <p className="text-red-500 text-sm">Maximum image upload size is 2MB </p>}
                    </div>
                </fieldset>
                <div className="my-4 sm:my-8">
                    <button type="submit" className="px-5 py-2 text-lg font-medium text-purple-100 hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                        disabled={isSending}
                        onClick={handleSubmit}>{isSending ? `Wait...` : `Submit Details`}</button>
                </div>
            </form>
        </div>
    )
}

export default apply