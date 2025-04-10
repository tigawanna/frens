import { createFileRoute } from '@tanstack/react-router'
import { ListAllUsers } from './-components/ListAllUsers'

export const Route = createFileRoute('/admin/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center gap-3">
      <ListAllUsers />
    </div>
  )
}
