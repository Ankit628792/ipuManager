import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { programmeList } from '../../util';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const year = new Date().getFullYear()

const years = [`${year}`, `${year - 1}`, `${year - 2}`, `${year - 3}`, `${year - 4}`, `${year - 5}`]
const schema = yup.object({
    firstName: yup.string().required('* First Name is Required'),
    lastName: yup.string().required('* Last Name is Required'),
    gender: yup.string().required('* Gender is Required'),
    email: yup.string().email().required('* Email is Required'),
    alternateEmail: yup.string().email(),
    mobileNo: yup.number().positive().integer().typeError('* Value must be a Number').required('* Mobile no is Required').test('len', 'Must be exactly 10 digit', val => val?.toString().length === 10),
    enrollNo: yup.number().positive().integer().typeError('* Value must be a Number').required('* Please enter your Enrollment no').test('len', 'Invalid Enrollment Number', val => val?.toString().length === 11),
    confirm_enrollNo: yup.number().positive().integer().typeError('* Value must be a Number').required().test('len', 'Invalid Enrollment Number', val => val?.toString().length === 11).oneOf([yup.ref('enrollNo'), null], 'Enrollment must match'),
    admissionYear: yup.string().required('* Admission Year is Required'),
    school: yup.string().required('* Please select a school'),
    programme: yup.string().required('* Please select a programme'),
    course: yup.string().required('* Please select a scourse'),
    requestEmail: yup.boolean(),
    emailReason: yup.string().when('requestEmail', { is: true, then: yup.string().min(2, "Too short reason").required('* Reason for email request is required') }),
    requestInternet: yup.boolean(),
    internetReason: yup.string().when('requestInternet', { is: true, then: yup.string().min(2, "Too short Reason").required('* Reason for internet request is required') }),
}).required();

