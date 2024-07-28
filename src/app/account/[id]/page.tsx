"use client";

import React, {useEffect} from "react";
import { HelloWorld } from "@/app/components/telegram/accounts/chatList/component";

export default function Page({ params }: { params: { id: string }}) {
    const [sessionString, setSessionString] = React.useState("");

    useEffect(() => {
        if (params.id === "5844277579") {
            setSessionString("1AgAOMTQ5LjE1NC4xNjcuNDEBuymBk/TiWOlJw4DhNrzmkxtUwUBT75w27Co7TYCsOp4YZd0cwmOhCTTF2CcArMRCc72S/931Vgktvyg930TCgTUMJMn0efqXcZXz/t5Ikjt/HjIPjcoIxXeGB9zGVLd9K/gYFjkczy8FEux4/Cv157wwFs9udtO/R2j8RbAjga9UP8bdP9a03v2PE+FWtyAUn4OtbE4YxOyGbVYYR9kqwrQFrl7DmNULI/Xlo9eMfcx7vV6jKQivV+YxNJDJLgytil0tYsiQ9LHjy1N7E2Hp9ryx9mSNMM9IQ/HE86UGlM7W6qW7r6PqJKK59u9viiSaqEgDSNJuB+P0oUGJ7wAEy70=")
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