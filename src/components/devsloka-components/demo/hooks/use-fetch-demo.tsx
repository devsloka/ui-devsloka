"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetch } from "@/registry/hooks/use-fetch";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UseFetchDemo() {
  const [userId, setUserId] = useState(1);
  const { status, data, error, refetch } = useFetch<User>(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className="font-mono">
            status: {status}
          </Badge>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setUserId((id) => (id % 10) + 1)}
            >
              Next user
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-8"
              onClick={refetch}
              aria-label="Refetch"
            >
              <RotateCw aria-hidden />
            </Button>
          </div>
        </div>

        {error ? (
          <Alert variant="destructive">
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        ) : status === "loading" && !data ? (
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
        ) : data ? (
          <div className={status === "loading" ? "opacity-60" : undefined}>
            <p className="font-medium">
              #{data.id} {data.name}
            </p>
            <p className="text-sm text-muted-foreground">{data.email}</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
