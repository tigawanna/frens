import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod';
import { SignUpCard } from './-components/SignupCard';

const searchparams = z.object({
  returnTo: z.string().default("/"),
});

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
  validateSearch: (search) => searchparams.parse(search),
});

function RouteComponent() {
  return (
    <div className="min-h-screen w-full flex justify-center md:justify-between gap-4 items-center">
      <img
        className="w-full max-w-[40%] hidden sm:flex fixed left-0 inset-y-0 right-[40vw] bottom-0 h-screen object-cover"
        src="/frens.webp"
      />
      <div className="w-full  sm:fixed inset-y-0 left-[20%]  right-0  overflow-auto">
        <div className="w-full   justify-center items-center py-10 flex overflow-auto">
          <SignUpCard />
        </div>
      </div>
    </div>
  );
}
