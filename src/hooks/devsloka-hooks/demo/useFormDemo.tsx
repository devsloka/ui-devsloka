"use client";
import { useForm } from "@/hooks/devsloka-hooks/use-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface FormValues {
  [key: string]: unknown;
  email: string;
  password: string;
}

export default function UseFormDemo() {
  const [values, handleChange] = useForm<FormValues>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">useForm</h1>
        <p className="text-muted-foreground">
          Form state management with validation
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>
        <div className="space-y-2">
          <Label>Password</Label>
          <Input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit">Submit</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              handleChange({
                target: { name: "email", value: "" },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
}
