"use client";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Avatar, Input } from "@nextui-org/react";
import { BiSearch } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthContext } from "@/src/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Customers() {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState({});
  const router = useRouter();

  const handleClick = (item) => () => {
    const param = new URLSearchParams(item).toString();
    const url = `/dashboard/details?${param}`;
    router.push(url);
  };

  // fetch user data from api/user
  // and update user context

  const fetchDoc = async () => {
    const { data } = await axios.get(`/api/user/${user?.uid}`);
    setUserData(data);
  };

  useEffect(() => {
    fetchDoc();
  });

  return (
    <div className="h-screen w-screen p-special-m">
      <div className="flex justify-between items-center m-special-x">
        <IoIosArrowBack />
        <h1>Customers</h1>
        <FaFilter />
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
        <div
          key={item.owe}
          className="bg-white w-full m-special-xl p-special-tiny flex justify-between items-center"
        >
          <div
            className="flex flex-row items-center gap-special"
            onClick={handleClick(item)}
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
