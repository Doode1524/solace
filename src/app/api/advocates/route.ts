import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET() {
  try {
    const data = await db.select().from(advocates);

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching advocates:", error);

    return new Response(
      JSON.stringify({ error: "Failed to fetch advocates" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
