"use client";
import { IoIosArrowBack } from "react-icons/io";
import { GrAdd } from "react-icons/gr";
import { Avatar, Input, Link } from "@nextui-org/react";
import { BiSearch } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/src/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function Collect() {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState({});

  const router = useRouter();

  // fetch user data from api/user
  // and update user context

  const fetchDoc = async () => {
    const { data } = await axios.get(`/api/user/${user?.uid}`);
    console.log(data);
    setUserData(data);
  };

  const handleClick = (item) => () => {
    const param = new URLSearchParams(item).toString();
    const url = `/dashboard/amount?${param}`;
    router.push(url);
  };
  useEffect(() => {
    fetchDoc();
  }, []);

  return (
    <div className="h-screen w-screen p-special-m">
      <div className="flex justify-between items-center m-special-x">
        <IoIosArrowBack />
        <h1>Collect From</h1>
        <Link href="/dashboard/addcustomer">
          <GrAdd />
        </Link>
      </div>
      <Input
        type="text"
        variant="faded"
        size="lg"
        placeholder="search"
        startContent={<BiSearch />}
        color="#F5F5F5"
        radius="sm"
      />
      {userData?.customers?.map((item) => (
        <div onClick={handleClick(item)} className="bg-white w-full m-special-xl p-special-tiny flex justify-between items-center">
          <div
            className="flex flex-row items-center gap-special"
            
          >
            <Avatar />
            <div>
              <h1 className="small-text">{item.customerName}</h1>
              <p className="light-text small-text">{item.email}</p>
            </div>
          </div>
          <IoIosArrowForward />
        </div>
      ))}
    </div>
  );
}
