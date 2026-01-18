export const useAuthClient = () => {
  const config = useRuntimeConfig()
  
  const login = () => {
    if (!config.public.googleClientId) {
      throw new Error('Google Client ID is not configured')
    }
    if (!config.public.authOrigin) {
      throw new Error('Auth origin is not configured')
    }
    
    const clientId = config.public.googleClientId
    const redirectUri = encodeURIComponent(`${config.public.authOrigin}/api/auth/callback/google`)
    const scope = encodeURIComponent('openid email profile')
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`
    window.location.href = authUrl
  }

  return { login }
}
