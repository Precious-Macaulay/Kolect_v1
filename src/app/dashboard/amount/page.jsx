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
      owedBalance += spent - toPay;
    } else if (spent < toPay && reservedBalance >= 0) {
      reservedBalance += toPay - spent;
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
    const customerData = balanceUpdate(customer, spent, toPay);
    const param = new URLSearchParams(customerData).toString();
    const url = `/dashboard/summary?${param}`;
    router.push(url);
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
