import type { CreateWebhookInput, Webhook } from '@@/types/repository'

export default defineEventHandler(async (event): Promise<Webhook> => {
  const id = getRouterParam(event, 'id')
  const body = await readBody<CreateWebhookInput>(event)

  // Validate required fields
  if (!body.name || !body.url || !body.events || body.events.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields'
    })
  }

  // Validate URL format
  try {
    new URL(body.url)
  } catch {
    throw createError({
      statusCode: 400,
      message: 'Invalid URL format'
    })
  }

  // Create webhook (mock implementation - replace with actual database logic)
  const webhook: Webhook = {
    id: `webhook-${Date.now()}`,
    repository_id: id!,
    name: body.name,
    url: body.url,
    events: body.events,
    status: body.status,
    last_status: 'pending',
    delivery_logs: []
  }

  return webhook
})
