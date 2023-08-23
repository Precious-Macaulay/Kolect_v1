'use client'
import TitleBar from "../../../components/TitleBar"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Link } from "@nextui-org/react";

export default function Details() {
    return (<div className="h-screen w-screen p-special-m">
        <TitleBar>Customer Details</TitleBar>
        <Table aria-label="Example static collection table" className="m-special-xl">
            <TableHeader>
                <TableColumn>Customer Name</TableColumn>
                <TableColumn>Bola Ahmed</TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow key="1">
                    <TableCell>Phone</TableCell>
                    <TableCell>08162060070</TableCell>
                </TableRow>
                <TableRow key="2">
                    <TableCell>Email</TableCell>
                    <TableCell>bolaahmed@gmail.com</TableCell>
                </TableRow>
                <TableRow key="3">
                    <TableCell>Reservered</TableCell>
                    <TableCell>NGN 900.00</TableCell>
                </TableRow>
                <TableRow key="4">
                    <TableCell>Owed</TableCell>
                    <TableCell>NGN 8009.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>)
}