"use client";

import { Button } from "@/components/ui/button";
import { AdvancedCodeBlock } from "@/components/ui/advanced-code-block";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdvancedCodeDemo() {
  const buttonCode = `import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <Button>Click me</Button>
  )
}`;

  const cardCode = `import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CardWithForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}`;

  const cssCode = `.custom-gradient {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}`;

  return (
    <div className="container py-10 space-y-12">
      <div>
        <h1 className="text-3xl font-bold">Advanced Code Block Component</h1>
        <p className="text-muted-foreground mt-2">
          A component that shows both a preview and code view with syntax
          highlighting, similar to shadcn/ui documentation.
        </p>
      </div>

      <AdvancedCodeBlock
        preview={<Button>Click me</Button>}
        code={buttonCode}
        title="Button Example"
      />

      <AdvancedCodeBlock
        preview={
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>
                Deploy your new project in one-click.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name of your project" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        }
        code={cardCode}
        title="Card With Form"
      />

      <AdvancedCodeBlock
        preview={
          <div className="custom-gradient w-full">
            This is a custom gradient element with CSS
          </div>
        }
        code={cssCode}
        language="css"
        title="CSS Example"
      />
    </div>
  );
}
