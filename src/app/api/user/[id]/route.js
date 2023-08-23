import getDocument from "@/src/firebase/firestore/getData";
import { NextResponse } from 'next/server'


export async function GET(request, {params}) {
    const {id} = params;

    const user = await getDocument('users', id);
    console.log(user);

    return NextResponse.json(user.result);
}