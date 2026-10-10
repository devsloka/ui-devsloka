import { Button } from "@/components/ui/button";
import { SuccessResult } from "@/registry/ui/success-result";

const SuccessResultDemo = () => {
  return (
    <SuccessResult
      className="w-full max-w-md"
      title="Order confirmed"
      description="Thanks for your purchase. A receipt for order #10482 has been sent to your email."
      action={
        <>
          <Button variant="outline">View receipt</Button>
          <Button>Continue shopping</Button>
        </>
      }
    />
  );
};

export default SuccessResultDemo;
