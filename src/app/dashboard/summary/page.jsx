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

export default function Summary({ searchParams }) {
  const customer = searchParams;
  const handleClick = () => {
   Swal.fire({
      title: "Payment Successful",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

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
        Pay
      </Button>
    </div>
  );
}
