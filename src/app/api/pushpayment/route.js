import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    console.log("Received request:", request);
    
    const req = await request.json();
    console.log("Request JSON:", req);

    const data = {
      customer: req.customer.customer_code,
      description: "Payment",
      amount: req.customer.toPay,
    };

    console.log("Data:", data);

    const config = {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      "https://api.paystack.co/paymentrequest",
      data,
      config
    );

    const invoiceData = response.data;
    console.log("Invoice Data:", invoiceData);

    const terminal = await axios.get(
      `https://api.paystack.co/terminal/${req.terminalId}/presence`,
      config
    );

    const terminalData = terminal.data;
    console.log("Terminal Data:", terminalData);

    if (terminalData.online && terminalData.available) {
      let pushData = {
        type: "invoice",
        action: "process",
        data: {
          id: invoiceData.id,
          reference: invoiceData.offline_reference,
        },
      };

      const pushToTerminal = await axios.post(
        `https://api.paystack.co/terminal/${req.terminalId}/event`,
        pushData,
        config
      );

      console.log("Push to Terminal:", pushToTerminal.data);

      if (pushToTerminal.status) {
        const verify = await axios.get(
          `https://api.paystack.co/terminal/${req.terminalId}/event/${pushToTerminal.data.id}`
        );

        console.log("Verification Data:", verify.data);

        if (verify.data.delivered) {
          return NextResponse.json({ message: "Invoice sent, complete payment in terminal" });
        } else {
          return NextResponse.json({ message: "Invoice sent, but payment not completed in terminal" });
        }
      } else {
        return NextResponse.json({ message: "Failed to push invoice to terminal" });
      }
    } else {
      return NextResponse.json({ message: "Terminal is not available or online" });
    }

  } catch (error) {
    console.error("something messed up",error.response.data.message,);
    return NextResponse.json({ message: "An error occurred during payment processing" });
  }
}
