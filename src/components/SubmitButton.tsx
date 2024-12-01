"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button aria-disabled={pending} disabled={pending}>
      {pending ? "Loading..." : "Subscribe"}
    </Button>
  );
}

export default SubmitButton;
