import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log(request);
  const data = await fetch(`${process.env.API_URL}/spacelanes`);
  const spacelanes = await data.json();

  // console.log(data);
  // console.log(spacelanes);

  return new NextResponse(JSON.stringify(spacelanes), {
    status: 200,
  });
}
