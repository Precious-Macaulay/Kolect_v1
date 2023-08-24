"use client";
import { Button, Input } from "@nextui-org/react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Amount({ searchParams }) {
  const [spent, setSpent] = useState();
  const [toPay, setToPay] = useState();
  const router = useRouter();

  const customer = searchParams;

  // balance update function check if the customer is owing or has reservered balance and calculates the new owed balance and reserved balance and returns the new customer object
  const balanceUpdate = (customer, spent, toPay) => {
    let owedBalance = customer.owe;
    let reservedBalance = customer.reserved;
    console.log(owedBalance, reservedBalance);
    if (spent > toPay && owedBalance >= 0) {
      owedBalance += (spent - toPay) * 100;
    } else if (spent < toPay && reservedBalance >= 0) {
      reservedBalance += (toPay - spent) * 100;
    }
    return {
      ...customer,
      owe: owedBalance,
      reserved: reservedBalance,
      spent: spent * 100,
      toPay: toPay * 100,
    };
  };
  const handleClick = () => {
    const validation = validateInput(spent) && validateInput(toPay);
    if (!validation) {
      Swal.fire({
        title: "Invalid Input",
        text: "Please enter a valid amount",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    } else {
      const customerData = balanceUpdate(customer, spent, toPay);
      const param = new URLSearchParams(customerData).toString();
      const url = `/dashboard/summary?${param}`;
      router.push(url);
    }
  };

  //function that make sure input amount is not more than 2 decimal places
  const validateInput = (input) => {
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(input)) {
      return true;
    } else {
      return false;
    }
  };

  // //function that convert the amount to kobo even if the user enters in naira
  // const convertToKobo = (amount) => {
  //   return amount * 100;
  // };

  return (
    <div className="h-screen w-screen p-special-m">
      <IoIosArrowBack />
      <div className="m-special-xl flex flex-col justify-center items-center">
        <h1 className="amount">Amount Spent</h1>
        <Input
          type="number"
          placeholder="0.00"
          variant="underlined"
          size="lg"
          className="text-center"
          value={spent}
          onChange={(e) => setSpent(e.target.value)}
        />
        <p className="m-special-x">NGN</p>
      </div>
      <div className="m-special-xl flex flex-col justify-center items-center">
        <h1 className="amount">Amount To Pay</h1>
        <Input
          type="number"
          placeholder="0.00"
          variant="underlined"
          size="lg"
          className="text-center"
          value={toPay}
          onChange={(e) => setToPay(e.target.value)}
        />
        <p className="m-special">NGN</p>
      </div>
      <Button
        className="m-special-xl w-full"
        color="primary"
        size="lg"
        variant="solid"
        onClick={handleClick}
      >
        Continue
      </Button>
    </div>
  );
}
