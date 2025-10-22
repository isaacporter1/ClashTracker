import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  //const clanTag = '%23G8CJ02RR'; // Example: "#2L8Q2P2Y" becomes "%232L8Q2P2Y" (URL encoded)

  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');

  if (!tag) {
    return NextResponse.json({ error: 'Missing tag parameter' }, { status: 400 });
  }

  const clanTag = encodeURIComponent(tag);
  console.log(tag);
  
  const response = await fetch(`https://api.clashofclans.com/v1/clans/${clanTag}`, {
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
