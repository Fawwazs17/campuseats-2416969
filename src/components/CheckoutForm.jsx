import { useState } from 'react'

const emptyForm = { name: '', phone: '', pickupTime: '' }

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) {
    errors.name = 'Enter your name.'
  }
  if (!/^01\d{8,9}$/.test(values.phone.replace(/[\s-]/g, ''))) {
    errors.phone = 'Enter a Malaysian mobile number, e.g. 012-345 6789.'
  }
  if (!values.pickupTime) {
    errors.pickupTime = 'Choose a pickup time.'
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

      <label htmlFor="phone">Phone</label>
      <input id="phone" name="phone" type="tel" value={values.phone} onChange={handleChange} />
      {errors.phone && <p className="error">{errors.phone}</p>}

      <label htmlFor="pickupTime">Pickup time</label>
      <input id="pickupTime" name="pickupTime" type="time" value={values.pickupTime} onChange={handleChange} />
      {errors.pickupTime && <p className="error">{errors.pickupTime}</p>}

      <button className="btn" type="submit">Place order</button>
    </form>
  )
}

export default CheckoutForm
