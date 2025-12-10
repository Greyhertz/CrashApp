import React from "react";
import { Button } from "@/components/ui/button";

type PropsPanelProps = {
  selected: string;
  onSelect: (s: string) => void;
  previewCode: Record<string, string>;
};

const propsData: Record<string, Array<{ prop: string; type: string; description: string }>> = {
  Sidebar: [
    { prop: "defaultOpen", type: "boolean", description: "Whether collapsible sections start open." },
    { prop: "children", type: "ReactNode", description: "Sidebar links and content." }
  ],
  Sheet: [
    { prop: "side", type: "'left' | 'right' | 'top' | 'bottom'", description: "Direction the sheet opens from." },
    { prop: "defaultOpen", type: "boolean", description: "Whether sheet is open by default." },
    { prop: "onOpenChange", type: "(open: boolean) => void", description: "Callback when sheet opens/closes." }
  ],
  Collapsible: [
    { prop: "defaultOpen", type: "boolean", description: "Whether collapsible is open by default." },
    { prop: "onOpenChange", type: "(open: boolean) => void", description: "Callback when collapsible opens/closes." }
  ],
  Accordion: [
    { prop: "type", type: "'single' | 'multiple'", description: "Single or multiple sections can be open." },
    { prop: "defaultValue", type: "string | string[]", description: "Which sections start open." },
    { prop: "onValueChange", type: "(value) => void", description: "Called when open sections change." }
  ]
};

export default function PropsPanel({ selected, onSelect, previewCode }: PropsPanelProps) {
  const items = Object.keys(propsData);

  return (
    <aside className="sticky top-6 p-4 rounded-2xl shadow-md bg-white dark:bg-gray-800 max-h-[80vh] overflow-auto">
      <h3 className="text-lg font-semibold mb-3">Component Props & Explanations</h3>

      <div className="flex flex-wrap gap-2 mb-4">
        {items.map((it) => (
          <button
            key={it}
            onClick={() => onSelect(it)}
            className={`px-3 py-1 rounded ${
              it === selected ? "bg-brand-500 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {it}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <h4 className="font-semibold">{selected}</h4>
        <div className="space-y-2 mt-2">
          {propsData[selected as keyof typeof propsData]?.map((p) => (
            <div key={p.prop} className="p-2 rounded border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between font-medium">
                {p.prop} <span className="text-xs text-muted-foreground">{p.type}</span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">{p.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Live Code Example</h4>
        <pre className="bg-gray-50 dark:bg-gray-900 p-3 rounded text-xs max-h-48 overflow-auto">
          {previewCode[selected]}
        </pre>
        <div className="mt-2 flex gap-2">
          <Button onClick={() => navigator.clipboard.writeText(previewCode[selected] ?? "")}>Copy code</Button>
        </div>
      </div>
    </aside>
  );
}
