"use client";
import { useState } from "react";
import TitleBar from "@/src/components/TitleBar";
import { Input, Button } from "@nextui-org/react";
import Swal from "sweetalert2";
import { arrayUnion } from "firebase/firestore";
import updateData from "../../../firebase/firestore/updateData";
import { useRouter } from 'next/navigation'
import { useAuthContext } from "@/src/context/AuthContext";
import axios from "axios";


export default function AddCustomers() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();
  const { user } = useAuthContext();

  //get current user from firebase

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const params = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      phone: `${phoneNumber}`,
    };
    
    const headers = {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json'
    };
    
   const customerData = await axios.post('https://api.paystack.co/customer', params, { headers })
      .then(response => {
        console.log(response.data)
        return response.data;
      })
      .catch(error => {
        console.error(error);
      });

    const newCustomer = {
      email: email,
      phoneNumber: phoneNumber,
      firstName: firstName,
      lastName: lastName,
      owe: 0,
      reserved: 0,
      customer_code : customerData.customer_code,
      id: customerData.id
    };

    if (email === "" || phoneNumber === "" || firstName === "" || lastName === "") {
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
            type="tel"
            label="Phone number"
            variant="bordered"
            radius="sm"
            className="max-w-xs m-special-x"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
          <Input
            type="text"
            label="First Name"
            variant="bordered"
            radius="sm"
            className="max-w-xs m-special-x"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <Input
            type="text"
            label="Last Name"
            variant="bordered"
            radius="sm"
            className="max-w-xs m-special-x"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
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
