'use client'
import TitleBar from "@/src/components/TitleBar";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import reset from '@/src/firebase/auth/reset'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

export default function Reset() {
    const [email, setEmail] = useState('')
    const router = useRouter();

    const handleForm = async () => {
        const { result, error } = await reset(email);

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
            text: 'A password reset link has been sent to your email',
            icon: 'success',
            confirmButtonText: 'Continue'
        })

        return router.push("/login")
    }

    return (<div className='w-screen h-screen p-special-m'>
        <TitleBar>Reset Password</TitleBar>
        <div className="bg-white p-special-m m-special-xl rounded-sm">
            <Input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" label='Email' variant="bordered" radius="sm" className="max-w-xs m-special-x" />
            <Button className="solid-button w-full h-14 m-special-x" onClick={handleForm}
            >Reset</Button>
        </div>
    </div>
    );
}