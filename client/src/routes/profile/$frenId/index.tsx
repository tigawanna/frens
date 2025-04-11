import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$frenId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/profile/$frenId/inde"!</div>
}
