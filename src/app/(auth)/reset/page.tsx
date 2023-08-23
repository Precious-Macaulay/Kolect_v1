'use client'
import TitleBar from "@/src/components/TitleBar";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import reset from '@/src/firebase/auth/reset'

export default function Reset() {
    const [email, setEmail] = useState('')

    const handleForm = async () => {
        const { result, error } = await reset(email);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
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