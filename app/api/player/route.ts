import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');

    if (!tag) return NextResponse.json({ error: 'Missing clan tag' }, { status: 400 });

    console.log(tag);
    const playerTag = encodeURIComponent(tag);




    //const playerTag = '%23GJ992GCRL'; // Example: "#2L8Q2P2Y" becomes "%232L8Q2P2Y" (URL encoded)

    const response = await fetch(`https://api.clashofclans.com/v1/players/${playerTag}`, {
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
