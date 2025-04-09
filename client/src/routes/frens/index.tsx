import { authGuard } from '@/lib/viewer/auth0guard';
import { createFileRoute } from '@tanstack/react-router'
import { FrensContainer } from './-components/FrensContainer';

export const Route = createFileRoute('/frens/')({
  component: RouteComponent,
    beforeLoad(ctx) {
      authGuard(ctx);
    },
})

function RouteComponent() {
  return (
    <div>
      <FrensContainer/>
    </div>
  )
}
