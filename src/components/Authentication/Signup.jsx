import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MemberRegisterInput from './components/MemberRegisterInput';
import MemberRegisterSelect from './components/MemberRegisterSelect';
import axios from 'axios';
import { useRouter } from 'next/navigation';


// Validation Schema using Yup
const validationSchema = yup.object().shape({
    full_name: yup
        .string()
        .required('Full Name is required')
        .matches(/^[a-zA-Z\s]+$/, 'Full Name must be only letters')
        .min(4, 'Full Name must be at least 4 characters'),
    member_type: yup
        .string()
        .required('Member Type is required'),
    // .oneOf(['Standard', 'Premium', 'Other'], 'Invalid Member Type'),
    branch: yup
        .string()
        .required('Branch is required'),
    contact_no: yup
        .string()
        .required('Contact Number is required')
        .matches(/^[0-9]+$/, 'Contact Number must be numeric')
        .min(11, 'Contact Number must be at least 11 digits'),
    nickname: yup
        .string()
        .required('Nickname is required')
        .matches(/^[a-zA-Z\s]+$/, 'Nickname must be only letters'),
    date_of_birth: yup
        .date()
        .required('Date of Birth is required')
        .typeError('Invalid Date of Birth'),
    nid_number: yup
        .string()
        .required('National ID is required')
        .matches(/^[0-9]+$/, 'National ID must be numeric')
        .min(10, 'National ID must be at least 10 digits'),
    address: yup
        .string()
        .required('Address is required')
        .min(5, 'Address must be at least 5 characters'),
    status: yup
        .string()
        .required('Marital Status is required')
        .oneOf(['Married', 'Unmarried', 'Divorced', "Don't say"], 'Invalid Marital Status'),
    gender: yup
        .string()
        .required('Gender is required')
        .oneOf(['Male', 'Female'], 'Invalid Gender'),
    religion: yup
        .string()
        .required('Religion is required')
        .oneOf(['Islam', 'Hindu', 'Christian', 'Buddhism', 'Other'], 'Invalid Religion'),
    email: yup
        .string()
        .required('Email is required')
        .email('Invalid email format'),
    emergency_contact_name: yup
        .string()
        .required('Emergency Contact Name is required')
        .matches(/^[a-zA-Z\s]+$/, 'Emergency Contact Name must be only letters'),
    emergency_contact_number: yup
        .string()
        .required('Emergency Contact Number is required')
        .matches(/^[0-9]+$/, 'Emergency Contact Number must be numeric')
        .min(10, 'Emergency Contact Number must be at least 10 digits'),
    fb_id: yup
        .string()
        .required('FB ID is required')
        .matches(/^[a-zA-Z0-9]+$/, 'FB ID must not contain spaces'),
    blood_group: yup
        .string()
        .required('Blood Group is required')
        .oneOf(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], 'Invalid Blood Group'),
    height: yup
        .string()
        .required('Height is required'),
    weight: yup
        .number()
        .required('Weight is required')
        .typeError('Weight must be a number')
        .max(700, 'Weight cannot exceed 700 kg'),
    profession: yup
        .string()
        .required('Profession is required')
        .matches(/^[a-zA-Z\s]+$/, 'Profession must be only letters'),
});



