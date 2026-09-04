import { HTMLAttributes } from "react";
import clsx from "clsx";
import { Container } from "./Container";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  containerClassName?: string;
}

export function Section({ className, containerClassName, children, ...props }: SectionProps) {
  return (
    <section className={clsx("py-16 sm:py-24", className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
