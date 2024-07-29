"use client";

import React, {useEffect} from "react";
import { HelloWorld } from "@/app/components/telegram/accounts/chatList/component";
import {PrismaClient} from "@prisma/client";

export default function Page({ params }: { params: { id: string }}) {
    const prisma = new PrismaClient();

    const [sessionString, setSessionString] = React.useState("");

    useEffect(() => {
        if (params.id === "5844277579") {
            setSessionString("123")
        }
    }, [params.id]);
    return (
        <div>
            <h1>Session string: {sessionString}</h1>
            <h2>Account: {params.id}</h2>
            <HelloWorld />
        </div>
    )
}