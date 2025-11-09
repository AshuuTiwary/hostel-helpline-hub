import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Users, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Hostel Portal</span>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="ghost">
              <Link to="/student/login">Student Login</Link>
            </Button>
            <Button asChild>
              <Link to="/admin/login">Admin Login</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-24 space-y-8">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Report & Track Hostel Issues
          </h1>
          <p className="text-xl text-muted-foreground">
            A transparent system to submit complaints, track resolution progress, and ensure
            accountability in hostel management.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button asChild size="lg">
              <Link to="/student/submit">Submit Complaint</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/student/dashboard">Track My Complaints</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Easy Reporting</h3>
            <p className="text-sm text-muted-foreground">
              Submit complaints with detailed descriptions and attachments in minutes
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Real-time Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Monitor the status of your complaints with automatic updates
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Transparent Process</h3>
            <p className="text-sm text-muted-foreground">
              View action history and all updates made by staff members
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Privacy Protected</h3>
            <p className="text-sm text-muted-foreground">
              Option for anonymous reporting on sensitive issues
            </p>
          </Card>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container py-16">
        <div className="mx-auto max-w-3xl text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Report Categories</h2>
            <p className="text-muted-foreground">
              Submit complaints across various hostel facility categories
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Electricity",
              "Washroom",
              "Room Accommodation",
              "Mess Food",
              "Mental Health",
              "Harassment & Violence",
              "Safety",
              "Financial",
              "Academic",
              "Other",
            ].map((category) => (
              <div
                key={category}
                className="rounded-lg border bg-card p-4 text-center font-medium hover:bg-accent/50 transition-colors"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8 mt-16">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 Hostel Management Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
