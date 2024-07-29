"use client";

import React, {useEffect} from "react";
import {PrismaClient} from "@prisma/client";

const accountList = [
    {
        id: 5844277579,
        name: "Ukrainian brand",
        icon: "https://i.imgur.com/yg7csy6.jpeg",
        url: "/account/",
        sessionString: "1AgAOMTQ5LjE1NC4xNjcuNDEBuymBk/TiWOlJw4DhNrzmkxtUwUBT75w27Co7TYCsOp4YZd0cwmOhCTTF2CcArMRCc72S/931Vgktvyg930TCgTUMJMn0efqXcZXz/t5Ikjt/HjIPjcoIxXeGB9zGVLd9K/gYFjkczy8FEux4/Cv157wwFs9udtO/R2j8RbAjga9UP8bdP9a03v2PE+FWtyAUn4OtbE4YxOyGbVYYR9kqwrQFrl7DmNULI/Xlo9eMfcx7vV6jKQivV+YxNJDJLgytil0tYsiQ9LHjy1N7E2Hp9ryx9mSNMM9IQ/HE86UGlM7W6qW7r6PqJKK59u9viiSaqEgDSNJuB+P0oUGJ7wAEy70="
    }
];

const generateAccountLink = (accountId: any) => {
    return `/account/${accountId}`;
};

export default function Home() {
    const prisma = new PrismaClient();
    const [username, setUsername] = React.useState("");
    const [accounts, setAccounts] = React.useState([]);
    // const username2 = request.headers.get('X-User-Username');


    useEffect(() => {
        const getUsername = async () => {
            const response = await fetch('/api/v1/user/me', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            setUsername(data.username);
        }

        const getAccounts = async () => {
            const response = await fetch('/api/v1/telegram/accounts/getAccounts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            // console.log(data);
            // setAccounts(data);
        }

        getUsername();
        getAccounts();
    });

  return (
      <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="w-full max-w-md space-y-6">
              <h1 className="text-2xl font-bold text-center text-white">Привет, {username}!</h1>
              <h2 className="text-xl font-bold text-center text-white">Добро пожаловать, в Arbitrage Shark Messenger</h2>
              <h3 className="text-xl font-bold text-center text-white">Выбери аккаунт:</h3>
              <ul>
                    {accountList.map((account) => (
                        <li key={account.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg shadow-md">
                            <div className="flex items-center space-x-4">
                                <img src={account.icon} alt={account.name} className="w-12 h-12 rounded-full" />
                                <div>
                                    <h4 className="font-bold">{account.name}</h4>
                                    <p className="text-sm text-gray-600">{generateAccountLink(account.id)}</p>
                                </div>
                            </div>
                            <a href={generateAccountLink(account.id)} className="px-4 py-2 text-white bg-blue-500 rounded-lg">Войти</a>
                        </li>
                    ))}
              </ul>
          </div>
      </div>
  );
}
