'use client'
import TitleBar from "@/src/components/TitleBar";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useRouter } from 'next/navigation'
import register from '@/src/firebase/auth/register'
import addData from '@/src/firebase/firestore/addData'
import Swal from 'sweetalert2'

export default function Register() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [terminalID, setTerminalID] = useState('')
    const router = useRouter()

    const handleForm = async () => {
        const { result, error } = await register(email, password);

        if (error) {
            return Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Try Again'
            })
        }

        // else successful
        const uid = result?.user?.uid;
        const data = {
            businessName,
            terminalID,
            email
        }
        await addData('users', uid, data)
        Swal.fire({
            title: 'Success!',
            text: 'Your account has been created successfully',
            icon: 'success',
            confirmButtonText: 'Continue'
        })
        return router.push("/dashboard")
    }

    return (<div className='w-screen h-screen p-special-m'>
        <TitleBar>Create Account</TitleBar>
        <div className="bg-white p-special-m m-special-xl rounded-sm">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="text" label='Email' variant="bordered" radius="sm" className="max-w-xs m-special-x" />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} label='Password' variant="bordered" radius="sm" endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <AiOutlineEye className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <AiOutlineEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                    )}
                </button>
            }
                type={isVisible ? "text" : "password"} className="max-w-xs m-special-x" />
            <Input onChange={(e) => {
                setBusinessName(e.target.value)
            }} value={businessName} type="text" label='Business Name' variant="bordered" radius="sm" className="max-w-xs m-special-x" />
            <Input value={terminalID} onChange={(e) => { setTerminalID(e.target.value) }} type="text" label='POS Terminal ID' variant="bordered" radius="sm" className="max-w-xs m-special-x" />
            <Button className="solid-button w-full h-14 m-special-x" onClick={handleForm}>Create An Account</Button>
        </div>
    </div>
    );
}