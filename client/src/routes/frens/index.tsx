import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/frens/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/frens/"!</div>
}
