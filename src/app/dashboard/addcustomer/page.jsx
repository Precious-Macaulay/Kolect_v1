"use client";
import { useState } from "react";
import TitleBar from "@/src/components/TitleBar";
import { Input, Button } from "@nextui-org/react";
import Swal from "sweetalert2";
import { arrayUnion } from "firebase/firestore";
import updateData from "../../../firebase/firestore/updateData";
import { useRouter } from 'next/navigation'
import { useAuthContext } from "@/src/context/AuthContext";

export default function AddCustomers() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const router = useRouter();
  const { user } = useAuthContext();

  //get current user from firebase

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const newCustomer = {
      email: email,
      phoneNumber: phoneNumber,
      customerName: customerName,
      owe: 0,
      reserved: 0,
    };

    if (email === "" || phoneNumber === "" || customerName === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all the fields",
      });
    } else {
      const { result, error } = await updateData("users", user?.uid, {
        customers: arrayUnion(newCustomer),
      });
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong",
        });
        return;
      } else {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Customer added successfully",
        });
        router.push("/dashboard");
      }
    }
  };

  return (
    <div className="w-screen h-screen p-special-m">
      <TitleBar>Add Customers</TitleBar>
      <form onSubmit={handleFormSubmit}>
        <div className="bg-white p-special-m m-special-xl rounded-sm">
          <Input
            type="text"
            label="Email"
            variant="bordered"
            radius="sm"
            className="max-w-xs m-special-x"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            type="number"
            label="Phone number"
            variant="bordered"
            radius="sm"
            className="max-w-xs m-special-x"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
          <Input
            type="text"
            label="Customer Name"
            variant="bordered"
            radius="sm"
            className="max-w-xs m-special-x"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
          />
          <Button
            type="submit"
            className="solid-button w-full h-14 m-special-x"
          >
            Add Customer
          </Button>
        </div>
      </form>
    </div>
  );
}
