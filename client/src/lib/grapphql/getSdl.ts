import "dotenv/config";
import fs from "fs/promises";

export async function getSdl() {
  try {
    const apiUrl = process.env.VITE_API_URL;
    const res = await fetch(`${apiUrl}/sdl`);
    if (!res.ok) {
      throw new Error("Failed to fetch SDL");
    }
    const sdl = await res.text();
    await fs.writeFile("./schema.graphql", sdl);
    console.log("✅ SDL fetched and saved to schema.graphql");
  } catch (error) {
    console.error("Error fetching SDL: === ", error);
  }
}

getSdl()
