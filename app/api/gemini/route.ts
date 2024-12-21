import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

import { ApiResponse, Character } from "@/types/types";

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genai.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  generationConfig: { responseMimeType: "application/json" },
});

export async function POST(req: Request) {
  try {
    const { titleName, sourceUrl } = await req.json();
    if (!titleName) {
      return new NextResponse(
        JSON.stringify({ error: "titleName is required" }),
        { status: 400 },
      );
    }

    let prompt = "";
    if (sourceUrl) {
      prompt += `${sourceUrl}のサイト内コンテンツから`;
    }
    prompt += `${titleName}に所属もしくは登場する人物やキャラクター(メンバー)の誕生日を教えてください。詳細な情報は不要で、name, birthday をkeyとするJSON形式でリストを返してください。誕生日は、"MM/DD"形式とし、わからないものに関しては、"-"を入れてください。つまり、出力は以下の通りになります。"[{"name": "character's name", "birthday": "01/02"}]"`;

    const result = await model.generateContent(prompt);

    const responseText = result.response.text();
    if (!responseText) {
      return new NextResponse(
        JSON.stringify({ error: "no response from API" }),
        { status: 500 },
      );
    }
    console.log(responseText);
    const jsonResponse = JSON.parse(responseText);
    if (!Array.isArray(jsonResponse)) {
      return new NextResponse(
        JSON.stringify({ error: "invalid json format from API" }),
        { status: 500 },
      );
    }
    const characters: Character[] = jsonResponse.map((item) => {
      if (!item.name || !item.birthday) {
        throw new Error("name or birthday is not defined");
      }
      return { name: item.name, birthday: item.birthday, description: "" };
    });

    const response: ApiResponse = { title_name: titleName, characters };

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error: any) {
    console.error("Error during Gemini API call:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
