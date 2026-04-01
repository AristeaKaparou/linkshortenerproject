import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link2, BarChart3, LayoutDashboard, Copy, Zap, Shield, ArrowRight } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-8 py-32 px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
          <Zap className="size-3.5" />
          Fast, free URL shortening
        </div>
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          Shorten URLs. Track Clicks.{" "}
          <span className="text-primary/80">Own Your Links.</span>
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
          Transform long, unwieldy URLs into clean short links in seconds. Get
          powerful analytics, manage all your links from one dashboard, and
          share with confidence.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
            <Button size="lg" className="gap-2">
              Get started for free <ArrowRight className="size-4" />
            </Button>
          </SignUpButton>
          <SignInButton mode="modal" forceRedirectUrl="/dashboard">
            <Button size="lg" variant="outline">
              Sign in
            </Button>
          </SignInButton>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-muted/20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to manage links
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful features wrapped in a simple interface.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                  <Link2 className="size-5" />
                </div>
                <CardTitle>Custom Short Links</CardTitle>
                <CardDescription>
                  Create branded, memorable short URLs in seconds. No more ugly
                  long links cluttering your messages.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                  <BarChart3 className="size-5" />
                </div>
                <CardTitle>Click Analytics</CardTitle>
                <CardDescription>
                  Track every click with detailed analytics. Know when and how
                  often your links are visited in real time.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                  <LayoutDashboard className="size-5" />
                </div>
                <CardTitle>Link Dashboard</CardTitle>
                <CardDescription>
                  Manage all your shortened links from a single, clean
                  dashboard. Edit, delete, or view stats at a glance.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                  <Copy className="size-5" />
                </div>
                <CardTitle>One-Click Copy</CardTitle>
                <CardDescription>
                  Copy your short link to clipboard instantly. Share anywhere —
                  social media, emails, or messages.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                  <Zap className="size-5" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Powered by serverless infrastructure. Redirects happen at the
                  edge so your audience never waits.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                  <Shield className="size-5" />
                </div>
                <CardTitle>Secure & Reliable</CardTitle>
                <CardDescription>
                  Every link is tied to your authenticated account. Only you
                  can manage and delete your links.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground mb-16">
            Get your first short link in under a minute.
          </p>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
            {(
              [
                {
                  step: "1",
                  title: "Sign up",
                  description:
                    "Create a free account in seconds using your email or social login.",
                },
                {
                  step: "2",
                  title: "Paste your URL",
                  description:
                    "Paste any long URL into the dashboard and generate a short link instantly.",
                },
              ] as const
            ).map(({ step, title, description }) => (
              <div key={step} className="flex flex-col items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                  {step}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {title}
                </h3>
                <p className="text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-muted/20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to shorten your first link?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Free forever. No credit card required.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <SignUpButton mode="modal">
              <Button size="lg" className="gap-2">
                Create free account <ArrowRight className="size-4" />
              </Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button size="lg" variant="outline">
                Already have an account? Sign in
              </Button>
            </SignInButton>
          </div>
        </div>
      </section>
    </div>
  );
}


