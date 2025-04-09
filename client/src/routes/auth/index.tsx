import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod';
import { LoginCard } from './-components/Login';
const searchparams = z.object({
  returnTo: z.string(),
});

export const Route = createFileRoute("/auth/")({
  validateSearch: (search) => searchparams.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  return <div className='min-h-screen w-full flex justify-center items-center'>
    <LoginCard />
  </div>
}
