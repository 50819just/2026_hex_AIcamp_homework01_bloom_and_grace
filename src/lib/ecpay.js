export function submitEcpayCheckoutForm(action, fields) {
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = action

  Object.entries(fields).forEach(([key, value]) => {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = key
    input.value = String(value)
    form.appendChild(input)
  })

  document.body.appendChild(form)
  form.submit()
}
