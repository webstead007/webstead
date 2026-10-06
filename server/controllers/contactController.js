import nodemailer from 'nodemailer'
const clean = (value, max) => typeof value === 'string' ? value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max) : ''
export async function createContact(req, res) {
  const body = req.body || {}
  const name = clean(body.name, 120)
  const email = clean(body.email, 254).toLowerCase()
  const phone = clean(body.phone, 40)
  const service = clean(body.service, 100)
  const budget = clean(body.budget, 80)
  const message = typeof body.message === 'string' ? body.message.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, 5000) : ''
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !service || message.length < 10 || body.privacy !== true) {
    return res.status(400).json({ sent: false, message: 'Please complete the required fields and consent to being contacted.' })
  }
  // The visitor cannot override the server's destination or sender.
  const recipient = process.env.CONTACT_RECEIVER || 'webstead.in@gmail.com'
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('Contact email unavailable: SMTP configuration is incomplete.')
    return res.status(503).json({ sent: false, message: 'Enquiries are temporarily unavailable. Please try again shortly.' })
  }
  const port = Number(process.env.EMAIL_PORT || 587)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, port, secure: port === 465, requireTLS: port !== 465,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_HOST === 'smtp.gmail.com' ? process.env.EMAIL_PASSWORD.replace(/\s/g, '') : process.env.EMAIL_PASSWORD },
    dnsTimeout: 5000, connectionTimeout: 7000, greetingTimeout: 7000, socketTimeout: 15000,
  })
  let deadline
  try {
    const delivery = transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: recipient, replyTo: email, subject: `New Webstead enquiry: ${service}`,
      text: ['New website enquiry', '', `Name: ${name}`, `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`, `Service: ${service}`,
        `Budget: ${budget || 'Please advise'}`, '', 'Project details:', message,
        '', 'The visitor consented to being contacted about this enquiry.'].join('\n'),
    })
    const result = await Promise.race([delivery, new Promise((_, reject) => {
      deadline = setTimeout(() => {
        transporter.close()
        reject(Object.assign(new Error('SMTP deadline exceeded'), { code: 'ETIMEDOUT' }))
      }, 25000)
    })])
    if (!result.accepted?.length || result.rejected?.length) throw new Error('Recipient not accepted')
    return res.status(200).json({ sent: true, message: 'Your enquiry has been sent to Webstead.' })
  } catch (error) {
    console.error('Contact email failed:', error.code || 'SMTP_SEND_FAILED')
    return res.status(502).json({ sent: false, message: 'We could not send your enquiry. Please try again shortly.' })
  } finally { clearTimeout(deadline); transporter.close() }
}
