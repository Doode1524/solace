import { sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "30", 10);
    const searchTerm = url.searchParams.get("searchTerm") || "";
    const offset = (page - 1) * limit;

    let query;

    if (searchTerm) {
      query = db
        .select()
        .from(advocates)
        .where(
          sql`first_name ILIKE ${"%" + searchTerm + "%"}
          OR last_name ILIKE ${"%" + searchTerm + "%"}
          OR city ILIKE ${"%" + searchTerm + "%"}
          OR degree ILIKE ${"%" + searchTerm + "%"}
          OR years_of_experience::text ILIKE ${"%" + searchTerm + "%"}
          OR specialties::text ILIKE ${"%" + searchTerm + "%"}`
        )
        .orderBy(advocates.id)
        .limit(limit)
        .offset(offset);
    } else {
      query = db
        .select()
        .from(advocates)
        .orderBy(advocates.id)
        .limit(limit)
        .offset(offset);
    }

    const data = await query;

    const countQuery = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(advocates)
      .where(
        searchTerm
          ? sql`
            first_name ILIKE ${"%" + searchTerm + "%"}
            OR last_name ILIKE ${"%" + searchTerm + "%"}
            OR city ILIKE ${"%" + searchTerm + "%"}
            OR degree ILIKE ${"%" + searchTerm + "%"}
            OR years_of_experience::text ILIKE ${"%" + searchTerm + "%"}
            OR specialties::text ILIKE ${"%" + searchTerm + "%"}`
          : sql`true`
      );

    const total = countQuery[0]?.count || 0;

    return new Response(JSON.stringify({ data, total }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching advocates:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch advocates" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
