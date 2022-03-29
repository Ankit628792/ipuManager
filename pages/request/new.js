import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { programmeList } from '../../util';

const year = new Date().getFullYear()

const years = [`${year}`, `${year - 1}`, `${year - 2}`, `${year - 3}`, `${year - 4}`, `${year - 5}`]
// const schools = ['USAP', 'USBAS', 'USBT', 'USCT', 'USE', 'USEM', 'USHSS', 'USICT', 'USLLS', 'USMC', 'USMS', 'USAR', 'USDI', 'CDMS']
// const programmes = ['B.Arch.', 'B.Tech.', 'M.Tech.', 'M.A.', 'MCA', 'MBA', 'M.Ed.', 'M.Sc.', 'PG Diploma', 'LLB', 'LLM', 'Ph.D.']
// const courses = ['BCE', 'Biodiversity', 'BT', 'CE', 'CSE', 'ECE', 'Economics', 'Education', 'EM', 'English', 'EP', 'FA', 'IT', 'MC', 'NST', 'NRM', 'SE', 'MCDD', 'Other']

export default function () {

    const [data, setData] = useState({
        enrollNo: 42011302718,
        confirm_enrollNo: 42011302718,
        admissionYear: '2018',
        school: 'USICT',
        programme: 'MCA',
        course: 'IT',
        firstName: 'Yash',
        lastName: 'Kumar',
        gender: 'male',
        mobileNo: 8505931984,
        alternateMobileNo: '',
        email: 'ankitbusiness5711@gmail.com',
        alternateEmail: '',
        requestEmail: false,
        emailReason: '',
        requestInternet: false,
        internetReason: ''
    })
    // const schools = [... new Set(programmeList.map(item => item.school))]
    // const programmes = [... new Set(programmeList.map(item => { if (item.school === data.school) return item.name }))]
    // console.log(programmes.shift())
    // const courses = [... new Set(programmeList.map(item => { if (item.name === data.programme && item.course) return item.course }))]
    // console.log(courses.shift())

    const [schools, setSchools] = useState([... new Set(programmeList.map(item => item.school))])
    const [programmes, setProgrammes] = useState()
    const [courses, setCourses] = useState()

    useEffect(() => {
        const program = [... new Set(programmeList.map(item => { if (item.school === data.school) return item.name }))]
        program?.length > 0 && program.shift()
        setProgrammes(program)
    }, [data.school, schools])

    useEffect(() => {
        const course = [... new Set(programmeList.map(item => { if (item.name === data.programme && item.course) return item.course }))]
        course?.length > 0 && course.shift()
        setCourses(course)
    }, [data.programme], programmes)

    const [profileImage, setProfileImage] = useState();
    const [idImage, setIdImage] = useState();
    const [addressProof, setAddressProof] = useState();
    const [isSending, setIsSending] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const uploadImage = async (image) => {
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
        if (!data.enrollNo || !data.confirm_enrollNo || !data.admissionYear || !data.school || !data.programme || !data.course || !data.firstName || !data.lastName || !data.gender || !data.mobileNo || !data.email || !profileImage || !idImage || !addressProof)
            return toast.error('Fill all the Details')
        if (data?.requestEmail == 'false' && data?.requestInternet == 'false') return toast.error('Submit for atleast on request')
        if (data?.requestEmail == "true" && !data?.emailReason) return toast.error('Submit Reason for email request')
        if (data?.requestInternet == "true" && !data?.internetReason) return toast.error('Submit Reason for internet request')
        if (data?.mobileNo.toString().length !== 10) return toast.error('Invalid Mobile Number')
        if (data?.enrollNo?.toString().length !== 11) return toast.error('Invalid Enrollment Number')
        if (data.enrollNo !== data.confirm_enrollNo) return toast.error('Enrollment numbers are not same!')
        const check = await fetch('/api/student/', {
            method: 'POST',
            headers: {
                'Content-Type': ' application/json',
                'Request-Type': 'search'
            },
            body: JSON.stringify({ enrollNo: data.enrollNo.toString() })
        })
        if (check.status == 200) return toast.error('Email or Enrollment number already exist')
        setIsSending(true)
        const profileImage_url = await uploadImage(profileImage);
        const idImage_url = await uploadImage(idImage);
        const addressProof_url = await uploadImage(addressProof);
        const res = await fetch('/api/student/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...data, enrollNo: data.enrollNo.toString(), profileImage: profileImage_url, idImage: idImage_url, addressProof: addressProof_url })
        })
        const response = await res.json()
        if (res.status === 201) {
            toast.success(response.msg)
            setData({
                enrollNo: '',
                confirm_enrollNo: '',
                admissionYear: '',
                school: '',
                programme: '',
                course: '',
                firstName: '',
                lastName: '',
                gender: '',
                mobileNo: '',
                alternateMobileNo: '',
                email: '',
                alternateEmail: '',
                requestEmail: false,
                emailReason: '',
                requestInternet: false,
                internetReason: ''
            })
            setProfileImage('')
            setIdImage('')
            setAddressProof('')
            window.location.reload()
        }
        else
            toast.error(response.msg)
        setIsSending(false)
    }

    return (
        <div className='px-2 py-10 sm:px-10 max-w-6xl mx-auto'>
            <div><Toaster toastOptions={{ duration: 3000, className: 'text-center sm:min-w-max max-w-xl break-words' }} position="top-center" reverseOrder={true} /></div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap items-start gap-5">
                    <fieldset className='border p-5'>
                        <legend className='text-xl font-medium'>Personal Information</legend>

                        <div className="mb-1 sm:mb-2">
                            <input
                                placeholder="First Name"
                                required
                                minLength={2}
                                type="text"
                                name="firstName"
                                value={data.firstName}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <input
                                placeholder="Last Name"
                                required
                                minLength={2}
                                type="text"
                                name="lastName"
                                value={data.lastName}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <span className=' text-base font-medium'>Gender :</span>
                            <input className='w-4 h-4 cursor-pointer accent-purple-600 ml-4 mr-1' type='radio' name='gender' onChange={handleChange} value='male' /><span>Male</span>
                            <input className='w-4 h-4 cursor-pointer accent-purple-600 ml-4 mr-1' type='radio' name='gender' onChange={handleChange} value='female' /><span>Female</span>
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <input
                                placeholder="Registered Mobile Number"
                                required
                                type="tel"
                                name="mobileNo"
                                value={data.mobileNo}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <input
                                placeholder="Alternate Mobile Number"
                                type="tel"
                                maxLength={10}
                                name="alternateMobileNo"
                                value={data.alternateMobileNo}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-1 sm:mb-2">
                            <input
                                placeholder="Registered Email"
                                required
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <input
                                placeholder="Alternate Email"
                                type="email"
                                name="alternateEmail"
                                value={data.alternateEmail}
                                onChange={handleChange}
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-1 sm:mb-2">
                            <label className="inline-block mb-1 text-gray-800 font-medium">Profile Image</label>
                            <input type="file" required accept="image/*"
                                onChange={(e) => e.target.files[0]?.type?.slice(0, 5) === 'image' ? setProfileImage(e.target.files[0]) : toast.error('Only Image format allowed!')}
                                className="flex-grow w-full py-2 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                            {(profileImage?.size > 200000) && <p className="text-red-500 text-sm">Maximum image upload size is 2MB </p>}
                        </div>

                        <div className="mb-1 sm:mb-2">
                            <label className="inline-block mb-1 text-gray-800 font-medium">Student ID Card Image</label>
                            <input type="file" required accept="image/*"
                                onChange={(e) => e.target.files[0]?.type?.slice(0, 5) === 'image' ? setIdImage(e.target.files[0]) : toast.error('Only Image format allowed!')}
                                className="flex-grow w-full py-2 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                            {(idImage?.size > 300000) && <p className="text-red-500 text-sm">Maximum image upload size is 3MB </p>}
                        </div>

                        <div className="mb-1 sm:mb-2">
                            <label className="inline-block mb-1 text-gray-800 font-medium">Adress Proof</label>
                            <input type="file" required accept="image/*"
                                onChange={(e) => setAddressProof(e.target.files[0])}
                                className="flex-grow w-full py-2 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                            {(addressProof?.size > 200000) && <p className="text-red-500 text-sm">Maximum image upload size is 2MB </p>}
                        </div>
                    </fieldset>
                    <div className='flex-grow'>
                        <fieldset className='border p-5'>
                            <legend className='text-xl font-medium'>Enrollment Details</legend>
                            <div className="mb-1 sm:mb-2">
                                <input
                                    placeholder="Enter Enrollment Number"
                                    required
                                    minLength={11}
                                    maxLength={11}
                                    type="number"
                                    name="enrollNo"
                                    value={data.enrollNo}
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
                                    name="confirm_enrollNo"
                                    value={data.confirm_enrollNo}
                                    onChange={handleChange}
                                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-1 sm:mb-2">
                                <select
                                    required
                                    name="admissionYear"
                                    value={data.admissionYear}
                                    onChange={handleChange}
                                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                >
                                    <option value='' disabled>Year of Admission</option>
                                    {years.map(year => <option key={year} value={year} className='capitalize'>{year}</option>)}
                                </select>
                            </div>
                        </fieldset>

                        <fieldset className='border p-5 my-5'>
                            <legend className='text-xl font-medium'>Programme &amp; Course</legend>
                            <div className="mb-1 sm:mb-2">
                                <select
                                    required
                                    name="school"
                                    value={data.school}
                                    onChange={handleChange}
                                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                >
                                    <option value='' disabled>Select School</option>
                                    {schools?.map(school => <option key={school} value={school} className='capitalize'>{school}</option>)}
                                </select>
                            </div>
                            <div className="mb-1 sm:mb-2">
                                <select
                                    required
                                    name="programme"
                                    value={data.programme}
                                    onChange={handleChange}
                                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                >
                                    <option value='' disabled>Select Programme</option>
                                    {programmes?.map(programme => <option key={programme} value={programme} className='capitalize'>{programme}</option>)}
                                    <option value='other'>Other</option>
                                </select>
                            </div>
                            <div className="mb-1 sm:mb-2">
                                <select
                                    required
                                    name="course"
                                    value={data.course}
                                    onChange={handleChange}
                                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                >
                                    <option value='' disabled>Select Course</option>
                                    {courses?.map(course => <option key={course} value={course} className='capitalize'>{course}</option>)}
                                    <option value='other'>Other</option>
                                </select>
                            </div>
                        </fieldset>
                        <fieldset className='border p-5 my-4'>
                            <legend className='text-xl font-medium'>Request for</legend>
                            <input type='checkbox' name='requestEmail' value={!data.requestEmail} onChange={handleChange} className='accent-purple-600 mr-1 w-4 h-4 cursor-pointer' /><span>Provide Email Id</span> <br />
                            <textarea name="emailReason" value={data.emailReason} onChange={handleChange} placeholder="Describe why you need mail id ..." minLength={10} className='p-2 m-4 h-20 w-full border resize-none'>
                            </textarea>
                            <input type='checkbox' name='requestInternet' value="true" onChange={handleChange} className='accent-purple-600 mr-1 w-4 h-4 cursor-pointer' /><span>Provide Internet Access</span> <br />
                            <textarea name="internetReason" value={data.internetReason} placeholder="Describe why you need internet id" minLength={10} onChange={handleChange} className='p-2 m-4 h-20 w-full border resize-none'>
                            </textarea>
                        </fieldset>
                    </div>

                </div>
                <fieldset className='border p-5 my-4 max-w-6xl'>
                    <legend className='text-xl font-medium'>I Confirm that</legend>
                    <input type='checkbox' required className='accent-purple-600 mr-1 w-4 h-4 cursor-pointer' /><span>I shall follow University Rules</span> <br />
                    <input type='checkbox' required className='accent-purple-600 mr-1 w-4 h-4 cursor-pointer' /><span>I shall not share my Password / Credential to anyone.</span> <br />
                    <input type='checkbox' required className='accent-purple-600 mr-1 w-4 h-4 cursor-pointer' /><span>I shall be fully responsible for any activities carried out through my user account.</span>
                </fieldset>
                <div className="my-4 sm:my-8">
                    <button type="submit" className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                        disabled={isSending}
                        onSubmit={handleSubmit}>{isSending ? `Wait...` : `Submit Details`}</button>
                </div>
            </form>
        </div>
    )
}

