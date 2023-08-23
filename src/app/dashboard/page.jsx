'use client'
import DashboardHeader from "@/src/components/DashboardHeader";
import { Button, Link } from "@nextui-org/react";
import { AiOutlineSend } from "react-icons/ai";
import { GoPersonAdd } from "react-icons/go";
import { LiaUsersSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from 'next/navigation'
import axios from "axios";



export default function Home() {
    const { user } = useAuthContext();
    const router = useRouter();

    const [userData, setUserData] = useState({});

    // fetch user data from api/user 
    // and update user context

    const fetchDoc = async () => {
        const { data } = await axios.get(`/api/user/${user?.uid}`)
        console.log(data)
        setUserData(data)
    }

    // redirect to login if user is not logged in
    useEffect(() => {

        if (user == null) {
            router.push("/login")
        } else {
            fetchDoc();
        }
    }, [user])

    return (
        <div className="h-screen w-screen p-special-m">
            <DashboardHeader>
                Dashboard
            </DashboardHeader>
            <div className="bg-white w-full m-special-xl rounded-special p-special-m">
                <h6>Owed Funds</h6>
                <p className="amount">{`NGN ${userData?.owed ? (userData?.owed/100).toFixed(2) : `0.00`}`}</p>
            </div>
            <div className="bg-white w-full m-special-x rounded-special p-special-m">
                <h6>Reserved Funds</h6>
                <p className="amount">{`NGN ${userData?.reserved ? (userData?.reserved/100).toFixed(2) : `0.00`}`}</p>
            </div>
            <div className="m-special-xl">
                <h6 className="amount">Quick Links</h6>
                <div className="flex w-full justify-between item-center m-special-xl gap-special">
                    <Button href="/dashboard/collect" as={Link} className="h-60 flex flex-col justify-center items-center quick-link-button">
                        <AiOutlineSend />
                        <p className="quick-link-text">Collect <br /> Payment</p>
                    </Button>
                    <Button href="/dashboard/addcustomer" as={Link} className="h-60 flex flex-col justify-center items-center quick-link-button">
                        <GoPersonAdd />
                        <p className="quick-link-text">Add <br />Customer</p>
                    </Button>
                    <Button href="/dashboard/customers" as={Link} className="h-60 flex flex-col justify-center items-center quick-link-button">
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

function fetchDoc() {
    throw new Error("Function not implemented.");
}
