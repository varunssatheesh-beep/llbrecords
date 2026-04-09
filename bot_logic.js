const TELEGRAM_BOT_TOKEN = '8407682206:AAEeuf51gHxmYYANSIkct3pIrDdsoYMItjg'; // Using your existing bot token

const instructions = `
⚖️ *LLB Records Completion Guide* ⚖️
Developed by Varun Satheesh

Welcome to the LLB Records Assistant. Use the commands below to navigate the requirements:

/start - Show this welcome message
/moot - Moot Court Requirements (Participated & Observed)
/court - Court Work & Observation (15 Days)
/pre_trial - Client Interview & Pre-Trial Preparation
/website - Access the Interactive Checklist Website
/contact - Contact Varun or College Office

Use the menu buttons below for quick access!
`;

const moot_info = `
⚖️ *PART 1: MOOT COURT*
-------------------------
1. *Participated Moots (2 Total)*:
   - 9th Semester Moot
   - 10th Semester Moot
   - ~8 pages each. Use FIRAC method.

2. *Judged Moot (1 Total)*:
   - Written as a Judgement.
   - ~8 pages.

3. *Observed Moots (18 Total)*:
   - 4-6 pages each.
   - FIRAC method (Skip "Rules" section).
`;

const court_info = `
🏛️ *PART 2: COURT WORK*
-------------------------
1. *Court Observation (15 Days)*:
   - Maintain a daily log of proceedings.
   - 4 pages per day.

2. *Full Trial Reports (2 Total)*:
   - 1 Civil Case + 1 Criminal Case.
   - Follow from FIR/Plaint to current stage.
   - Separate from daily entries.
`;

const pre_trial_info = `
📋 *PART 3: PRE-TRIAL PREP*
-------------------------
1. *Client Interviews*:
   - 1 Civil + 1 Criminal interview report.

2. *Documents (18 Total)*:
   - 10 Civil Documents (Vakalatnama, Plaint, etc.)
   - 8 Criminal Documents (Bail, Appeal, etc.)
   - Keep originals format, shorten facts.
`;

async function handleUpdate(update) {
    if (!update.message || !update.message.text) return;

    const chatId = update.message.chat.id;
    const text = update.message.text.toLowerCase();

    let responseText = "";
    let replyMarkup = {
        keyboard: [
            [{ text: "⚖️ Moot Court" }, { text: "🏛️ Court Work" }],
            [{ text: "📋 Pre-Trial Prep" }, { text: "🌐 Visit Website" }],
            [{ text: "📞 Contact" }]
        ],
        resize_keyboard: true
    };

    if (text === "/start" || text === "hi" || text === "hello") {
        responseText = instructions;
    } else if (text === "/moot" || text.includes("moot")) {
        responseText = moot_info;
    } else if (text === "/court" || text.includes("court")) {
        responseText = court_info;
    } else if (text === "/pre_trial" || text.includes("pre-trial") || text.includes("prep")) {
        responseText = pre_trial_info;
    } else if (text === "/website" || text.includes("website") || text.includes("link")) {
        responseText = "🌐 Access the interactive checklist here:\nhttps://llbrecordsbcom.varunsatheesh.in";
    } else if (text === "/contact" || text.includes("contact") || text.includes("mail")) {
        responseText = "📧 *Contact Info*:\nMail: finalyearrecords@varunsatheesh.in\nOffice: Mar Gregorios College of Law";
    } else {
        responseText = "I'm sorry, I didn't understand that command. Use the menu below or type /start.";
    }

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: responseText,
            parse_mode: 'Markdown',
            reply_markup: replyMarkup
        })
    });
}

// Since this is a serverless environment/static site setup, 
// normally you'd host this on a Cloudflare Worker using the same domain.
console.log("Chatbot Logic Ready. To activate, set the webhook to this logic.");
