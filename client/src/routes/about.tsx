import { MainDrawer } from "@/components/navigation/drawer/MainDrawer";
import { MainDrawerFooter } from "@/components/navigation/drawer/MainDrawerFooter";
import { MainDrawerLinks } from "@/components/navigation/drawer/MainDrawerLinks";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/shadcn/ui/button";
import { Users, MessageCircle, Heart, Compass } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <MainDrawer links={<MainDrawerLinks />} footer={<MainDrawerFooter />}>
      <div className="min-h-screen w-full flex flex-col items-center px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Welcome to Frens
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              A cozy space to connect with fellow frens
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-left">
            <Link to="/profile/explore">
              <FeatureCard
                icon={<Users className="h-8 w-8 text-primary" />}
                title="Find Your Circle"
                description="Connect with friends and discover new people with shared interests"
              />
            </Link>
            <Link to="/">
              <FeatureCard
                icon={<MessageCircle className="h-8 w-8 text-primary" />}
                title="Share What some wisdom"
                description="Post updates, photos, and experiences with your close community"
              />
            </Link>
            <Link to="/">
              <FeatureCard
                icon={<Heart className="h-8 w-8 text-primary" />}
                title="Genuine Connections"
                description="No algorithms, no ads—just authentic social interactions"
              />
            </Link>
            <Link to="/">
              <FeatureCard
                icon={<Compass className="h-8 w-8 text-primary" />}
                title="Explore Your Way"
                description="Personalize your experience and discover content you care about"
              />
            </Link>
          </div>

          <div className="mt-12 space-y-6">
            <p className="text-center text-lg">Ready to get started? Join your friends today!</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/auth/signup" search={{ returnTo: "/" }}>
                  Create Account
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link to="/auth" search={{ returnTo: "/" }}>
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainDrawer>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card border rounded-lg p-6 hover:shadow-md hover:border-secondary hover:text-secondary transition-shadow">
      <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">{icon}</div>
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
