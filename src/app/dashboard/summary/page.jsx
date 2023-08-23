'use client'
import TitleBar from "../../../components/TitleBar"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Link } from "@nextui-org/react";

export default function Summary() {

    return (<div className="h-screen w-screen p-special-m">
        <TitleBar>Summary</TitleBar>
        <Table aria-label="Example static collection table" className="m-special-xl">
            <TableHeader>
                <TableColumn>Customer Name</TableColumn>
                <TableColumn>Bola Ahmed</TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow key="1">
                    <TableCell>To pay</TableCell>
                    <TableCell>NGN 700.00</TableCell>
                </TableRow>
                <TableRow key="2">
                    <TableCell>Spent</TableCell>
                    <TableCell>NGN 809.00</TableCell>
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
        <Button as={Link} href="/dashboard/summary" className="m-special-xl w-full" size="lg" color="primary" auto>Pay</Button>
    </div>)
}