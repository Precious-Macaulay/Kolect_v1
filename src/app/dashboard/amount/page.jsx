"use client";
import { Button, Input } from "@nextui-org/react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Amount({ searchParams }) {
  const [spent, setSpent] = useState();
  const [toPay, setToPay] = useState();
  const router = useRouter();

  const customer = searchParams;

  // balance update function check if the customer is owing or has reservered balance and calculates the new owed balance and reserved balance and returns the new customer object
  const balanceUpdate = (customer, spent, toPay) => {
    let owedBalance = customer.owe;
    let reservedBalance = customer.reserved;
    if (spent > toPay && owedBalance >= 0) {
      owedBalance += eval(`${spent} - ${toPay}`);
    } else if (spent < toPay && reservedBalance >= 0) {
      reservedBalance += eval(`${toPay} - ${spent}`);
    }
    return {
      ...customer,
      owe: owedBalance,
      reserved: reservedBalance,
      spent: spent,
      toPay: toPay,
    };
  };
  const handleClick = () => {
    const customerData = balanceUpdate(customer, spent*100, toPay * 100);
    const param = new URLSearchParams(customerData).toString();
    const url = `/dashboard/summary?${param}`;
    router.push(url);
  };

  //function that make sure input amount is not more than 2 decimal places
  const validateInput = (e) => {
    const regex = /^\d*\.?\d{0,2}$/;
    const input = e.target.value;
    if (regex.test(input)) {
      return true;
    } else {
      return false;
    }
  };

  // function that make sure the input amount is always 2 decimal places and add a zero if the input is a whole number
  const formatInput = (e) => {
    const input = e.target.value;
    if (input.includes(".")) {
      const parts = input.split(".");
      if (parts[1].length > 2) {
        e.target.value = `${parts[0]}.${parts[1].slice(0, 2)}`;
      }
    } else {
      e.target.value = `${input}.00`;
    }
  };

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
          onChange={(e) =>
            validateInput(e) && formatInput(e) && setSpent(e.target.value)
          }
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
          onChange={(e) =>
            validateInput(e) && formatInput(e) && setToPay(e.target.value)
          }
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
