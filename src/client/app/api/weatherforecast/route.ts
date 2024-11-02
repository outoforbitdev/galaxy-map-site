import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log(request);
  const data = await fetch(`${process.env.API_URL}/weatherforecast`);
  const forecast = await data.json();

  console.log(data);
  console.log(forecast);

  return new NextResponse(JSON.stringify(forecast), {
    status: 200,
  });
}
