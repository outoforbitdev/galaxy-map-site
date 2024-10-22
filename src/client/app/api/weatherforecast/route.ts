import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    console.log(request)
    const data = await fetch('http://127.0.0.1:8080/weatherforecast')
    const forecast = await data.json()

    console.log(data)
    console.log(forecast)
    
    return new NextResponse(JSON.stringify(forecast), {
      status: 200,
    });
  }
  