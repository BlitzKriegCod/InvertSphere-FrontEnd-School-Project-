import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function PageContainer({
  children,
  title,
  description,
}: PageContainerProps) {
  return (
    <div className="flex flex-col flex-1 w-full gap-6 p-6 md:p-8">
      {(title || description) && (
        <div className="flex flex-col gap-2">
          {title && (
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-sm text-muted-foreground sm:text-base">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}