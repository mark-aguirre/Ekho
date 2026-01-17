export const useAuthClient = () => {
  const config = useRuntimeConfig()
  
  const login = () => {
    const clientId = config.public.googleClientId
    const redirectUri = encodeURIComponent(`${config.public.authOrigin}/api/auth/callback/google`)
    const scope = encodeURIComponent('openid email profile')
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`
    window.location.href = authUrl
  }

  return { login }
}
