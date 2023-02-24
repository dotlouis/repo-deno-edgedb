// @deno-types="../plugin/src/types.d.ts"
import { serve } from 'https://deno.land/std@0.155.0/http/server.ts'
import { createClient } from 'https://deno.land/x/edgedb@v1.0.2/mod.ts'

export const client = createClient({
  dsn: 'edgedb://edgedb:1234@localhost:5656/edgedb',
})

serve(async (req: Request) => {
  if (req.method == 'OPTIONS') {
    return new Response(null, {
      status: 200,
    })
  }

  const url = new URL(req.url)

  if (url.pathname === '/1') {
    await client.query('SELECT 1')
  }

  return new Response(JSON.stringify(`Sucess ${url.pathname}`), {
    status: 200,
  })
})
