export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const webhookId = getRouterParam(event, 'webhookId')
  
  return {
    success: true,
    status_code: 200,
    message: 'Test payload sent successfully'
  }
})
