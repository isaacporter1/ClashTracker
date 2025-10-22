'use client';
import { useEffect, useState } from 'react';

export default function Tracker() {
  const [clan, setClan] = useState<any>(null);
  const [player, setPlayer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clanRes, playerRes] = await Promise.all([
          fetch('/api/clans'),
          fetch('/api/player'),
        ]);

        const clanData = await clanRes.json();
        const playerData = await playerRes.json();

        setClan(clanData);
        setPlayer(playerData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading Clash of Clans data...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Clash of Clans Tracker</h1>

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
    </div>
  );
}
