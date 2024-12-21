// import { NextResponse } from "next/server";
// import OpenAI from 'openai';
// import { ApiResponse, Character } from "@/types/types";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// export async function POST(req: Request) {
//     try {
//         const {titleName} = await req.json()

//         if (!titleName) {
//             return new NextResponse(JSON.stringify({error: "titleName is required"}), {status: 400})
//         }

//         const prompt = `作品名:${titleName} に登場するキャラクターの名前と誕生日を教えて。詳細な情報は不要で、json形式で、name, birthday のkeyを使ってリストを返してください。`;

//         const chatCompletion = await openai.chat.completions.create({
//             messages: [{ role: 'user', content: prompt }],
//             model: 'gpt-4o',
//             response_format: { type: "json_object" },
//         });

//         const responseText = chatCompletion.choices[0].message.content;
//         if(!responseText) {
//             return new NextResponse(JSON.stringify({ error: "no response from API"}), {status: 500});
//         }
//         const jsonResponse = JSON.parse(responseText)
//         if(!Array.isArray(jsonResponse)) {
//             return new NextResponse(JSON.stringify({ error: "invalid json format from API"}), {status: 500})
//         }
//         const characters : Character[] = jsonResponse.map(item => {
//             if(!item.name || !item.birthday) {
//                 throw new Error('name or birthday is not defined')
//             }
//             return { name: item.name, birthday: item.birthday}
//         })

//         const response: ApiResponse = { title_name: titleName, characters};

//         return new NextResponse(JSON.stringify(response), { status: 200 });

//     } catch (error: any) {
//         console.error("Error during GPT-4o API call:", error);
//         return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
//     }
// }
