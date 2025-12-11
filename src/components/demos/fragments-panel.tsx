// src/components/demos/fragments-panel.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

type PropsPanelProps = {
  selected: string;
  onSelect: (s: string) => void;
  previewCode: Record<string, string>;
};

const propsData = {
  combobox: [
    { prop: "value", type: "string", description: "Currently selected value. Should match one of the ComboboxItem values." },
    { prop: "onValueChange", type: "(value: string) => void", description: "Callback fired when selection changes. Receives the new selected value." },
    { prop: "disabled", type: "boolean", description: "Disables the combobox when true. User cannot open dropdown or search." },
    { prop: "placeholder", type: "string", description: "Placeholder text shown when no value is selected." },
    { prop: "searchPlaceholder", type: "string", description: "Placeholder text for the search input inside the dropdown." },
    { prop: "emptyMessage", type: "string", description: "Message displayed when search returns no results. Default: 'No results found.'" }
  ],
  datatable: [
    { prop: "columns", type: "ColumnDef[]", description: "Array of column definitions. Each defines accessor, header, cell renderer, and sorting behavior." },
    { prop: "data", type: "T[]", description: "Array of data objects to display in the table. Type T matches your data structure." },
    { prop: "onRowClick", type: "(row: T) => void", description: "Callback when a row is clicked. Receives the row data object." },
    { prop: "sorting", type: "SortingState", description: "Current sorting state. Use with onSortingChange for controlled sorting." },
    { prop: "onSortingChange", type: "(sorting: SortingState) => void", description: "Callback when sorting changes. Used with @tanstack/react-table." },
    { prop: "filtering", type: "boolean", description: "Enable column filtering capabilities. Adds filter inputs to column headers." },
    { prop: "pagination", type: "boolean", description: "Enable pagination controls at the bottom of the table." }
  ],
  breadcrumbs: [
    { prop: "items", type: "BreadcrumbItem[]", description: "Array of breadcrumb items. Each has: { label: string, href?: string, current?: boolean }" },
    { prop: "separator", type: "ReactNode", description: "Custom separator between breadcrumb items. Default is '/' or chevron icon." },
    { prop: "maxItems", type: "number", description: "Maximum items to show before collapsing. Middle items become '...' if exceeded." },
    { prop: "className", type: "string", description: "Additional CSS classes for the breadcrumb container." }
  ],
  toggle: [
    { prop: "pressed", type: "boolean", description: "Controls the pressed/active state of the toggle button. True = active/pressed." },
    { prop: "onPressedChange", type: "(pressed: boolean) => void", description: "Callback when toggle state changes. Receives new pressed state." },
    { prop: "disabled", type: "boolean", description: "Disables the toggle when true. Button appears grayed out and cannot be toggled." },
    { prop: "variant", type: "'default' | 'outline'", description: "Visual style: default (filled background when pressed) or outline (border style)." },
    { prop: "size", type: "'default' | 'sm' | 'lg'", description: "Button size: default, small (sm), or large (lg)." }
  ],
  togglegroup: [
    { prop: "type", type: "'single' | 'multiple'", description: "Selection mode: 'single' allows one selection only, 'multiple' allows multiple selections at once." },
    { prop: "value", type: "string | string[]", description: "Current selected value(s). String for single, array for multiple. Use with onValueChange." },
    { prop: "onValueChange", type: "(value: string | string[]) => void", description: "Callback when selection changes. Receives string or array depending on type." },
    { prop: "disabled", type: "boolean", description: "Disables all toggle items in the group when true." },
    { prop: "variant", type: "'default' | 'outline'", description: "Visual style applied to all toggle items in the group." },
    { prop: "defaultValue", type: "string | string[]", description: "Initial value for uncontrolled toggle group. Type depends on single/multiple mode." }
  ],
  resizable: [
    { prop: "direction", type: "'horizontal' | 'vertical'", description: "Resize direction: horizontal (left-right) or vertical (top-bottom)." },
    { prop: "defaultSize", type: "number", description: "Initial size of the resizable panel as a percentage (0-100) or pixels." },
    { prop: "minSize", type: "number", description: "Minimum allowed size. Prevents panel from being resized smaller than this value." },
    { prop: "maxSize", type: "number", description: "Maximum allowed size. Prevents panel from being resized larger than this value." },
    { prop: "onResize", type: "(size: number) => void", description: "Callback fired during resize. Receives current size in pixels or percentage." },
    { prop: "collapsible", type: "boolean", description: "Allows panel to collapse to minimum size or hidden. Useful for sidebar layouts." },
    { prop: "collapsedSize", type: "number", description: "Size when collapsed. Usually 0 to hide completely or small value to show icon bar." }
  ]
};

export default function FragmentsPanel({ selected, onSelect, previewCode }: PropsPanelProps) {
  const [copied, setCopied] = useState(false);
  const items = Object.keys(propsData);

  const copyCode = () => {
    navigator.clipboard.writeText(previewCode[selected] || "");
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