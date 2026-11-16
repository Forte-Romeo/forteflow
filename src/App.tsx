import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Clock3,
  Plus,
  Search,
  TrendingUp,
} from 'lucide-react';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from '@/components/ui';

function App() {
  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-primary">
              DESIGN SYSTEM PREVIEW
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              ForteFlow
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Business operations, intelligently organized.
            </p>
          </div>

          <Badge variant="success">Foundation Ready</Badge>
        </header>

        {/* Buttons */}
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Buttons</h2>

          <div className="flex flex-wrap gap-3">
            <Button leftIcon={<Plus size={16} />}>Create Project</Button>

            <Button variant="secondary">Secondary</Button>

            <Button variant="outline">Outline</Button>

            <Button variant="ghost">Ghost</Button>

            <Button variant="danger">Delete</Button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* Badges */}
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Status Badges</h2>

          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">In Progress</Badge>
            <Badge variant="success">Completed</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="danger">Overdue</Badge>
            <Badge variant="info">Information</Badge>
          </div>
        </section>

        {/* Inputs */}
        <section className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Input Components</h2>

            <Input label="Client name" placeholder="Enter client name" />

            <Input
              label="Email address"
              type="email"
              placeholder="john@example.com"
              hint="Enter your client's email address."
            />
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Input States</h2>

            <Input label="Search" placeholder="Search projects..." />

            <Input
              label="Validation example"
              placeholder="Enter a valid email"
              error="Please enter a valid email address."
            />
          </div>
        </section>

        {/* Cards */}
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Dashboard Cards</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardDescription>Total Revenue</CardDescription>

                  <TrendingUp size={18} className="text-success" />
                </div>

                <CardTitle className="text-2xl">$24,680</CardTitle>
              </CardHeader>

              <CardContent>
                <Badge variant="success">+12.5%</Badge>

                <p className="mt-2 text-xs text-muted-foreground">
                  Compared to last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardDescription>Active Projects</CardDescription>

                  <BriefcaseBusiness size={18} className="text-primary" />
                </div>

                <CardTitle className="text-2xl">12</CardTitle>
              </CardHeader>

              <CardContent>
                <Badge variant="primary">4 new projects</Badge>

                <p className="mt-2 text-xs text-muted-foreground">
                  Currently being managed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardDescription>Pending Tasks</CardDescription>

                  <Clock3 size={18} className="text-warning" />
                </div>

                <CardTitle className="text-2xl">18</CardTitle>
              </CardHeader>

              <CardContent>
                <Badge variant="warning">Needs attention</Badge>

                <p className="mt-2 text-xs text-muted-foreground">
                  Across all active projects
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Card composition */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>

            <CardDescription>
              A preview of the ForteFlow card system.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">Website Redesign</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Updated project progress
                </p>
              </div>

              <Badge variant="success">Completed</Badge>
            </div>
          </CardContent>

          <CardFooter className="justify-between">
            <span className="text-xs text-muted-foreground">
              10 minutes ago
            </span>

            <Button variant="ghost" size="sm">
              View details
              <ArrowUpRight size={14} />
            </Button>
          </CardFooter>
        </Card>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Button rightIcon={<ArrowRight size={16} />}>Continue</Button>

          <Button variant="outline" leftIcon={<Search size={16} />}>
            Explore
          </Button>
        </div>
      </div>
    </main>
  );
}

export default App;
