import { Menu, Search } from 'lucide-react'

export default function Header({ onSearchClick }) {
  return (
    <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur border-b border-white/10">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <button className="p-2 rounded-lg hover:bg-white/5 active:bg-white/10 text-white/80">
          <Menu size={22} />
        </button>
        <div className="text-center">
          <h1 className="text-white font-semibold tracking-tight">CardTrader</h1>
          <p className="text-xs text-blue-300/70">Sports & Pokémon Marketplace</p>
        </div>
        <button onClick={onSearchClick} className="p-2 rounded-lg hover:bg-white/5 active:bg-white/10 text-white/80">
          <Search size={22} />
        </button>
      </div>
    </div>
  )
}
