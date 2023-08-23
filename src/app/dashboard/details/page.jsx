"use client";
import TitleBar from "../../../components/TitleBar";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export default function Details() {
  const details = useSearchParams();
  return (
    <div className="h-screen w-screen p-special-m">
      <TitleBar>Customer Details</TitleBar>
      <Table
        aria-label="Example static collection table"
        className="m-special-xl"
      >
        <TableHeader>
          <TableColumn>Customer Name</TableColumn>
          <TableColumn>{details.get('customerName')}</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Phone</TableCell>
            <TableCell>{details.get('phoneNumber')}</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Email</TableCell>
            <TableCell>{details.get('email')}</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Reserved</TableCell>
            <TableCell>{`NGN ${(details.get('reserved') / 100).toFixed(
              2
            )}`}</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>Owed</TableCell>
            <TableCell>{`NGN ${(details.get('owed') / 100).toFixed(2)}`}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
