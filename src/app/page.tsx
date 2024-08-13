"use client";

import React, {useEffect} from "react";
import {PrismaClient} from "@prisma/client";

interface Account {
    telegram_id: string;
    first_name: string;
    username: string;
    // другие свойства
}

const generateAccountLink = (accountId: any) => {
    return `/account/${accountId}`;
};

export default function Home() {
    const prisma = new PrismaClient();
    const [username, setUsername] = React.useState("");
    const [accounts, setAccounts] = React.useState<Account[]>([]);
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
            setAccounts(data);
            console.log(data);
        }

        getUsername();
        getAccounts();
    }, []);

  // @ts-ignore
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
          <div className="w-full max-w-md space-y-6">
              <h1 className="text-2xl font-bold text-center text-white">Привет, {username}!</h1>
              <h2 className="text-xl font-bold text-center text-white">Добро пожаловать, в Arbitrage Shark Messenger</h2>
              <h3 className="text-xl font-bold text-center text-white">Выбери аккаунт:</h3>
              <ul>
                    {accounts.map((account) => (
                        <li key={account.telegram_id} className="flex items-center justify-between mt-5 p-4 bg-gray-900 rounded-lg shadow-md">
                            <div className="flex items-center space-x-4">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/512px-Telegram_logo.svg.png" alt={account.username} className="w-12 h-12 rounded-full" />
                                <div>
                                    <h4 className="font-bold">{account.first_name}</h4>
                                    <p className="text-sm text-gray-600">{generateAccountLink(account.telegram_id)}</p>
                                </div>
                            </div>
                            <a href={generateAccountLink(account.telegram_id)} className="px-4 py-2 text-white bg-blue-500 rounded-lg">Войти</a>
                        </li>
                    ))}
              </ul>
          </div>
      </div>
  );
}
