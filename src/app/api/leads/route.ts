import { NextResponse } from 'next/server'

/**
 * Forwards a lead to the Google Apps Script Web App bound to the leads
 * spreadsheet. Configured via env vars (APPS_SCRIPT_URL, APPS_SCRIPT_TOKEN)
 * so the shared secret never reaches the client bundle. Unconfigured = no-op
 * (204) — the WhatsApp handoff in BookingModal never depends on this succeeding.
 */
export async function POST(request: Request) {
  const scriptUrl = process.env.APPS_SCRIPT_URL
  const token = process.env.APPS_SCRIPT_TOKEN

  if (!scriptUrl || !token) {
    return new NextResponse(null, { status: 204 })
  }

  const { nome, whatsapp, caso } = await request.json()

  const response = await fetch(scriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, nome, whatsapp, caso }),
  })

  if (!response.ok) {
    return NextResponse.json({ ok: false }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
