import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserLinks } from "@/data/links";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link2, ExternalLink } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const userLinks = await getUserLinks(userId);

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Your Links</h1>
        <p className="mt-1 text-muted-foreground">Manage and track all your shortened URLs.</p>
      </div>

      {userLinks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Link2 className="size-6 text-muted-foreground" />
            </div>
            <CardTitle className="text-lg">No links yet</CardTitle>
            <CardDescription>Shorten your first URL to get started.</CardDescription>
          </CardContent>
        </Card>
      ) : (
        <ul className="flex flex-col gap-3">
          {userLinks.map((link) => (
            <li key={link.id}>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle className="flex items-center gap-2 text-base font-medium">
                      <Link2 className="size-4 shrink-0 text-primary" />
                      <span className="text-primary">/{link.shortCode}</span>
                    </CardTitle>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="size-3" />
                      Visit
                    </a>
                  </div>
                  <CardDescription className="truncate">{link.url}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Created{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                    }).format(new Date(link.createdAt))}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
