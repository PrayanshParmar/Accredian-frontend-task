"use client";

import { Button } from "@/components/ui/button";

interface BackButtonProps {
  label: string;
  href: string;
}

const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <Button variant="link" size="sm" className="font-normal w-full" asChild>
      <a href={href}>{label}</a>
    </Button>
  );
};

export default BackButton;
