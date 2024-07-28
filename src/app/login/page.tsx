"use client";

import {FormEvent, useEffect, useState} from 'react';

import { useRouter } from 'next/navigation';
import {loadGetInitialProps} from "next/dist/shared/lib/utils";

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const formData = new FormData(e.currentTarget)
            const response = await fetch('/api/v1/auth/login', {
                method: 'POST',
                body: formData
            })
            if (!response.ok) {
                throw new Error('Неверные учетные данные')
            }

            const data = await response.json()
            localStorage.setItem('token', data.token)
            window.location.href = '/'
        } catch (error) {
            setError("Ошибка")
            // console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
    if (localStorage.getItem('token')) {
        return window.location.href = '/'
    } else {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded shadow-md">
                    <h2 className="text-2xl font-bold text-center text-white">Arbitrage Shark Messenger</h2>
                    {error && <div className="p-2 text-red-600 bg-red-100 rounded">{error}</div>}
                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-400">Логин</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded bg-gray-800 text-white"
                                value={username}
                                id="username"
                                name="username"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400">Пароль</label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded bg-gray-800 text-white"
                                value={password}
                                id="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
                            type="submit" disabled={isLoading}>
                            {isLoading ? 'Запрос...' : 'Войти'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
