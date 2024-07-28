// src/pages/api/accounts/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';

// Пример данных аккаунтов
const accounts = [
    { id: 1, username: 'user1', email: 'user1@example.com' },
    { id: 2, username: 'user2', email: 'user2@example.com' },
    // Добавьте больше аккаунтов по мере необходимости
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const account = accounts.find((acc) => acc.id.toString() === id);

    if (account) {
        res.status(200).json(account);
    } else {
        res.status(404).json({ message: 'Аккаунт не найден' });
    }
}
