import React from "react";
import { Button } from "@/components/ui/button";

type PropsPanelProps = {
  selected: string;
  onSelect: (s: string) => void;
  previewCode: Record<string, string>;
};

const propsData: Record<string, Array<{ prop: string; type: string; description: string }>> = {
  Collapsible: [
    { prop: "open / defaultOpen", type: "boolean", description: "Controls whether the collapsible is open. Use controlled open for external state." },
    { prop: "onOpenChange", type: "(open: boolean) => void", description: "Callback when open state changes." },
    { prop: "children", type: "ReactNode", description: "Trigger and content slots (usually CollapsibleTrigger + CollapsibleContent)." }
  ],
  Accordion: [
    { prop: "type", type: "'single' | 'multiple'", description: "Whether multiple items can be open simultaneously." },
    { prop: "defaultValue", type: "string | string[]", description: "Which item(s) are initially open." },
    { prop: "onValueChange", type: "(value) => void", description: "Callback for value changes." }
  ],
  Popover: [
    { prop: "defaultOpen / open", type: "boolean", description: "Control whether popover is open." },
    { prop: "onOpenChange", type: "(open) => void", description: "Called when popover opens or closes." },
    { prop: "align", type: "'start' | 'center' | 'end'", description: "Alignment of the popover content relative to trigger." }
  ],
  Sheet: [
    { prop: "side", type: "'left' | 'right' | 'top' | 'bottom'", description: "Which side the sheet opens from." },
    { prop: "defaultOpen", type: "boolean", description: "Starts open or closed." },
  ],
  Dialog: [
    { prop: "open / defaultOpen", type: "boolean", description: "Control open state." },
    { prop: "onOpenChange", type: "(open) => void", description: "Callback for open state changes." }
  ]
};

export default function PropsPanel({ selected, onSelect, previewCode }: PropsPanelProps) {
  const items = Object.keys(propsData);

  return (
    <aside className="sticky top-6 p-4 rounded-2xl shadow-md bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-3">Component props</h3>

      <div className="flex gap-2 mb-4">
        {items.map((it) => (
          <button
            key={it}
            onClick={() => onSelect(it)}
            className={`px-3 py-1 rounded ${it === selected ? "bg-brand-500 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
          >
            {it}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <h4 className="font-semibold">{selected}</h4>
        <p className="text-sm text-muted-foreground mb-2">Quick overview of common props.</p>

        <div className="space-y-2">
          {propsData[selected as keyof typeof propsData]?.map((p) => (
            <div key={p.prop} className="p-2 rounded border">
              <div className="flex justify-between">
                <strong className="font-medium">{p.prop}</strong>
                <span className="text-xs text-muted-foreground">{p.type}</span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">{p.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Live code</h4>
        <pre className="max-h-48 overflow-auto text-xs bg-gray-50 dark:bg-gray-900 p-3 rounded">
{previewCode[selected] ?? "// Select a component to see example code"}
        </pre>

        <div className="mt-3 flex gap-2">
          <Button onClick={() => navigator.clipboard.writeText(previewCode[selected] ?? "")}>Copy code</Button>
          <Button variant="secondary" onClick={() => alert("Open docs (demo)")}>Open docs</Button>
        </div>
      </div>
    </aside>
  );
}
