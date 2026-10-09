import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ErrorResult } from "@/registry/ui/error-result";

const ErrorResultDemo = () => {
  return (
    <ErrorResult
      className="w-full max-w-md"
      title="Payment failed"
      description="Your card was declined by the issuing bank. No charge was made. Try again or use a different card."
      action={
        <>
          <Button variant="outline">Change card</Button>
          <Button>
            <RotateCw />
            Try again
          </Button>
        </>
      }
    />
  );
};

export default ErrorResultDemo;
