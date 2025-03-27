"use client";
import { useFetch } from "@/hooks/devsloka-hooks/use-fetch";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function UseFetchDemo() {
  const { data, loading, error, refetch } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">useFetch</h1>
        <p className="text-muted-foreground">
          Data fetching with loading and error states
        </p>
      </div>

      <div className="space-y-4">
        <Button onClick={() => refetch()} variant="outline">
          Reload Data
        </Button>

        {loading && (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        )}

        {error && <Alert variant="destructive">Error: {error.message}</Alert>}

        {data && (
          <div className="space-y-2">
            {data.slice(0, 3).map((post) => (
              <div key={post.id} className="p-4 border rounded-lg bg-muted/10">
                <h3 className="font-medium">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
