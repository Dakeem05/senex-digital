import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore.js'

export default function GuestRoute() {
  const token = useAuthStore((s) => s.token)
  if (token) {
    return <Navigate to="/dashboard" replace />
  }
  return <Outlet />
}
