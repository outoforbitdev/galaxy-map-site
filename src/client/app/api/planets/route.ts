import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    console.log(request)
    const data = await fetch(`${process.env.API_URL}/planets`)
    const planets = await data.json()

    console.log(data)
    console.log(planets)
    
    return new NextResponse(JSON.stringify(planets), {
      status: 200,
    });
  }
  