import { getClient } from "@/app/api/v1/telegram/init/route";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({ message: "ID is required" }, { status: 400 });
  }

  try {
    const client = await getClient(id);

    if (!client) {
      return Response.json({ message: "Client not found" }, { status: 404 });
    }

    const dialogs = await client.getDialogs();

    const dialogsData = dialogs.map((dialog) => ({
      id: dialog.id,
      title: dialog.title,
    }));

    return new Response(JSON.stringify(dialogsData), { status: 200 });
  } catch (e) {
    console.error(e);
    return Response.json({ message: "Ошибка сервера" + e }, { status: 500 });
  }
}
