
import { NextResponse } from 'next/server';

// Instructions for the USER to set up their Telegram Bot:
// 1. Open Telegram and search for "BotFather".
// 2. Send "/newbot" to BotFather and follow the steps to create a bot.
// 3. You will get a TOKEN (e.g., "123456789:ABCdefGHIjklMNOpqRstUVwxyZ"). Save this as TELEGRAM_BOT_TOKEN in .env.local
// 4. Open your new bot in Telegram and click "Start".
// 5. To get your Chat ID (so the bot knows who to message):
//    - Search for "userinfobot" in Telegram.
//    - Click "Start". It will reply with your "Id". Save this as TELEGRAM_CHAT_ID in .env.local

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { message } = body;

        // In a real app, these are in process.env
        // For now, we will use placeholders or try to read from env
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            console.warn("Telegram credentials missing. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env.local");
            console.log("Would send to Telegram chat:", chatId);
            console.log("Message:", message);
            // We return success true so the UI doesn't break for the user even if the notification fails server-side due to config
            return NextResponse.json({ success: true, warning: "Credentials missing, logged to console" });
        }

        // Telegram API URL
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown' // Or 'HTML' if you prefer
            }),
        });

        const data = await response.json();

        if (!data.ok) {
            console.error("Telegram API Error:", data);
            throw new Error(data.description || "Failed to send Telegram message");
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Telegram Sending Error:", error);
        return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 });
    }
}
