import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function POST() {
  try {
    const records = await db.insert(advocates).values(advocateData).returning();
    return new Response(JSON.stringify({ advocates: records }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error inserting advocates:", error);
    return new Response(
      JSON.stringify({ error: "Database error", details: error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
