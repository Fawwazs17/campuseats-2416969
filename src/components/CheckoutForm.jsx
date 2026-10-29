import { useState } from 'react'

const MAHALLAHS = ['Ali', 'Aminah', 'Faruq', 'Asiah', 'Bilal', 'Hafsa', 'Uthman', 'Zubair']

const emptyForm = { name: '', mahallah: '', pickupTime: '' }

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters.'
  }
  if (!values.mahallah) {
    errors.mahallah = 'Choose your mahallah.'
  }
  if (!values.pickupTime) {
    errors.pickupTime = 'Choose a pickup time.'
  } else if (values.pickupTime < '07:00' || values.pickupTime > '22:00') {
    // "HH:MM" strings compare correctly as text
    errors.pickupTime = 'Pickup time must be between 07:00 and 22:00.'
  }
  return errors
}

function CheckoutForm({ onPlaceOrder }) {
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault() // stop the browser reloading the page
    const newErrors = validate(values)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    onPlaceOrder(values)
    setValues(emptyForm)
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit} noValidate>
      <h3>Checkout</h3>

      <label htmlFor="name">Name</label>
      <input id="name" name="name" value={values.name} onChange={handleChange} />
      {errors.name && <p className="error">{errors.name}</p>}

      <label htmlFor="mahallah">Mahallah</label>
      <select id="mahallah" name="mahallah" value={values.mahallah} onChange={handleChange}>
        <option value="">Choose…</option>
        {MAHALLAHS.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      {errors.mahallah && <p className="error">{errors.mahallah}</p>}

      <label htmlFor="pickupTime">Pickup time</label>
      <input
        id="pickupTime"
        name="pickupTime"
        type="time"
        min="07:00"
        max="22:00"
        value={values.pickupTime}
        onChange={handleChange}
      />
      {errors.pickupTime && <p className="error">{errors.pickupTime}</p>}

      <button className="btn" type="submit">Place order</button>
    </form>
  )
}

export default CheckoutForm
