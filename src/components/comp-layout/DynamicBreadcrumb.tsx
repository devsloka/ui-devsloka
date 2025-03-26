"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

const DynamicBreadcrumb = () => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);

  if (!pathnames.length) return null;

  return (
    <Breadcrumb className="mb-2">
      <BreadcrumbList>
        {/* Home Link */}
        <BreadcrumbItem>
          <Link href="/">Home</Link>
        </BreadcrumbItem>

        {pathnames.map((value, index) => {
          const href = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const displayValue = capitalize(decodeURIComponent(value));

          return (
            <div key={href} className="flex items-center">
              <BreadcrumbSeparator />
              {isLast ? (
                <>
                  <BreadcrumbPage className="ml-2">
                    {displayValue}
                  </BreadcrumbPage>
                </>
              ) : (
                <BreadcrumbItem>
                  {index === 1 && pathnames.length > 3 ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-1">
                        <EllipsisVertical className="h-4 w-4" />
                        <span className="sr-only">More Options</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {pathnames.slice(1, -1).map((item, i) => (
                          <DropdownMenuItem key={i}>
                            <Link
                              href={`/${pathnames.slice(0, i + 2).join("/")}`}
                            >
                              {capitalize(decodeURIComponent(item))}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <>
                      <Link className="ml-2" href={href}>
                        {displayValue}
                      </Link>
                    </>
                  )}
                </BreadcrumbItem>
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
