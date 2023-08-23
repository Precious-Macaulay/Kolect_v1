'use client'
import TitleBar from "@/src/components/TitleBar";
import { Input, Button } from "@nextui-org/react";


export default function Reset() {
    return (<div className='w-screen h-screen p-special-m'>
        <TitleBar>Reset Password</TitleBar>
        <div className="bg-white p-special-m m-special-xl rounded-sm">
            <Input type="text" label='Email' variant="bordered" radius="sm" className="max-w-xs m-special-x" />
            <Button className="solid-button w-full h-14 m-special-x">Reset</Button>
        </div>
    </div>
    );
}