export default function () {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: '',
            lastName: '',
            gender: '',
            email: '',
            mobileNo: '',
            admissionYear: '',
            enrollNo: '',
            confirm_enrollNo: '',
            school: '',
            programme: 'other',
            course: 'other',
        }
    });
    const onSubmit = (data, e) => postFormData(data);
    const onError = (errors, e) => console.log("error", errors, e);

    const admissionYearField = register("admissionYear", { required: true });
    const programmeField = register("programme", { required: true });
    const courseField = register("course", { required: true });
    const schoolField = register("school", { required: true });

    const [data, setData] = useState()

    const [schools, setSchools] = useState([... new Set(programmeList.map(item => item.school))])
    const [programmes, setProgrammes] = useState()
    const [courses, setCourses] = useState()


    useEffect(() => {
        if (data?.school) {
            const program = [... new Set(programmeList.map(item => { if (item?.school === data?.school) return item?.name }))]
            program?.length > 0 && program.shift()
            setProgrammes(program)
        }
    }, [data?.school, schools])

    useEffect(() => {
        if (data?.programme) {
            const course = [... new Set(programmeList.map(item => { if (item?.name === data?.programme && item?.course) return item?.course }))]
            course?.length > 0 && course.shift()
            setCourses(course)
        }
    }, [data?.programme, programmes])


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

    const postFormData = async (data) => {
        console.log(data)
        if (!data?.requestEmail && !data?.requestInternet) return toast.error('Submit for atleast on request')
        const check = await fetch('/api/student/', {
            method: 'POST',
            headers: {
                'Content-Type': ' application/json',
                'Request-Type': 'search'
            },
            body: JSON.stringify({ enrollNo: data.enrollNo.toString(), email: data.email })
        })
        if (check.status == 200) return toast.error('Email or Enrollment number already exist')
        else {
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
                window.location.reload()
            }
            else
                toast.error(response.msg)
            setIsSending(false)
        }
    }

    return (
        <div className='px-2 py-10 sm:px-10 max-w-6xl mx-auto'>
            <div><Toaster toastOptions={{ duration: 3000, className: 'text-center sm:min-w-max max-w-xl break-words' }} position="top-center" reverseOrder={true} /></div>
            <form onSubmit={handleSubmit(onSubmit, onError)} className="apply__form">
                <div className="flex flex-wrap xl:flex-nowrap items-start gap-5">
                    <fieldset className='flex-grow border p-5 max-w-lg lg:max-w-xl xl:max-w-lg mx-auto'>
                        <legend className='text-xl font-medium'>Personal Information</legend>

                        <p>{errors.firstName?.message}</p>
                        <div className="mb-1 sm:mb-2">
                            <input
                                {...register("firstName")}
                                placeholder="Enter First Name"
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <p>{errors.lastName?.message}</p>
                        <div className="mb-1 sm:mb-2">
                            <input
                                {...register("lastName")}
                                placeholder="Enter Last Name"
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <p>{errors.gender?.message}</p>
                        <div className="mb-1 sm:mb-2">
                            <select
                                defaultValue=""
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                {...register("gender")}>
                                <option value="" disabled>Select Gender</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <p>{errors.mobileNo?.message}</p>
                        <div className="mb-1 sm:mb-2">
                            <input
                                {...register('mobileNo')}
                                placeholder="Registered Mobile Number"
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-1 sm:mb-2">
                            <input
                                {...register('alternateMobileNo')}
                                placeholder="Alternate Mobile Number"
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <p>{errors.email?.message}</p>
                        <div className="mb-1 sm:mb-2">
                            <input
                                {...register('email')}
                                placeholder="Registered Email"
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-1 sm:mb-2">
                            <input
                                {...register('alternateEmail')}
                                placeholder="Alternate Email"
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-1 sm:mb-2">
                            <label className="inline-block mb-1 text-gray-800 font-medium">Profile Image</label>
                            <input type="file" accept="image/*" required
                                onChange={(e) => e.target.files[0]?.type?.slice(0, 5) === 'image' ? setProfileImage(e.target.files[0]) : toast.error('Only Image format allowed!')}
                                className="flex-grow w-full py-2 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                            {(profileImage?.size > 2000000) && <p className="text-red-500 text-sm">Maximum image upload size is 2MB </p>}
                        </div>

                        <div className="mb-1 sm:mb-2">
                            <label className="inline-block mb-1 text-gray-800 font-medium">Student ID Card Image</label>
                            <input type="file" accept="image/*" required
                                onChange={(e) => e.target.files[0]?.type?.slice(0, 5) === 'image' ? setIdImage(e.target.files[0]) : toast.error('Only Image format allowed!')}
                                className="flex-grow w-full py-2 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                            {(idImage?.size > 3000000) && <p className="text-red-500 text-sm">Maximum image upload size is 3MB </p>}
                        </div>

                        <div className="mb-1 sm:mb-2">
                            <label className="inline-block mb-1 text-gray-800 font-medium">Address Proof</label>
                            <input type="file" accept="image/*" required
                                onChange={(e) => setAddressProof(e.target.files[0])}
                                className="flex-grow w-full py-2 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                            />
                            {(addressProof?.size > 2000000) && <p className="text-red-500 text-sm">Maximum image upload size is 2MB </p>}
                        </div>
                    </fieldset>
                    <div className='flex-grow max-w-lg lg:max-w-xl xl:max-w-lg mx-auto'>
                        <fieldset className='border p-5'>
                            <legend className='text-xl font-medium'>Enrollment Details</legend>
                            <p>{errors.enrollNo?.message}</p>
                            <div className="mb-1 sm:mb-2">
                                <input
                                    {...register('enrollNo')}
                                    placeholder="Enter Enrollment Number"
                                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <p>{errors.confirm_enrollNo?.message}</p>
                            <div className="mb-1 sm:mb-2">
                                <input
                                    {...register('confirm_enrollNo')}
                                    placeholder="Re-Enter Enrollment Number"
                                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <p>{errors.admissionYear?.message}</p>
                            <div className="mb-1 sm:mb-2">
                                <select
                                    defaultValue=""
                                    {...admissionYearField}
                                    onChange={(e) => {
                                        admissionYearField.onChange(e);
                                        handleChange(e)
                                    }}
                                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                >
                                    <option value='' disabled>Year of Admission</option>
                                    {years.map(year => <option key={year} value={year} className='capitalize'>{year}</option>)}
                                </select>
                            </div>
                        </fieldset>

                        <fieldset className='border p-5 my-5'>
                            <legend className='text-xl font-medium'>Programme &amp; Course</legend>

                            <p>{errors.school?.message}</p>
                            <div className="mb-1 sm:mb-2">
                                <select
                                    defaultValue=""
                                    {...schoolField}
                                    onChange={(e) => {
                                        schoolField.onChange(e);
                                        handleChange(e)
                                    }}
                                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                >
                                    <option value='' disabled>Select School</option>
                                    {schools?.map(school => <option key={school} value={school} className='capitalize'>{school}</option>)}
                                </select>
                            </div>

                            <p>{errors.programme?.message}</p>
                            <div className="mb-1 sm:mb-2">
                                <select
                                    defaultValue=""
                                    {...programmeField}
                                    onChange={(e) => {
                                        programmeField.onChange(e);
                                        handleChange(e)
                                    }}
                                    className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                >
                                    <option value='' disabled>Select Programme</option>
                                    {programmes?.map(programme => <option key={programme} value={programme} className='capitalize'>{programme}</option>)}
                                    <option value='other'>Other</option>
                                </select>
                            </div>

                            <p>{errors.course?.message}</p>
                            <div className="mb-1 sm:mb-2">
                                <select
                                    defaultValue=""
                                    {...courseField}
                                    onChange={(e) => {
                                        courseField.onChange(e);
                                        handleChange(e)
                                    }}
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
                            <input type='checkbox' {...register('requestEmail')} className='accent-purple-600 mr-1 w-4 h-4 cursor-pointer' /><span>Provide Email Id</span> <br />
                            <p>{errors.emailReason?.message}</p>
                            <textarea {...register('emailReason')} placeholder="Describe why you need mail id ..." className='p-2 m-4 h-20 w-full border resize-none'>
                            </textarea>
                            <input type='checkbox' {...register('requestInternet')} className='accent-purple-600 mr-1 w-4 h-4 cursor-pointer' /><span>Provide Internet Access</span> <br />
                            <p>{errors.internetReason?.message}</p>
                            <textarea {...register('internetReason')} placeholder="Describe why you need internet id" className='p-2 m-4 h-20 w-full border resize-none'>
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
                    <input type="submit" className="px-5 py-2 text-lg font-medium text-white hover:bg-purple-800 border bg-purple-600 rounded-3xl transition-all duration-150 ease-out cursor-pointer"
                    />
                </div>
            </form>
        </div>
    )
}

