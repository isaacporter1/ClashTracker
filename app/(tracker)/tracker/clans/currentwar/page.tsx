'use client';
import { useEffect, useState } from 'react';

export default function Tracker() {
  const [clanCurrentWar, setClanCurrentWar] = useState<any>(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchClan = async () => {
      const res = await fetch('/api/clans/currentwar');
      const data = await res.json();
      setClanCurrentWar(data);
      setLoading(false);
    };
    fetchClan();
  }, []);

  if (loading) return <p>Loading clan data...</p>;
  if (!clanCurrentWar) return <p>Failed to load data.</p>;


  if (loading) return <p>Loading Clash of Clans data...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Clash of Clans Tracker</h1>

      {clanCurrentWar ? (
        <section style={{ marginBottom: '2rem' }}>
          <h2>🏰 Clan Info</h2>
          <p><strong>Name:</strong> {clanCurrentWar.opponent?.name}</p>
        </section>
      ) : (
        <p>Failed to load clan current war data.</p>
      )}
    </div>
  );
}


// 'use client';
// import { useEffect, useState } from 'react';

// export default function Tracker() {
//   const [clan, setClan] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchClan = async () => {
//       const res = await fetch('/api/clan');
//       const data = await res.json();
//       setClan(data);
//       setLoading(false);
//     };
//     fetchClan();
//   }, []);

//   if (loading) return <p>Loading clan data...</p>;
//   if (!clan) return <p>Failed to load data.</p>;

//   return (
//     <div>
//       <h1>{clan.name}</h1>
//       <p>Tag: {clan.tag}</p>
//       <p>Members: {clan.members}</p>
//       <p>Level: {clan.clanLevel}</p>
//       <p>Description: {clan.description}</p>
//     </div>
//   );
// }
