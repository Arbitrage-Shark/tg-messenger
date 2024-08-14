// pages/api/v1/telegram/accounts/getMessages.ts
import {NextApiRequest, NextApiResponse} from 'next';
import {getClient} from '@/app/api/v1/telegram/init/route';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    const {chatId} = req.query;

    if (!chatId) {
        return res.status(400).json({message: 'Chat ID is required'});
    }

    if (Array.isArray(chatId)) {
        return res.status(400).json({message: 'Chat ID should be a string'});
    }

    try {
        const client = await getClient(req.query.id as string);

        if (!client) {
            return res.status(404).json({message: 'Client not found'});
        }

        const messages = await client.getMessages(chatId, {
            limit: 50, // например, получение последних 50 сообщений
        });

        const serializedMessages = messages.map(msg => ({
            id: msg.id,
            text: msg.message,
            date: msg.date,
            senderId: msg.fromId
        }));

        console.log('Messages:', serializedMessages);
        return res.status(200).json(serializedMessages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
}
