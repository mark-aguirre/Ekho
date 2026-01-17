export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const code = query.code as string

  if (!code) {
    return sendRedirect(event, '/')
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await $fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      body: {
        code,
        client_id: config.public.googleClientId,
        client_secret: config.googleClientSecret,
        redirect_uri: `${config.public.authOrigin}/api/auth/callback/google`,
        grant_type: 'authorization_code'
      }
    })

    // Get user info
    const userInfo = await $fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenResponse.access_token}`
      }
    })

    // Store user in session/cookie
    setCookie(event, 'user', JSON.stringify({
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture
    }), {
      httpOnly: false,
      secure: false,
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return sendRedirect(event, '/dashboard')
  } catch (error) {
    console.error('Auth error:', error)
    return sendRedirect(event, '/')
  }
})

