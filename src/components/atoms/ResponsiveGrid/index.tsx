import React, { ReactElement } from "react";

interface ResponsiveGridProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  itemClassName?: string;
}

export function ResponsiveGrid({
  children,
  title,
  description,
  className = "",
  itemClassName = "min-w-[300px]",
}: ResponsiveGridProps) {
  return (
    <div className={`max-w-[1200px] mx-auto px-6 ${className}`}>
      <div>
        {title && <h2 className="text-2xl font-semibold mb-2">{title}</h2>}
        {description && <p className="text-gray-600 mb-4">{description}</p>}
        <div className="relative">
          <div className="flex overflow-x-auto gap-4 pb-4 -mx-6 px-6 pr-16 md:grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:overflow-x-visible">
            {React.Children.map(children, (child) =>
              React.isValidElement(child)
                ? React.cloneElement(child as ReactElement<{ className?: string }>, {
                    className: `flex-shrink-0 ${itemClassName} ${
                      (child as ReactElement<{ className?: string }>).props.className || ""
                    }`,
                  })
                : child
            )}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white pointer-events-none md:hidden" />
        </div>
      </div>
    </div>
  );
} 