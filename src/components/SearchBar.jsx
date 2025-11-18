import { useState } from 'react'

export default function SearchBar({ onSearch, onFilter }) {
  const [q, setQ] = useState('')
  const [game, setGame] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch && onSearch({ q, game })
  }

  return (
    <form onSubmit={submit} className="sticky top-[56px] z-10 bg-slate-900/80 backdrop-blur border-b border-white/10">
      <div className="max-w-md mx-auto p-3 flex gap-2">
        <input
          value={q}
          onChange={e=>setQ(e.target.value)}
          placeholder="Search cards, sets, players..."
          className="flex-1 bg-slate-800/80 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/40"
        />
        <select value={game} onChange={e=>setGame(e.target.value)} className="bg-slate-800/80 border border-white/10 rounded-lg px-2 py-2 text-white">
          <option value="">All</option>
          <option value="pokemon">Pokémon</option>
          <option value="sports">Sports</option>
        </select>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-lg">Go</button>
      </div>
    </form>
  )
}
