// src/pages/demos/dialog/props-panel.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { NonUndefined } from "react-hook-form";

type PropsPanelProps = {
  selected: string;
  onSelect: (s: string) => void;
};

const propsData: Record<string, Array<{ prop: string; type: string; description: string }>> = {
  Dialog: [
    { prop: "open", type: "boolean", description: "Controls dialog visibility" },
    { prop: "onOpenChange", type: "(open:boolean)=>void", description: "Callback when open state changes" }
  ],
  Popover: [
    { prop: "open", type: "boolean", description: "Popover visibility" },
    { prop: "trigger", type: "ReactNode", description: "Element that triggers popover" }
  ],
  AlertDialog: [
    { prop: "open", type: "boolean", description: "Controls AlertDialog visibility" },
    { prop: "onOpenChange", type: "(open:boolean)=>void", description: "Callback on state change" }
  ],
  Toast: [
    { prop: "title", type: "string", description: "Title of the toast" },
    { prop: "description", type: "string", description: "Optional description" },
    { prop: "duration", type: "number", description: "Time in ms before toast disappears" },
    { prop: "action", type: "ReactNode", description: "Optional button/action inside the toast" }
  ],
  HoverCard: [
    { prop: "open / defaultOpen", type: "boolean", description: "Controls whether the hover card is open. Use controlled open for external state." },
    {prop: "openDelay", type: "number", description: "Time in ms to wait before opening the hover card after hover." },
    { prop: "closeDelay", type: "number", description: "Time in ms to wait before closing the hover card after unhover." },
    { prop: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes." },
    { prop: "children", type: "ReactNode", description: "Trigger and content slots (usually HoverCardTrigger + HoverCardContent)." }
  ]
  
};

//  open?: boolean;
// defaultOpen?: boolean;
// onOpenChange?: (open: boolean) => void;
// openDelay?: number;
// closeDelay?: number;

const previewCode: Record<string, string> = {
  Dialog: `<Dialog>
<DialogTrigger asChild><Button>Open Dialog</Button></DialogTrigger>
<DialogContent>
  <DialogHeader>
    <DialogTitle>Dialog Title</DialogTitle>
    <DialogDescription>Description here</DialogDescription>
  </DialogHeader>
  <DialogFooter>
    <Button>Close</Button>
  </DialogFooter>
</DialogContent>
</Dialog>`,
  Popover: `<Popover>
<PopoverTrigger asChild><Button>Open Popover</Button></PopoverTrigger>
<PopoverContent>Popover content</PopoverContent>
</Popover>`,
  AlertDialog: `<AlertDialog>
<AlertDialogTrigger asChild><Button>Delete</Button></AlertDialogTrigger>
<AlertDialogContent>
  <AlertDialogHeader>
    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
    <AlertDialogDescription>Deleting cannot be undone.</AlertDialogDescription>
  </AlertDialogHeader>
  <AlertDialogCancel>Cancel</AlertDialogCancel>
  <AlertDialogAction>Delete</AlertDialogAction>
</AlertDialogContent>
</AlertDialog>`,
  Toast: `<Button onClick={() => toast('This is a toast!')}>Show Toast</Button>`,
  HoverCard: ` <HoverCard>
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
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
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
    </HoverCard>`
};


// export default function PropsPanel({ selected, onSelect, previewCode }: PropsPanelProps) {
//   const items = Object.keys(propsData);

//   return (
//     <aside className="sticky top-6 p-4 rounded-2xl shadow-md bg-white dark:bg-gray-800 max-h-[80vh] overflow-auto">
//       <h3 className="text-lg font-semibold mb-3">Props & Explanations</h3>

//       <div className="flex flex-wrap gap-2 mb-4">
//         {items.map((it) => (
//           <button
//             key={it}
//             onClick={() => onSelect(it)}
//             className={`px-3 py-1 rounded ${
//               it === selected ? "bg-brand-500 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700"
//             }`}
//           >
//             {it}
//           </button>
//         ))}
//       </div>

//       <div className="mb-4">
//         <h4 className="font-semibold">{selected}</h4>
//         <div className="space-y-2 mt-2">
//           {propsData[selected as keyof typeof propsData]?.map((p) => (
//             <div key={p.prop} className="p-2 rounded border border-gray-200 dark:border-gray-700">
//               <div className="flex justify-between font-medium">
//                 {p.prop} <span className="text-xs text-muted-foreground">{p.type}</span>
//               </div>
//               <div className="text-sm text-muted-foreground mt-1">{p.description}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div>
//         <h4 className="font-semibold mb-2">Live Code</h4>
//         <pre className="bg-gray-50 dark:bg-gray-900 p-3 rounded text-xs max-h-48 overflow-auto">
//           {previewCode[selected]}
//         </pre>
//         <div className="mt-2 flex gap-2">
//           <Button onClick={() => navigator.clipboard.writeText(previewCode[selected] ?? "")}>
//             Copy code
//           </Button>
//         </div>
//       </div>
//     </aside>
//   );
// }

export default function PropsPanel({ selected, onSelect }: PropsPanelProps) {
  const [copied, setCopied] = useState(false);
  const items = Object.keys(propsData);

  const copyCode = () => {
    navigator.clipboard.writeText(previewCode[selected]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="sticky top-6 p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 max-h-[calc(100vh-3rem)] overflow-auto border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Component Props</h3>

      {/* Component selector buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {items.map((it) => (
          <button
            key={it}
            onClick={() => onSelect(it)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              it === selected 
                ? "bg-blue-600 text-white shadow-md" 
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {it}
          </button>
        ))}
      </div>

      {/* Props documentation */}
      <div className="mb-6">
        <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">{selected} Props</h4>
        <div className="space-y-3">
          {propsData[selected]?.map((p) => (
            <div key={p.prop} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-gray-900 dark:text-white font-mono text-sm">{p.prop}</span>
                <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-gray-700 dark:text-gray-300 font-mono">{p.type}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Code example */}
      <div>
        <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Code Example</h4>
        <pre className="bg-gray-900 dark:bg-black p-4 rounded-lg text-xs overflow-x-auto text-gray-100 border border-gray-700">
          {previewCode[selected]}
        </pre>
        <Button 
          onClick={copyCode} 
          className="mt-3 w-full"
          variant={copied ? "default" : "outline"}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Code
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}