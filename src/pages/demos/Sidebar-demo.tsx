// src/pages/demos/sidebar-demo.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { ChevronDown } from "lucide-react";
import PropsPanel from "../props-panel";

export default function SidebarDemo() {
  const [selected, setSelected] = useState("Sidebar");

  const previewCode: Record<string, string> = {
    Sidebar: `<Collapsible defaultOpen>
  <CollapsibleTrigger>Projects</CollapsibleTrigger>
  <CollapsibleContent>Links inside collapsible</CollapsibleContent>
</Collapsible>`,
    Sheet: `<Sheet>
  <SheetTrigger asChild><Button>Open</Button></SheetTrigger>
  <SheetContent side="left">Sheet content</SheetContent>
</Sheet>`,
    Accordion: `<Accordion type="multiple" defaultValue={['team']}>
  <AccordionItem value="team">
    <AccordionTrigger>Team</AccordionTrigger>
    <AccordionContent>Content here</AccordionContent>
  </AccordionItem>
</Accordion>`,
    Collapsible: `<Collapsible>
  <CollapsibleTrigger>Section</CollapsibleTrigger>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>`,
  };

  return (
    <main className="p-4 max-w-[1200px] mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Sidebar / Sheet / Collapsible / Accordion Demo
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT PANEL */}
        <section className="flex-1 space-y-6">
          {/* Sidebar with Collapsible + Accordion */}
          <div className="p-4 rounded-2xl shadow-md bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-2">Sidebar / Collapsible / Accordion</h2>
            <div className="flex flex-col gap-4">
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 w-full flex justify-between items-center">
                  Projects <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-3 mt-2 flex flex-col gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="#" className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">All Projects</a>
                    </TooltipTrigger>
                    <TooltipContent>View all projects</TooltipContent>
                  </Tooltip>
                  <a href="#" className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Create Project</a>
                </CollapsibleContent>
              </Collapsible>

              <Accordion type="multiple" defaultValue={["team"]}>
                <AccordionItem value="team">
                  <AccordionTrigger className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                    Team
                  </AccordionTrigger>
                  <AccordionContent className="pl-3 mt-2 flex flex-col gap-1">
                    <a href="#" className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Members</a>
                    <a href="#" className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Invites</a>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Sheet Demo 4 directions */}
          <div className="p-4 rounded-2xl shadow-md bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-2">Sheet Demo (4 directions)</h2>
            <div className="flex flex-wrap gap-2">
              {["left", "right", "top", "bottom"].map((side) => (
                <Sheet key={side}>
                  <SheetTrigger asChild>
                    <Button variant="outline">
                      {side.charAt(0).toUpperCase() + side.slice(1)}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side={side as any}>
                    <h3 className="text-lg font-semibold mb-2">
                      {side.charAt(0).toUpperCase() + side.slice(1)} Sheet
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      This sheet opens from {side} and can contain collapsibles or accordions.
                    </p>
                  </SheetContent>
                </Sheet>
              ))}
            </div>
          </div>
        </section>

        {/* RIGHT PANEL */}
        <section className="lg:w-96 flex-shrink-0">
          <PropsPanel selected={selected} onSelect={setSelected} previewCode={previewCode} />
        </section>
      </div>
    </main>
  );
}
