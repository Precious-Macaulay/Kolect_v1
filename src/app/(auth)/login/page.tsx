'use client'
import TitleBar from "@/src/components/TitleBar";
import { useState } from "react";
import { AiOutlineEyeInvisible , AiOutlineEye } from "react-icons/ai";
import { Input, Button, Link } from "@nextui-org/react";


export default function Login() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
  
    return (<div className='w-screen h-screen p-special-m'>
        <TitleBar>Login</TitleBar>
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
                
            <Button className="solid-button w-full h-14 m-special-x">Log in</Button>
        <hr className="m-special-x"/>
        <Link href="/reset" className="w-full items-center">Reset Password</Link>
        </div>
    </div>
    );
}