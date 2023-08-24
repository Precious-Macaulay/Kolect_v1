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

export default function Details({ searchParams }) {
  const details = searchParams;
  return (
    <div className="h-screen w-screen p-special-m">
      <TitleBar>Customer Details</TitleBar>
      <Table
        aria-label="Example static collection table"
        className="m-special-xl"
      >
        <TableHeader>
          <TableColumn>Customer Name</TableColumn>
          <TableColumn>{`${details.firstName} ${details.lastName}`}</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Phone</TableCell>
            <TableCell>{details.phoneNumber}</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Email</TableCell>
            <TableCell>{details.email}</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Reserved</TableCell>
            <TableCell>{`NGN ${(details.reserved / 100).toFixed(
              2
            )}`}</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>Owed</TableCell>
            <TableCell>{`NGN ${(details.owed / 100).toFixed(2)}`}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
