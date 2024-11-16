import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = await fetch(`${process.env.API_URL}/weatherforecast`);
  const forecast = await data.json();

  return new NextResponse(JSON.stringify(forecast), {
    status: 200,
  });
}
