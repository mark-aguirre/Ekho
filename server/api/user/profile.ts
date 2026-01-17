import { defineEventHandler } from 'h3'
import type { UserProfile } from '~/types/user'

export default defineEventHandler((): UserProfile => {
  return {
    fullName: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
    memberSince: 'Jan 2023',
    verified: true
  }
})
