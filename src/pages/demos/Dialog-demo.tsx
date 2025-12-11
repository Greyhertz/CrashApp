// src/pages/demos/dialog/index.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
} from "@/components/ui/alert-dialog";
import { Toaster, toast } from "sonner"; // Added Sonner
import PropsPanel from "@/components/demos/dialog-panel";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { CalendarDays } from "lucide-react";

export default function DialogDemo()
{
  const [darkMode, setDarkMode] = useState(false);
  const [showProps, setShowProps] = useState(false);
  const [selected, setSelected] = useState("Dialog");

//   const previewCode: Record<string, string> = {
//     Dialog: `<Dialog>
//   <DialogTrigger asChild><Button>Open Dialog</Button></DialogTrigger>
//   <DialogContent>
//     <DialogHeader>
//       <DialogTitle>Dialog Title</DialogTitle>
//       <DialogDescription>Description here</DialogDescription>
//     </DialogHeader>
//     <DialogFooter>
//       <Button>Close</Button>
//     </DialogFooter>
//   </DialogContent>
// </Dialog>`,
//     Popover: `<Popover>
//   <PopoverTrigger asChild><Button>Open Popover</Button></PopoverTrigger>
//   <PopoverContent>Popover content</PopoverContent>
// </Popover>`,
//     AlertDialog: `<AlertDialog>
//   <AlertDialogTrigger asChild><Button>Delete</Button></AlertDialogTrigger>
//   <AlertDialogContent>
//     <AlertDialogHeader>
//       <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//       <AlertDialogDescription>Deleting cannot be undone.</AlertDialogDescription>
//     </AlertDialogHeader>
//     <AlertDialogCancel>Cancel</AlertDialogCancel>
//     <AlertDialogAction>Delete</AlertDialogAction>
//   </AlertDialogContent>
// </AlertDialog>`,
//     Toast: `<Button onClick={() => toast('This is a toast!')}>Show Toast</Button>`
//   };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <main className="p-4 max-w-[1200px] mx-auto">
       {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Dialog Components Demo</h1>
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowProps(!showProps)} 
                className="lg:hidden"
                variant="outline"
              >
                {showProps ? "Hide" : "Show"} Props
              </Button>
              <Button onClick={toggleDarkMode}>
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </Button>
            </div>
          </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT PANEL: Live preview */}
        <section className="flex-1 space-y-6">
          {/* Dialog */}
          <div className="p-4 rounded-2xl shadow-md bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-2">Dialog Demo</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button  onClick={() => setSelected("Dialog")}
                      className={` shadow-lg  border-2 transition-all cursor-pointer hover:shadow-xl ${
                        selected === "Dialog" ? "border-blue-500" : "border-transparent"
                      }`}>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>
                    This is a demo dialog. You can place forms, text, or buttons here.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button>Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Popover */}
          <div className="p-4 rounded-2xl shadow-md bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-2">Popover Demo</h2>
            <Popover>
              <PopoverTrigger asChild>
                <Button  onClick={() => setSelected("Popover")}
                      className={` shadow-lg  border-2 transition-all cursor-pointer hover:shadow-xl ${
                        selected === "Popover" ? "border-blue-500" : "border-transparent"
                      }`}>Open Popover</Button>
              </PopoverTrigger>
              <PopoverContent>
                This is popover content. It can include links or interactive items.
              </PopoverContent>
            </Popover>
          </div>

          {/* AlertDialog */}
          <div className="p-4 rounded-2xl shadow-md bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-2">AlertDialog Demo</h2>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive"  onClick={() => setSelected("AlertDialog")}
                      className={` shadow-lg border-2 transition-all cursor-pointer hover:shadow-xl ${
                        selected === "AlertDialog" ? "border-blue-500" : "border-transparent"
                      }`}>Delete Item</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Delete</AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* Toast / Sonner */}
          <div className="p-4 rounded-2xl shadow-md bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-2">Toast / Sonner Demo</h2>
            <Button
              onClick={ () =>
              {
                toast.success("This is a success toast using Sonner!")
                setSelected("Toast")
              }
             
              }
              className={`shadow-lg   border-2 transition-all cursor-pointer hover:shadow-xl ${
                selected === "Toast" ? "border-blue-500" : "border-transparent"
              }`}
            >
              Show Toast
            </Button>
            <Toaster richColors position="top-right" />
          </div>
          <div onClick={() => setSelected("HoverCard")} className={ `shadow-lg   border-2 transition-all cursor-pointer hover:shadow-xl ${
                selected === "HoverCard" ? "border-blue-500" : "border-transparent"
              }`}>
                <HoverCard openDelay={200} closeDelay={200}>
          <HoverCardTrigger asChild>
            <Button variant="link">@nextjs</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@Shadcnn</h4>
                    <p className="text-sm">
                      Shadcn
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
        </HoverCard>
          </div>
          
          <div className="p-4 rounded-2xl shadow-md bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold mb-2">Tooltip</h2>
          <Button onClick={() => setSelected("Tooltip")} className={ `shadow-lg   border-2 transition-all cursor-pointer hover:shadow-xl ${
                selected === "Tooltip" ? "border-blue-500" : "border-transparent"
              }`}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>Hover</TooltipTrigger>
                <TooltipContent>
                  <p>Add to library</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

          </Button>
          </div>
      
        </section>

        {/* RIGHT PANEL: Props + explanation */}
        <section className={`lg:w-96 flex-shrink-0 ${showProps ? 'block' : 'hidden lg:block'}`}>
              <PropsPanel selected={ selected } onSelect={ setSelected }  />
            </section>
      </div>
    </main>
  );
}
