// src/pages/demos/form/props-panel.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

type PropsPanelProps = {
  selected: string;
  onSelect: (s: string) => void;
};

const propsData: Record<string, Array<{ prop: string; type: string; description: string }>> = {
  Input: [
    { prop: "type", type: "string", description: "Defines the input type - 'text', 'email', 'password', 'number', 'tel', 'url', 'search'. Controls keyboard on mobile and validation behavior." },
    { prop: "placeholder", type: "string", description: "Hint text displayed when input is empty. Disappears when user starts typing." },
    { prop: "disabled", type: "boolean", description: "When true, prevents user interaction and applies disabled styling. Field won't be included in form submission." },
    { prop: "value", type: "string", description: "Controlled value of the input. Use with onChange for controlled components." },
    { prop: "onChange", type: "(e) => void", description: "Event handler called when input value changes. Use e.target.value to get the new value." }
  ],
  Textarea: [
    { prop: "placeholder", type: "string", description: "Hint text shown when textarea is empty, useful for providing examples or format guidance." },
    { prop: "rows", type: "number", description: "Initial visible text rows. Default is usually 3-4. Textarea auto-expands if needed." },
    { prop: "disabled", type: "boolean", description: "Prevents editing when true. Useful for read-only display or during form submission." },
    { prop: "maxLength", type: "number", description: "Maximum number of characters allowed. Useful for limiting text input like tweets or descriptions." }
  ],
  Select: [
    { prop: "value", type: "string", description: "Currently selected value. Must match one of the SelectItem values. Empty string for no selection." },
    { prop: "onValueChange", type: "(value: string) => void", description: "Callback fired when selection changes. Receives the new selected value as parameter." },
    { prop: "disabled", type: "boolean", description: "Disables the entire select dropdown when true. User cannot open or change selection." },
    { prop: "defaultValue", type: "string", description: "Initial value for uncontrolled select. Use either defaultValue or value, not both." }
  ],
  Radio: [
    { prop: "value", type: "string", description: "Currently selected radio option's value. Only one option can be selected at a time." },
    { prop: "onValueChange", type: "(value: string) => void", description: "Called when user selects a different radio option. Receives the new selected value." },
    { prop: "disabled", type: "boolean", description: "Disables all radio options in the group. Individual RadioGroupItems can also be disabled separately." },
    { prop: "defaultValue", type: "string", description: "Initial selected value for uncontrolled radio group. Useful when you don't need to control state." }
  ],
  Checkbox: [
    { prop: "checked", type: "boolean | 'indeterminate'", description: "Controls checkbox state. True = checked, false = unchecked, 'indeterminate' = partial state (useful for 'select all' scenarios)." },
    { prop: "onCheckedChange", type: "(checked: boolean) => void", description: "Callback when checkbox is toggled. Receives new checked state as boolean." },
    { prop: "disabled", type: "boolean", description: "Prevents interaction when true. Checkbox appears grayed out and cannot be toggled." },
    { prop: "required", type: "boolean", description: "Marks checkbox as required in forms. Useful for terms acceptance or required consent checkboxes." }
  ],
  Switch: [
    { prop: "checked", type: "boolean", description: "Controls the switch state. True = ON (right), false = OFF (left). Use for binary settings." },
    { prop: "onCheckedChange", type: "(checked: boolean) => void", description: "Callback when switch is toggled. Receives new boolean state immediately." },
    { prop: "disabled", type: "boolean", description: "Disables the switch when true. Useful during loading states or when feature is unavailable." },
    { prop: "id", type: "string", description: "HTML id attribute. Connect to a label using htmlFor for better accessibility." }
  ],
  Calendar: [
    { prop: "mode", type: "'single' | 'multiple' | 'range'", description: "Selection mode: 'single' for one date, 'multiple' for several dates, 'range' for start/end date selection." },
    { prop: "selected", type: "Date | Date[] | {from: Date, to: Date}", description: "Selected date(s). Type depends on mode: Date for single, Date[] for multiple, object for range." },
    { prop: "onSelect", type: "(date) => void", description: "Called when user selects date(s). Parameter type matches the mode: Date, Date[], or range object." },
    { prop: "disabled", type: "Date[] | (date: Date) => boolean", description: "Array of disabled dates or function returning true for disabled dates. Useful for blocking past dates or specific days." },
    { prop: "fromDate", type: "Date", description: "Earliest selectable date. Dates before this are disabled. Useful for future-only date selection." },
    { prop: "toDate", type: "Date", description: "Latest selectable date. Dates after this are disabled. Useful for limiting date range." }
  ]
};

const previewCode : Record<string, string> = {
  Input: `<Controller
  control={form.control}
  name="email"
  render={({ field }) => (
    <div>
      <label>Email</label>
      <Input 
        {...field} 
        type="email"
        placeholder="you@example.com" 
      />
    </div>
  )}
/>`,
  Textarea: `<Controller
  control={form.control}
  name="message"
  render={({ field }) => (
    <div>
      <label>Message</label>
      <Textarea 
        {...field} 
        placeholder="Type here..."
        rows={4}
      />
    </div>
  )}
/>`,
  Checkbox: `<Controller
  control={form.control}
  name="checkbox"
  render={({ field }) => (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={field.value}
        onCheckedChange={field.onChange}
      />
      <label>Accept Terms</label>
    </div>
  )}
/>`,
  Switch: `<Controller
  control={form.control}
  name="switch"
  render={({ field }) => (
    <div className="flex items-center justify-between">
      <label>Enable Notifications</label>
      <Switch
        checked={field.value}
        onCheckedChange={field.onChange}
      />
    </div>
  )}
/>`,
  Radio: `<Controller
  control={form.control}
  name="radio"
  render={({ field }) => (
    <div>
      <label>Choose Option</label>
      <RadioGroup 
        value={field.value}
        onValueChange={field.onChange}
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem value="opt1" id="opt1" />
          <label htmlFor="opt1">Option 1</label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="opt2" id="opt2" />
          <label htmlFor="opt2">Option 2</label>
        </div>
      </RadioGroup>
    </div>
  )}
/>`,
  Select: `<Controller
  control={form.control}
  name="select"
  render={({ field }) => (
    <div>
      <label>Select Option</label>
      <Select 
        value={field.value}
        onValueChange={field.onChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Choose..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Option 1</SelectItem>
          <SelectItem value="2">Option 2</SelectItem>
          <SelectItem value="3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )}
/>`,
  Calendar: `<Controller
  control={form.control}
  name="calendar"
  render={({ field }) => (
    <div>
      <label>Select Date</label>
      <Calendar
        mode="single"
        selected={field.value}
        onSelect={field.onChange}
      />
    </div>
  )}
/>`
};

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