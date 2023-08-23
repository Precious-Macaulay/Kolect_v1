'use client'
import { Button, Input } from "@nextui-org/react"
import Link from "next/link"
import { IoIosArrowBack } from "react-icons/io"

export default function Amount () {
    return (
        <div className="h-screen w-screen p-special-m">
            <IoIosArrowBack />
            <div className="m-special-xl flex flex-col justify-center items-center">
                <h1 className="amount">Amount Spent</h1>
                <Input type="number" placeholder="O.00" variant='underlined' size="lg" className="text-center" />
                <p className="m-special-x">NGN</p>
            </div>
            <div className="m-special-xl flex flex-col justify-center items-center">
                <h1 className="amount">Amount To Pay</h1>
                <Input type="number" placeholder="O.00" variant="underlined" size="lg" />
                <p className="m-special">NGN</p>
            </div>
            <Button as={Link} href="/" className="m-special-xl w-full" color="primary" size="lg" variant="solid">Continue</Button>
        </div>
    )
} 