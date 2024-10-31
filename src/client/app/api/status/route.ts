import { NextResponse } from 'next/server';

export async function GET() {
    const status = {
        "status": "OK",
    }
    
    return new NextResponse(JSON.stringify(status), {
      status: 200,
    });
  }
  