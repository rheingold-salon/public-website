import Link from "next/link";
import { auth, signIn } from "@/server/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Newspaper, BookMarked } from "lucide-react";

export default async function HomePage() {
  const session = await auth();
  if (!session) return await signIn();

  const pages = [
    {
      name: "dates & events",
      route: "/dates-events",
      icon: Calendar,
      description:
        "Include new Events, including Podcasts, Talks and TV appearances.",
    },
    {
      name: "news & publications",
      route: "/news-publications",
      icon: Newspaper,
      description:
        "Add new publications and classify them using the tags. Edit the home page slider.",
    },
    {
      name: "references & cases",
      route: "/references-cases",
      icon: BookMarked,
      description:
        "Update customer groups and their icons as well as references and cases",
    },
    {
      name: "founders & team",
      route: "founders-team",
      icon: Users,
      description: "Add and edit team members or remove old ones.",
    },
  ];

  return (
    <div className="m-10 flex-col items-center justify-center">
      <h1 className="mb-10 text-center text-2xl font-bold">
        Welcome {session.user.name}!
      </h1>
      <div className="grid grid-cols-2 gap-8">
        {pages.map((page) => (
          <Link key={page.name} href={page.route}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <page.icon />
                  <span>{page.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{page.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
