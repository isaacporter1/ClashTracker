'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Tracker() {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag'); // e.g. "#G8CJ02RR"
  const [player, setPlayer] = useState<any>(null);
  const [clan, setClan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tag) return; // wait until tag is ready

    const fetchPlayer = async () => {
      try {
        const res = await fetch(`/api/player?tag=${encodeURIComponent(tag)}`);
        const data = await res.json();
        setPlayer(data);
      } catch (err) {
        console.error('Failed to fetch player', err);
      }
    };
    fetchPlayer();
  }, [tag]);

    //   useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const [playerRes] = await Promise.all([
    //           fetch('/api/player'),
    //         ]);

    //         const playerData = await playerRes.json();

    //         setPlayer(playerData);

    //         const [clanRes] = await P
    //       } catch (error) {
    //         console.error('Error fetching data:', error);
    //       } finally {
    //         setLoading(false);
    //       }
    //     };
    //     fetchData();
    //   }, []);

    useEffect(() => {
        if (!player) return;
        if (!player?.clan?.tag) {
            setLoading(false); // stop loading even if no clan
            return;
        }

        const fetchClan = async () => {
            const res = await fetch(`/api/clans?tag=${encodeURIComponent(player.clan.tag)}`);
            const data = await res.json();
            setClan(data);
            setLoading(false);
        };

        fetchClan();
    }, [player]);


    // if (loading) return <p>Loading Clash of Clans data...</p>;
    if (loading) return null;

    return (
        <div style={{ padding: '1rem' }}>
            <h1>Clash of Clans Tracker</h1>

            {player ? (
                <section>
                    <h2>⚔️ Player Info</h2>
                    <p><strong>Name:</strong> {player.name}</p>
                    <p><strong>Tag:</strong> {player.tag}</p>
                    <p><strong>Town Hall Level:</strong> {player.townHallLevel}</p>
                    <p><strong>Trophies:</strong> {player.trophies}</p>
                    <p><strong>War Stars:</strong> {player.warStars}</p>
                </section>
            ) : (
                <p>Failed to load player data.</p>
            )}
            <br></br>
            {clan ? (
                <section style={{ marginBottom: '2rem' }}>
                    <h2>🏰 Clan Info</h2>
                    <p><strong>Name:</strong> {clan.name}</p>
                    <p><strong>Tag:</strong> {clan.tag}</p>
                    <p><strong>Level:</strong> {clan.clanLevel}</p>
                    <p><strong>Members:</strong> {clan.members}</p>
                </section>
            ) : (
                <p>Failed to load clan data.</p>
            )}
        </div>
    );
}
