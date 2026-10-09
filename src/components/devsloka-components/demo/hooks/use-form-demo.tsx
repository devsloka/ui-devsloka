"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, type FormErrors } from "@/registry/hooks/use-form";

type SignUpValues = {
  email: string;
  password: string;
};

function validate(values: SignUpValues) {
  const errors: FormErrors<SignUpValues> = {};
  if (!/^\S+@\S+\.\S+$/.test(values.email))
    errors.email = "Enter a valid email.";
  if (values.password.length < 8)
    errors.password = "Use at least 8 characters.";
  return errors;
}

export default function UseFormDemo() {
  const [submitted, setSubmitted] = useState<SignUpValues | null>(null);
  const form = useForm<SignUpValues>({
    initialValues: { email: "", password: "" },
    validate,
    onSubmit: (values) => setSubmitted(values),
  });

  const fieldError = (field: keyof SignUpValues) =>
    form.touched[field] ? form.errors[field] : undefined;

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent>
        <form onSubmit={form.handleSubmit} noValidate className="space-y-4">
          {(["email", "password"] as const).map((field) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={`form-${field}`} className="capitalize">
                {field}
              </Label>
              <Input
                id={`form-${field}`}
                name={field}
                type={field}
                value={form.values[field]}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                aria-invalid={!!fieldError(field)}
                aria-describedby={
                  fieldError(field) ? `form-${field}-error` : undefined
                }
              />
              {fieldError(field) && (
                <p
                  id={`form-${field}-error`}
                  className="text-sm text-destructive"
                >
                  {fieldError(field)}
                </p>
              )}
            </div>
          ))}
          <div className="flex gap-2">
            <Button type="submit" disabled={form.isSubmitting}>
              Sign up
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                setSubmitted(null);
              }}
            >
              Reset
            </Button>
          </div>
          {submitted && (
            <p className="text-sm text-muted-foreground" aria-live="polite">
              Submitted as{" "}
              <span className="text-foreground">{submitted.email}</span>
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
