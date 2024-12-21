import { ApiResponse } from "@/types/types";

// const API_ENDPOINT = "/api/gpt4o";
const API_ENDPOINT = "/api/gemini";

export const fetchCharacters = async (
  titleName: string,
  sourceUrl: string,
): Promise<ApiResponse | null> => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titleName, sourceUrl }),
    });

    if (!response.ok) {
      const error_txt = JSON.parse(await response.text())["error"];
      console.error(
        `HTTP error! status: ${response.status} text: ${error_txt}`,
      );
      return null;
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
};