const Signup = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const [age, setAge] = useState('');
    const [branches] = useState([
        { label: 'ShiaMosjid Branch', value: 'shia' },
        { label: 'Lalmatia Branch', value: 'lalmatia' }
    ]);
    const [memberTypes] = useState(['Monthly', 'Weekly', 'Daily', 'Package']);
    const [bloodGroups] = useState(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']);
    const router = useRouter();
    const dateOfBirth = watch('date_of_birth');

    useEffect(() => {
        if (dateOfBirth) {
            const calculateAge = (dob) => {
                const birthDate = new Date(dob);
                const difference = Date.now() - birthDate.getTime();
                const ageDate = new Date(difference);
                return Math.abs(ageDate.getUTCFullYear() - 1970);
            };
            setAge(calculateAge(dateOfBirth));
        }
    }, [dateOfBirth]);

    const onSubmit = (data) => {
        // console.log(data)
        const signUpUser = async (userData) => {
            try {
                // const response = await axios.post('http://localhost:8000/api/users/signup', userData);
                const response = await axios.post('https://multigym-management-server-dmmji.ondigitalocean.app/api/users/signup', userData);
                console.log(response.data)
                if (response.data.message === "User with this email already exists." || response.data.message === "User with this mobile already exists.") {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: response.data.message,
                    });
                } else {
                    Swal.fire({
                        position: "middle",
                        icon: "success",
                        title: "User created successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    router.push("/", { replace: true });
                }
            } catch (error) {
                console.log(error.response.data)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response ? error.response.data.error : 'An error occurred',
                });

            }
        };
        signUpUser(data);
    };

    return (
        <article
            className="w-full text-white h-screen bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1526401485004-46910ecc8e51?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            }}
        >
            <form className="md:w-full w-[95%] max-w-4xl scrollbar-thin max-h-[95vh] overflow-y-auto bg-black bg-opacity-50 backdrop-blur-lg rounded-xl py-6 px-6 shadow" onSubmit={handleSubmit(onSubmit)}>
                <div className="md:grid md:grid-cols-2 gap-3">
                    <p className="text-2xl text-center px-4 py-2 rounded-xl font-semibold my-4 mt-2 md:col-span-2">
                        Sign Up Now
                    </p>

                    {/* Membership Details */}

                    <MemberRegisterSelect label="Branch" register={register} error={errors} name="branch" isRequired={true}>
    <option value="">Select Branch</option>
    {branches.map((item, index) => (
        <option value={item.value} key={index}>{item.label}</option>
    ))}
</MemberRegisterSelect>



                    <MemberRegisterSelect label="Member Type" register={register} error={errors} name="member_type" isRequired={true}>
                        <option value="">Select Member Type</option>
                        {memberTypes.map((item, index) => (
                            <option value={item} key={index}>{item}</option>
                        ))}
                    </MemberRegisterSelect>




                    {/* Personal Information */}
                    <MemberRegisterInput type="text" label="Full Name" register={register} error={errors} name="full_name" isRequired={true} />
                    <MemberRegisterInput type="text" label="Nickname" register={register} error={errors} name="nickname" isRequired={true} />
                    <MemberRegisterInput type="date" label="Date of Birth" register={register} error={errors} name="date_of_birth" isRequired={true} />
                    <MemberRegisterInput type="text" label="National ID" register={register} error={errors} name="nid_number" isRequired={true} />
                    <MemberRegisterInput type="text" label="Contact Number" register={register} error={errors} name="contact_no" isRequired={true} />
                    <MemberRegisterInput type="email" label="Email" register={register} error={errors} name="email" isRequired={true} />
                    <MemberRegisterInput type="text" label="Address" register={register} error={errors} name="address" isRequired={true} />



                    <MemberRegisterInput type="text" label="Profession" register={register} error={errors} name="profession" isRequired={true} />

                    {/* Demographic Information */}
                    <MemberRegisterSelect label="Marital Status" register={register} error={errors} name="status" isRequired={true}>
                        <option value="">Select Marital Status</option>
                        <option value="Married">Married</option>
                        <option value="Unmarried">Unmarried</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Don't say">Don't Say</option>
                    </MemberRegisterSelect>

                    <MemberRegisterSelect label="Gender" register={register} error={errors} name="gender" isRequired={true}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </MemberRegisterSelect>

                    <MemberRegisterSelect label="Religion" register={register} error={errors} name="religion" isRequired={true}>
                        <option value="">Select Religion</option>
                        <option value="Islam">Islam</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Christian">Christian</option>
                        <option value="Buddhism">Buddhism</option>
                        <option value="Other">Other</option>
                    </MemberRegisterSelect>

                    <MemberRegisterSelect label="Blood Group" register={register} error={errors} name="blood_group" isRequired={true}>
                        <option value="">Choose...</option>
                        {bloodGroups.map((item, index) => (
                            <option value={item} key={index}>{item}</option>
                        ))}
                    </MemberRegisterSelect>

                    <MemberRegisterSelect label="Height" register={register} error={errors} name="height" isRequired={true}>
                        <option value="">Select Height</option>
                        {Array.from({ length: 97 }, (_, i) => {
                            const feet = Math.floor(i / 12) + 3;
                            const inches = i % 12;
                            return (
                                <option key={i} value={`${feet} feet ${inches} inches`}>
                                    {feet} feet {inches} inches
                                </option>
                            );
                        })}
                    </MemberRegisterSelect>

                    <MemberRegisterInput type="text" label="Weight (Kg)" register={register} error={errors} name="weight" isRequired={true} />

                    {/* Emergency Contact Information */}
                    <MemberRegisterInput type="text" label="Emergency Contact Name" register={register} error={errors} name="emergency_contact_name" isRequired={true} />
                    <MemberRegisterInput type="text" label="Emergency Contact Number" register={register} error={errors} name="emergency_contact_number" isRequired={true} />

                    {/* Social Media */}
                    <MemberRegisterInput type="text" label="FB ID" register={register} error={errors} name="fb_id" isRequired={true} />
                </div>

                <button type="submit" className="mt-5 bg-yellow-500 border-none rounded-xl w-full text-white px-4 py-2 btn hover:bg-yellow-600">
                    Sign up
                </button>
            </form>

            <ToastContainer />
        </article>
    );
};

export default Signup;