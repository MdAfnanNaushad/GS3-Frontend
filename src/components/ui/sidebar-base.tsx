import * as React from "react";
import { cn } from "@/lib/utils";

const Sidebar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("w-64 shrink-0 border-r bg-muted/40", className)}
      {...props}
    />
  )
);
Sidebar.displayName = "Sidebar";

const SidebarBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
);
SidebarBody.displayName = "SidebarBody";

const SidebarMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} className={cn("grid gap-1", className)} {...props} />
  )
);
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col rounded-md", className)}
      {...props}
    />
  )
);
SidebarMenuItem.displayName = "SidebarMenuItem";

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "w-full flex items-center justify-between px-4 py-2 text-sm font-medium transition hover:bg-accent rounded-md",
      className
    )}
    {...props}
  />
));
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuSub = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("ml-6 mt-1 grid gap-1", className)}
      {...props}
    />
  )
);
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm rounded-md", className)}
      {...props}
    />
  )
);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

export {
  Sidebar,
  SidebarBody,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
};
