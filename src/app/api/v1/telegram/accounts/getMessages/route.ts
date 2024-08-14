// pages/api/v1/telegram/accounts/getMessages.ts
import { getClient } from "@/app/api/v1/telegram/init/route";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get("chatId");
  const accountId = searchParams.get("accountId");

  if (!chatId) {
    return NextResponse.json(
      { message: "Chat ID is required" },
      { status: 400 }
    );
  }

  if (Array.isArray(chatId)) {
    return NextResponse.json(
      { message: "Chat ID should be a string" },
      { status: 400 }
    );
  }

  try {
    const client = await getClient(accountId as string);

    if (!client) {
      return NextResponse.json(
        { message: "Client not found" },
        { status: 404 }
      );
    }

    const messages = await client.getMessages(chatId, {
      limit: 50, // например, получение последних 50 сообщений
    });

    const serializedMessages = messages.map((msg) => ({
      id: msg.id,
      text: msg.message,
      date: msg.date,
      senderId: msg.fromId,
    }));

    console.log("Messages:", serializedMessages);
    return NextResponse.json(serializedMessages, { status: 200 });
  } catch (error) {
    console.error("Error retrieving messages:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
