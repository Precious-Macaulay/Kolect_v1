'use client'
import TitleBar from "@/src/components/TitleBar";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Input, Button, Link } from "@nextui-org/react";
import login from '@/src/firebase/auth/login'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'



export default function Login() {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()



    const handleForm = async () => {

        const { result, error } = await login(email, password);

        if (error) {
            return Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error',
                confirmButtonText: 'Try Again'
            })
        }

        // else successful
        Swal.fire({
            title: 'Success!',
            text: 'You have logged in successfully',
            icon: 'success',
            confirmButtonText: 'Continue'
        })
        
        return router.push("/dashboard")
    }

    return (<div className='w-screen h-screen p-special-m'>
        <TitleBar>Login</TitleBar>
        <div className="bg-white p-special-m m-special-xl rounded-sm">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="text" label='Email' variant="bordered" radius="sm" className=" m-special-x" />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} label='Password' variant="bordered" radius="sm" endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <AiOutlineEye className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <AiOutlineEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                    )}
                </button>
            }
                type={isVisible ? "text" : "password"} className="m-special-x" />

            <Button className="solid-button w-full h-14 m-special-x" onClick={handleForm}>Log in</Button>
            <hr className="m-special-x" />
            <Link href="/reset" className="w-full items-center">Reset Password</Link>
        </div>
    </div>
    );
}