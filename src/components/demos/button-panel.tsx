// src/components/demos/button-panel.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

type PropsPanelProps = {
  selected: string;
  onSelect: (s: string) => void;
  previewCode: Record<string, string>;
};

const propsData = {
  variants: [
    { prop: "variant", type: "'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'", description: "Visual style of the button. Default (primary blue), secondary (gray), destructive (red/danger), outline (border only), ghost (transparent with hover), link (text link style)." },
    { prop: "className", type: "string", description: "Additional CSS classes to customize the button appearance beyond the variant styles." }
  ],
  sizes: [
    { prop: "size", type: "'default' | 'sm' | 'lg' | 'icon'", description: "Button size: default (medium), sm (small/compact), lg (large with more padding), icon (square button for icons only)." },
    { prop: "asChild", type: "boolean", description: "When true, renders the button as its child element (useful for wrapping links or other elements while maintaining button styling)." }
  ],
  states: [
    { prop: "disabled", type: "boolean", description: "Disables the button when true. Prevents clicks, applies disabled styling (grayed out), and sets aria-disabled attribute." },
    { prop: "loading", type: "boolean", description: "Shows loading state. Typically used with a spinner icon and disabled state to prevent multiple submissions." },
    { prop: "type", type: "'button' | 'submit' | 'reset'", description: "HTML button type. Use 'submit' for form submissions, 'button' for regular clicks, 'reset' to clear forms." }
  ],
  icons: [
    { prop: "children", type: "ReactNode", description: "Content inside the button. Can include text, icons, or any React elements. Use Lucide icons for consistency." },
    { prop: "leftIcon", type: "ReactNode", description: "Icon placed on the left side of button text. Typically wrapped with margin classes like 'mr-2'." },
    { prop: "rightIcon", type: "ReactNode", description: "Icon placed on the right side of button text. Typically wrapped with margin classes like 'ml-2'." }
  ],
  events: [
    { prop: "onClick", type: "(e: MouseEvent) => void", description: "Click event handler. Called when button is clicked (if not disabled). Receives the click event object." },
    { prop: "onMouseEnter", type: "(e: MouseEvent) => void", description: "Mouse enter event handler. Called when mouse pointer enters the button area. Useful for hover effects." },
    { prop: "onMouseLeave", type: "(e: MouseEvent) => void", description: "Mouse leave event handler. Called when mouse pointer leaves the button area." },
    { prop: "onFocus", type: "(e: FocusEvent) => void", description: "Focus event handler. Called when button receives keyboard focus. Important for accessibility." }
  ]
};

export default function ButtonPanel({ selected, onSelect, previewCode }: PropsPanelProps) {
  const [copied, setCopied] = useState(false);
  const items = Object.keys(propsData);

  const copyCode = () => {
    navigator.clipboard.writeText(previewCode[selected] || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="sticky top-6 p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 max-h-[calc(100vh-3rem)] overflow-auto border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Button Props</h3>

      {/* Component selector buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {items.map((it) => (
          <button
            key={it}
            onClick={() => onSelect(it)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
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
        <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white capitalize">{selected} Props</h4>
        <div className="space-y-3">
          {propsData[selected as keyof typeof propsData]?.map((p) => (
            <div key={p.prop} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-gray-900 dark:text-white font-mono text-sm">{p.prop}</span>
                <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-gray-700 dark:text-gray-300 font-mono whitespace-nowrap ml-2">{p.type}</span>
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
          {previewCode[selected] || "// No code example available"}
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