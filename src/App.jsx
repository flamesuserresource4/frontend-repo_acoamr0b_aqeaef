import { useEffect, useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import ListingCard from './components/ListingCard'
import OfferSheet from './components/OfferSheet'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState({})
  const [offerOpen, setOfferOpen] = useState(false)
  const [activeListing, setActiveListing] = useState(null)

  const fetchListings = async (params = {}) => {
    setLoading(true)
    const qs = new URLSearchParams()
    if (params.q) qs.set('q', params.q)
    if (params.game) qs.set('game', params.game)
    try {
      const res = await fetch(`${baseUrl}/api/listings?${qs.toString()}`)
      const data = await res.json()
      setItems(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchListings(query) }, [])

  const onSearch = (p) => {
    setQuery(p)
    fetchListings(p)
  }

  const onOffer = (item) => {
    setActiveListing(item)
    setOfferOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <Header onSearchClick={() => {}} />
      <SearchBar onSearch={onSearch} />

      <div className="max-w-md mx-auto p-4 space-y-3">
        {loading ? (
          <div className="text-center text-white/60 py-20">Loading listings...</div>
        ) : items.length === 0 ? (
          <EmptyState onCreateDemo={async () => {
            await seedDemo(baseUrl)
            fetchListings(query)
          }} />
        ) : (
          items.map(item => (
            <ListingCard key={item.id} item={item} onOffer={onOffer} />
          ))
        )}
      </div>

      <OfferSheet open={offerOpen} onClose={() => setOfferOpen(false)} listing={activeListing} onSubmitted={() => fetchListings(query)} />
    </div>
  )
}

function EmptyState({ onCreateDemo }) {
  return (
    <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 text-center">
      <h2 className="text-xl font-semibold">No listings yet</h2>
      <p className="text-white/60 mt-1">Create a few demo cards to get started.</p>
      <button onClick={onCreateDemo} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Create demo listings</button>
    </div>
  )
}

async function seedDemo(baseUrl) {
  const samples = [
    {
      title: '1999 Charizard Holo 4/102',
      game: 'pokemon',
      set_name: 'Base Set',
      year: 1999,
      card_number: '4/102',
      condition: 'NM',
      grade: 'PSA 9',
      price: 899.99,
      for_trade: true,
      owner_name: 'Ash',
      contact: '@ash',
      image_url: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600&auto=format&fit=crop',
      notes: 'Clean copy, strong corners',
    },
    {
      title: '2019 Prizm Zion Williamson RC',
      game: 'sports',
      set_name: 'Panini Prizm',
      year: 2019,
      card_number: '#248',
      condition: 'Raw',
      price: 120.00,
      for_trade: true,
      owner_name: 'Chris',
      contact: '@collector',
      image_url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=600&auto=format&fit=crop',
      notes: 'Centering 60/40',
    },
  ]

  for (const s of samples) {
    await fetch(`${baseUrl}/api/listings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(s)
    })
  }
}

export default App
