import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/forgort-password')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/forgort-password"!</div>
}
