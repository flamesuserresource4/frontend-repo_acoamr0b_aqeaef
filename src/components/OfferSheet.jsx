import { useState } from 'react'

export default function OfferSheet({ open, onClose, listing, onSubmitted }) {
  const [type, setType] = useState('trade')
  const [offeredValue, setOfferedValue] = useState('')
  const [offeredCard, setOfferedCard] = useState('')
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  if (!open || !listing) return null

  const submit = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/offers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listing_id: listing.id,
          offer_type: type,
          message,
          offered_value: offeredValue ? parseFloat(offeredValue) : null,
          offered_card: offeredCard || null,
          buyer_name: name || null,
          contact: contact || null,
        })
      })
      if (!res.ok) throw new Error('Failed')
      onSubmitted && onSubmitted()
      onClose()
    } catch (e) {
      alert('Could not submit offer')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm flex items-end md:items-center md:justify-center" onClick={onClose}>
      <div className="w-full md:max-w-md bg-slate-900 border border-white/10 rounded-t-2xl md:rounded-2xl p-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold">Offer for {listing.title}</h3>
          <button className="text-white/60 hover:text-white" onClick={onClose}>Close</button>
        </div>

        <div className="mt-3 space-y-3">
          <div className="flex gap-2 text-sm">
            <button onClick={() => setType('trade')} className={`px-3 py-1.5 rounded border ${type==='trade' ? 'bg-blue-500 text-white border-blue-500' : 'text-white/80 border-white/10'}`}>Trade</button>
            <button onClick={() => setType('buy')} className={`px-3 py-1.5 rounded border ${type==='buy' ? 'bg-blue-500 text-white border-blue-500' : 'text-white/80 border-white/10'}`}>Buy</button>
          </div>

          {type === 'buy' ? (
            <div>
              <label className="block text-xs text-white/70 mb-1">Offer Price (USD)</label>
              <input value={offeredValue} onChange={e=>setOfferedValue(e.target.value)} type="number" step="0.01" placeholder="e.g., 120.00" className="w-full bg-slate-800 border border-white/10 rounded p-2 text-white"/>
            </div>
          ) : (
            <div>
              <label className="block text-xs text-white/70 mb-1">Your Card(s) for Trade</label>
              <input value={offeredCard} onChange={e=>setOfferedCard(e.target.value)} placeholder="e.g., PSA 9 Blastoise, 2018 Prizm Luka RC" className="w-full bg-slate-800 border border-white/10 rounded p-2 text-white"/>
            </div>
          )}

          <div>
            <label className="block text-xs text-white/70 mb-1">Message</label>
            <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={3} placeholder="Add any details or questions" className="w-full bg-slate-800 border border-white/10 rounded p-2 text-white"/>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-white/70 mb-1">Your Name</label>
              <input value={name} onChange={e=>setName(e.target.value)} className="w-full bg-slate-800 border border-white/10 rounded p-2 text-white"/>
            </div>
            <div>
              <label className="block text-xs text-white/70 mb-1">Contact</label>
              <input value={contact} onChange={e=>setContact(e.target.value)} placeholder="email or @handle" className="w-full bg-slate-800 border border-white/10 rounded p-2 text-white"/>
            </div>
          </div>

          <button disabled={loading} onClick={submit} className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold py-2 rounded">
            {loading ? 'Submitting...' : 'Submit Offer'}
          </button>
        </div>
      </div>
    </div>
  )
}
