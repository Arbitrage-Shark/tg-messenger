"use client";

import React, {useEffect} from "react";

interface Chat {
    id: string;
    title: string;
}

interface Message {
    id: string;
    text: string;
    date: string;
    senderId: string;
}

export default function Page({ params }: { params: { id: string } }) {

    const [accounts, setAccounts] = React.useState<Chat[]>([]);
    const [messeges, setMesseges] = React.useState<Message[]>([]);
    useEffect(() => {
        const getChats = async () => {
            const response = await fetch(`/api/v1/telegram/accounts/getChats?id=${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setAccounts(data);
        }

        const getMesseges = async () => {
            const chatId = "445948686";
            const response = await fetch(`/api/v1/telegram/accounts/getMessages?chatId=${chatId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
            // const data = await response.json();
            // setMesseges(data);
        }

        getChats().then();
        getMesseges().then();
    }, [accounts, params.id]);


    return (
        <div>
            {/*<h1>Session string: {session_string}</h1>*/}
            <h2>Account: {params.id}</h2>
            <ul>
                {accounts.map((account) => (
                    <li key={account.id}>
                        <a href={`/account/${account.id}`}>{account.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
