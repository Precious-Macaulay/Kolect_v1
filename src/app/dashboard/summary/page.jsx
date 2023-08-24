"use client";
import Swal from "sweetalert2";
import TitleBar from "../../../components/TitleBar";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import { useAuthContext } from "@/src/context/AuthContext";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import updateData from "../../../firebase/firestore/updateData";
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Summary({ searchParams }) {
  const customer = searchParams;
  const { user } = useAuthContext();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const fetchDoc = async () => {
    const { data } = await axios.get(`/api/user/${user?.uid}`);
    setUserData(data);
  };

  const handleClick = async () => {
    setLoading(true);

    // create the previous customer data
    let previousCustomerData = () => {
      let data = {};
      userData.customers.forEach((item) => {
        if (item.id === customer.id) {
          data = item;
        }
      });
      return data;
    };

    let newCustomerData = () => {
      let data = {};
      userData?.customers?.forEach((item) => {
        if (item.id === customer.id) {
          data = {
            ...item,
            reserved: eval(`${item.reserved} + ${customer.reserved}`),
            owe: eval(`${item.owe} + ${customer.owe}`),
          };
        }
      });
      return data;
    };
    const prevCustomer = previousCustomerData();
    const newCustomer = newCustomerData();
    const newReserved = eval(`${userData.reserved} + ${customer.reserved}`);
    const newOwed = eval(`${userData.owed} + ${customer.owe}`);

    if (customer.toPay == 0) {
      if (customer.spent != 0) {
        const { result, error } = await updateData("users", user?.uid, {
          reserved: newReserved,
          owed: newOwed,
          customers: arrayRemove(prevCustomer),
        });

        const { result: result2, error: error2 } = await updateData(
          "users",
          user?.uid,
          {
            customers: arrayUnion(newCustomer),
          }
        );

        if (error || error2) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message || error2.message,
          });
          return setLoading(false);
        } else {
          Swal.fire({
            title: "Balance updated",
            icon: "success",
            text: "No payment required",
            confirmButtonText: "OK",
          });
          router.push('/dashboard')
        }
      } else {
        Swal.fire({
          title: "Payment Successful",
          icon: "success",
          text: "No payment required",
          confirmButtonText: "OK",
        });
        router.push('/dashboard')
      }
    } else {
      await axios
        .post("/api/pushpayment", {
          uid: user?.uid,
          terminalId: userData.terminalID,
          customer,
        })
        .then((res) => {
          Swal.fire({
            title: "Payment Successful",
            icon: "success",
            text: res.data.message,
            confirmButtonText: "OK",
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Error Occured",
            icon: "error",
            text: err.response.data.error,
            confirmButtonText: "OK",
          });
        });
    }
  };

  useEffect(() => {
    fetchDoc();
  });
  return (
    <div className="h-screen w-screen p-special-m">
      <TitleBar>Summary</TitleBar>
      <Table
        aria-label="Example static collection table"
        className="m-special-xl"
      >
        <TableHeader>
          <TableColumn>Customer Name</TableColumn>
          <TableColumn>{`${customer.firstName} ${customer.lastName}`}</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>To pay</TableCell>
            <TableCell>{`NGN ${(customer.toPay / 100).toFixed(2)}`}</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Spent</TableCell>
            <TableCell>{`NGN ${(customer.spent / 100).toFixed(2)}`}</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Reservered</TableCell>
            <TableCell>{`NGN ${(customer.reserved / 100).toFixed(
              2
            )}`}</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>Owed</TableCell>
            <TableCell>{`NGN ${(customer.owe / 100).toFixed(2)}`}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button
        onClick={handleClick}
        className="m-special-xl w-full"
        size="lg"
        color="primary"
        auto
      >
        {loading && <Spinner size="md" />}
        Pay
      </Button>
    </div>
  );
}
