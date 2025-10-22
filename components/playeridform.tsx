// 'use client'


// import postgres from 'postgres'
// import { timeAgo } from '@/lib/utils'
// import Image from 'next/image'
// import RefreshButton from './refresh-button'
// import { seed } from '@/lib/seed'
// import { useTransition } from 'react'


// export default async function PlayerIDForm() {
//     //   let data
//     //   let startTime = Date.now()

//     //   try {
//     //     data = await sql`SELECT * FROM profiles`
//     //   } catch (e: any) {
//     //     if (e.message.includes('relation "profiles" does not exist')) {
//     //       console.log(
//     //         'Table does not exist, creating and seeding it with dummy data now...'
//     //       )
//     //       // Table is not created yet
//     //       await seed()
//     //       startTime = Date.now()
//     //       data = await sql`SELECT * FROM profiles`
//     //     } else {
//     //       throw e
//     //     }
//     //   }

//     //   const profiles = data
//     //   const duration = Date.now() - startTime

//     // const [isPending, startTransition] = useTransition()

//     // return (
//     //     <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
//     //         <div className="flex justify-between items-center mb-4">
//     //             <div className="space-y-1">
//     //                 <h2 className="text-xl font-semibold">Player ID</h2>
//     //                 <p className="text-sm text-gray-500">

//     //                 </p>
//     //             </div>
//     //             <RefreshButton />
//     //         </div>
//     //         <form className="divide-y divide-gray-900/5 flex justify-between items-center">
//     //             <div>
//     //                 <label htmlFor="PlayerID">Player ID: </label>
//     //                 <input type="text" name="PlayerID" placeholder='#000000000'></input>
//     //             </div>
//     //             <div>
//     //                 <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Find</button>
//     //             </div>
//     //         </form>
//     //     </div>
//     // )
// }

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RefreshButton from './refresh-button'

export default function PlayerIDForm() {
  const [playerID, setPlayerID] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!playerID.trim()) return

    setLoading(true)

    try {
      // Encode the tag safely
      const encodedTag = encodeURIComponent(playerID)

      // Call your API (optional, depending if you want to prefetch)
    //   const res = await fetch(`/api/player?tag=${encodedTag}`)
    //   if (!res.ok) throw new Error('Failed to fetch player')

      // Optionally use the data here
      // const data = await res.json()

      // Navigate to the player details page
      router.push(`/tracker/player?tag=${encodedTag}`)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Player ID</h2>
          <p className="text-sm text-gray-500">Enter your Clash of Clans player tag.</p>
        </div>
        <RefreshButton />
      </div>

      <form
        onSubmit={handleSubmit}
        className="divide-y divide-gray-900/5 flex justify-between items-center"
      >
        <div>
          <label htmlFor="PlayerID">Player ID: </label>
          <input
            type="text"
            name="PlayerID"
            value={playerID}
            onChange={(e) => setPlayerID(e.target.value)}
            placeholder="#000000000"
            className="border border-gray-300 rounded-lg px-2 py-1"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Find'}
          </button>
        </div>
      </form>
    </div>
  )
}
