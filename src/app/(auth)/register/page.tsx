'use client'
import TitleBar from "@/src/components/TitleBar";
import { Input, Button, Link } from "@nextui-org/react";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

export default function Login() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (<div className='w-screen h-screen p-special-m'>
        <TitleBar>Create Account</TitleBar>
        <div className="bg-white p-special-m m-special-xl rounded-sm">
            <Input type="text" label='Email' variant="bordered" radius="sm" className="max-w-xs m-special-x" />
            <Input label='Password' variant="bordered" radius="sm" endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <AiOutlineEye className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <AiOutlineEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                    )}
                </button>
            }
                type={isVisible ? "text" : "password"} className="max-w-xs m-special-x" />
            <Input type="text" label='Business Name' variant="bordered" radius="sm" className="max-w-xs m-special-x" />
            <Input type="text" label='POS Terminal ID' variant="bordered" radius="sm" className="max-w-xs m-special-x" />
            <Button className="solid-button w-full h-14 m-special-x">Create An Account</Button>
        </div>
    </div>
    );
}