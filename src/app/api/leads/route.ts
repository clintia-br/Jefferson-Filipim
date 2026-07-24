import { NextResponse } from 'next/server'

/**
 * Forwards a lead to the AppSheet-connected spreadsheet. Configured via env
 * vars (APPSHEET_APP_ID, APPSHEET_ACCESS_KEY, APPSHEET_TABLE_NAME) so the
 * AppSheet access key never reaches the client bundle. Unconfigured = no-op
 * (204) — the WhatsApp handoff in BookingModal never depends on this succeeding.
 */
export async function POST(request: Request) {
  const appId = process.env.APPSHEET_APP_ID
  const accessKey = process.env.APPSHEET_ACCESS_KEY
  const tableName = process.env.APPSHEET_TABLE_NAME

  if (!appId || !accessKey || !tableName) {
    return new NextResponse(null, { status: 204 })
  }

  const { nome, whatsapp, caso } = await request.json()

  const response = await fetch(
    `https://api.appsheet.com/api/v2/apps/${appId}/tables/${encodeURIComponent(tableName)}/Action`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ApplicationAccessKey: accessKey,
      },
      body: JSON.stringify({
        Action: 'Add',
        Properties: { Locale: 'pt-BR' },
        Rows: [
          {
            'Data/Hora': new Date().toISOString(),
            Nome: nome,
            WhatsApp: whatsapp,
            'Sobre o caso': caso,
            Origem: 'Site - Formulário',
            Status: 'Novo',
          },
        ],
      }),
    },
  )

  if (!response.ok) {
    return NextResponse.json({ ok: false }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
