'use client'
import DashboardHeader from "@/src/components/DashboardHeader";
import { Button, Link } from "@nextui-org/react";
import { AiOutlineSend } from "react-icons/ai";
import { GoPersonAdd } from "react-icons/go";
import { LiaUsersSolid } from "react-icons/lia";
import { useEffect } from "react";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from 'next/navigation'



export default function Home() {
    const { user } = useAuthContext();
    const router = useRouter()

    useEffect(() => {
        if (user == null) router.push("/login")
    }, [user])

    return (
        <div className="h-screen w-screen p-special-m">
            <DashboardHeader>
                Dashboard
            </DashboardHeader>
            <div className="bg-white w-full m-special-xl rounded-special p-special-m">
                <h6>Owed Funds</h6>
                <p className="amount">NGN 0.00</p>
            </div>
            <div className="bg-white w-full m-special-x rounded-special p-special-m">
                <h6>Reserved Funds</h6>
                <p className="amount">NGN 0.00</p>
            </div>
            <div className="m-special-xl">
                <h6 className="amount">Quick Links</h6>
                <div className="flex w-full justify-between item-center m-special-xl gap-special">
                    <Button as={Link} className="h-60 flex flex-col justify-center items-center quick-link-button">
                        <AiOutlineSend />
                        <p className="quick-link-text">Collect <br /> Payment</p>
                    </Button>
                    <Button as={Link} className="h-60 flex flex-col justify-center items-center quick-link-button">
                        <GoPersonAdd />
                        <p className="quick-link-text">Add <br />Customer</p>
                    </Button>
                    <Button as={Link} className="h-60 flex flex-col justify-center items-center quick-link-button">
                        <LiaUsersSolid />
                        <p className="quick-link-text">Customers</p>
                    </Button>
                </div>
            </div>
            <div className="m-special-xl">
                <h6 className="amount">Recent Transactions</h6>
                <div className="bg-white w-full m-special-xl p-special-tiny flex justify-between items-center">
                    <div><h1 className="amount">NGN 100</h1><p className="light-text">Bola Ahmed</p></div>
                    <div><p className="light-text">11:45pm , Feb 22</p></div>
                </div>
            </div>
        </div>
    )
}