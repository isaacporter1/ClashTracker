import { NextResponse } from 'next/server';

export async function GET() {
  const clanTag = '%23G8CJ02RR'; // Example: "#2L8Q2P2Y" becomes "%232L8Q2P2Y" (URL encoded)
  
  const response = await fetch(`https://api.clashofclans.com/v1/clans/${clanTag}/currentwar`, {
    headers: {
      Authorization: `Bearer ${process.env.COC_API_TOKEN}`,
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch clan data' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
