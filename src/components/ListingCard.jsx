export default function ListingCard({ item, onOffer }) {
  return (
    <div className="bg-slate-800/60 border border-white/10 rounded-xl p-4 flex gap-4">
      <div className="w-24 h-32 bg-slate-700/50 rounded-lg overflow-hidden flex-shrink-0">
        {item.image_url ? (
          <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-white/40 text-xs">No Image</div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-white font-semibold leading-tight line-clamp-2">{item.title}</h3>
            <p className="text-xs text-blue-300/70 mt-0.5">
              {item.game === 'pokemon' ? 'Pokémon' : 'Sports'}
              {item.set_name ? ` • ${item.set_name}` : ''}
              {item.year ? ` • ${item.year}` : ''}
            </p>
          </div>
          {item.price != null && (
            <div className="text-right">
              <span className="text-emerald-300 font-semibold">${item.price}</span>
            </div>
          )}
        </div>
        {(item.grade || item.condition) && (
          <p className="text-xs text-white/60 mt-1">
            {item.grade ? `${item.grade}` : ''}{item.grade && item.condition ? ' • ' : ''}{item.condition ? `${item.condition}` : ''}
          </p>
        )}
        <div className="flex items-center gap-2 mt-3">
          {item.for_trade && (
            <span className="text-[10px] uppercase tracking-wide text-amber-300 bg-amber-300/10 border border-amber-300/20 px-2 py-0.5 rounded">For Trade</span>
          )}
          <button
            onClick={() => onOffer(item)}
            className="ml-auto text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded"
          >
            Make Offer
          </button>
        </div>
      </div>
    </div>
  )
}
