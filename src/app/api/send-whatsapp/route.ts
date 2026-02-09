
import { NextResponse } from 'next/server';
import twilio from 'twilio';

// NOTE: These should ideally be in environment variables
// For this specific user request, we will hardcode the credentials for the "CallMeBot" style free service 
// OR use Twilio's sandbox for free testing if the user has accounts.
// However, since the user asked for "some kind of api" and avoiding the user's own whatsapp,
// the best FREE, NO-SETUP way for a developer to getting started is often sending to THEMSELVES via a bot.
// But for a REAL order to the OWNER, we need a business api or a paid service.

// Strategy: We will use the 'callmebot' free API key approach as it is the easiest "free" way for a single receiver (the owner).
// The owner needs to set this up once. 
// Since I cannot set up the owner's phone for them, I will provide the code structure 
// that tries to use a generic free gateway if available, or defaults to a console log / mock success for now
// while instructing the user on how to get the key.

// ACTUALLY, checking the constraints: "not throu the user whats app". 
// This means we need a server-side send. 
// Twilio is the industry standard for this. I installed twilio. 
// I will set up a route that uses Twilio. Even if we don't have keys yet, it's the professional way.

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { message, phone } = body;

        // In a real app, these are in process.env
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromNumber = process.env.TWILIO_FROM_NUMBER; // WhatsApp sandbox number

        if (!accountSid || !authToken || !fromNumber) {
            console.warn("Twilio credentials missing. Logging message instead.");
            console.log("Would send to:", phone);
            console.log("Message:", message);
            return NextResponse.json({ success: true, warning: "Credentials missing, logged to console" });
        }

        const client = twilio(accountSid, authToken);

        await client.messages.create({
            from: `whatsapp:${fromNumber}`,
            to: `whatsapp:${phone}`,
            body: message
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Twilio Error:", error);
        return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 });
    }
}
