export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const webhookId = getRouterParam(event, 'webhookId')
  const body = await readBody(event)
  
  return {
    id: webhookId,
    status: body.status,
    updated_at: new Date().toISOString()
  }
})
