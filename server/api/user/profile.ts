import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  return {
    fullName: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
    memberSince: 'Jan 2023',
    verified: true
  }
})
