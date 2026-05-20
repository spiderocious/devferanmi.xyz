import { NextResponse } from "next/server";
import projects from "../../../data/projects.json";

// Prerendered once at build time; serves the raw projects dataset so LLMs and
// external tools can consume the full project catalogue in one request.
export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(projects, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}
