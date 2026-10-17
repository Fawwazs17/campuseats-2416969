function VendorCard() {
  const vendor = {
    name: 'Kedai Ayam Gunting',
    location: 'Mahallah Zubair',
    openHours: '11:00 am - 11:00 pm',
    isOpen: true,
  }

  return (
    <article className="card vendor-card">
      <div className="thumb" aria-hidden="true">
        {vendor.name.charAt(0)}
      </div>
      <div>
        <h2>{vendor.name}</h2>
        <p className="muted">{vendor.location}</p>
        <p className="muted">Open: {vendor.openHours}</p>
        <span className={vendor.isOpen ? 'status open' : 'status closed'}>
          {vendor.isOpen ? 'Open now' : 'Closed'}
        </span>
      </div>
    </article>
  )
}

export default VendorCard
