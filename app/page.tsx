import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LandingHeader } from "@/components/layout/landing-header";
import {
  Calendar,
  Mail,
  FileText,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />

      {/* Hero Section */}
      <section className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-sm">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>AI-Powered Task Automation</span>
        </div>

        <h1 className="mb-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Automate Your Tasks with{" "}
          <span className="text-primary">Natural Language</span>
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Simply describe what you need done in plain English. Our AI agent
          plans and executes multi-step workflows across your calendar, email,
          and Notion - with your approval at every step.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/login">
              Start Automating
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/workflows">View Demo</Link>
          </Button>
        </div>

        {/* Example prompt */}
        <div className="mt-12 w-full max-w-2xl rounded-lg border bg-muted/50 p-4">
          <p className="mb-2 text-sm text-muted-foreground">Try something like:</p>
          <p className="font-mono text-sm">
            "Schedule a meeting with john@company.com next Friday at 2pm and
            send him a reminder email"
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Powerful Integrations
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-background p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Google Calendar</h3>
              <p className="text-muted-foreground">
                Check availability, schedule meetings, and manage events
                automatically. Smart conflict detection included.
              </p>
            </div>

            <div className="rounded-lg border bg-background p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Email</h3>
              <p className="text-muted-foreground">
                Draft and send emails, meeting invites, and follow-ups. AI
                writes professional messages for you.
              </p>
            </div>

            <div className="rounded-lg border bg-background p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Notion</h3>
              <p className="text-muted-foreground">
                Create pages, update databases, and organize your workspace
                without lifting a finger.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold">Describe Your Task</h3>
              <p className="text-muted-foreground">
                Tell the AI what you want to accomplish in plain English. No
                complex setup required.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold">Review the Plan</h3>
              <p className="text-muted-foreground">
                The AI breaks down your request into actionable steps. Approve,
                edit, or reject each action.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold">Execute & Monitor</h3>
              <p className="text-muted-foreground">
                Watch your workflow execute in real-time. Get notified of
                progress and results instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="border-t bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex items-start gap-4">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h3 className="mb-1 font-semibold">Human in the Loop</h3>
                <p className="text-sm text-muted-foreground">
                  Every action requires your approval before execution. You're
                  always in control.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-8 w-8 text-primary" />
              <div>
                <h3 className="mb-1 font-semibold">Smart Validation</h3>
                <p className="text-sm text-muted-foreground">
                  AI checks for conflicts, validates inputs, and suggests
                  improvements automatically.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <h3 className="mb-1 font-semibold">Real-time Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Track workflow progress live. Get instant notifications when
                  actions complete.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join and start automating your tasks today.
          </p>
          <Button size="lg" asChild>
            <Link href="/login">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span>Smart Task Executor</span>
          </div>
          <p>Built with Next.js, React, and AI</p>
        </div>
      </footer>
    </div>
  );
}
