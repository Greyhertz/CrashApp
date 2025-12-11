// src/components/demos/data-display-panel.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

type PropsPanelProps = {
  selected: string;
  onSelect: (s: string) => void;

};

const propsData: Record<string, Array<{ prop: string; type: string; description: string }>> = {
  cards: [
    { prop: "className", type: "string", description: "Additional CSS classes for styling the card container." },
    { prop: "children", type: "ReactNode", description: "Content to be rendered inside the card." }
  ],
  table: [
    { prop: "className", type: "string", description: "Additional CSS classes for the table element." },
    { prop: "children", type: "ReactNode", description: "TableHeader, TableBody, and TableFooter components containing table structure." }
  ],
  tabs: [
    { prop: "defaultValue", type: "string", description: "The value of the tab that should be active by default. Must match one of the TabsTrigger values." },
    { prop: "value", type: "string", description: "Controlled value of the active tab. Use with onValueChange for controlled tabs." },
    { prop: "onValueChange", type: "(value: string) => void", description: "Callback when the active tab changes. Receives the new tab value." },
    { prop: "orientation", type: "'horizontal' | 'vertical'", description: "Layout orientation of tabs. Horizontal displays tabs in a row, vertical in a column." }
  ],
  badges: [
    { prop: "variant", type: "'default' | 'secondary' | 'destructive' | 'outline'", description: "Visual style variant: default (primary color), secondary (muted), destructive (red/danger), outline (border only)." },
    { prop: "className", type: "string", description: "Additional CSS classes to customize badge appearance." },
    { prop: "children", type: "ReactNode", description: "Text or content displayed inside the badge." }
  ],
  progress: [
    { prop: "value", type: "number", description: "Current progress value between 0 and max. Controls the fill percentage of the progress bar." },
    { prop: "max", type: "number", description: "Maximum value for the progress bar. Default is 100. Progress is calculated as (value/max) * 100%." },
    { prop: "className", type: "string", description: "Additional CSS classes for styling the progress bar container." }
  ],
  slider: [
    { prop: "defaultValue", type: "number[]", description: "Initial value(s) for uncontrolled slider. Array with one number for single thumb, two for range slider." },
    { prop: "value", type: "number[]", description: "Controlled value(s) of the slider. Use with onValueChange for controlled slider." },
    { prop: "onValueChange", type: "(value: number[]) => void", description: "Callback fired when slider value changes. Receives array with current value(s)." },
    { prop: "min", type: "number", description: "Minimum value of the slider range. Default is 0." },
    { prop: "max", type: "number", description: "Maximum value of the slider range. Default is 100." },
    { prop: "step", type: "number", description: "Increment step size when moving the slider. Default is 1. Set to 0.1 for decimal values." },
    { prop: "disabled", type: "boolean", description: "Disables slider interaction when true. Slider appears grayed out." }
  ],
  carousel: [
    { prop: "orientation", type: "'horizontal' | 'vertical'", description: "Scroll direction of carousel. Horizontal slides left-right, vertical slides up-down." },
    { prop: "opts", type: "object", description: "Embla carousel options like loop (infinite scroll), align (start/center/end), skipSnaps, etc." },
    { prop: "plugins", type: "array", description: "Embla plugins for autoplay, fade effects, and other advanced features." },
    { prop: "setApi", type: "(api) => void", description: "Callback to access the Embla API for programmatic control (scrollTo, play, pause, etc)." }
  ],
  skeleton: [
    { prop: "className", type: "string", description: "CSS classes to control skeleton dimensions and styling. Common: 'h-4 w-full', 'h-20 w-20 rounded-full'." },
    { prop: "children", type: "ReactNode", description: "Optional content. Usually skeletons are self-closing but can wrap content for shimmer effects." }
  ],
  stats: [
    { prop: "N/A", type: "N/A", description: "Stats cards are typically composed of Card, CardHeader, CardTitle, and CardContent components with custom metrics displayed inside." }
  ],
  charts: [
    { prop: "data", type: "array", description: "Array of data objects for the chart. Each object should have keys matching the dataKey props of chart elements." },
    { prop: "width", type: "number | string", description: "Chart width. Use ResponsiveContainer for responsive charts that adapt to parent width." },
    { prop: "height", type: "number | string", description: "Chart height in pixels or percentage. Required for charts to render properly." },
    { prop: "margin", type: "object", description: "Spacing around chart: { top: 5, right: 30, left: 20, bottom: 5 }. Prevents labels from being cut off." }
  ],
  calendar: [
    { prop: "mode", type: "'single' | 'multiple' | 'range'", description: "Selection mode: 'single' for one date, 'multiple' for several dates, 'range' for start/end date selection." },
    { prop: "selected", type: "Date | Date[] | DateRange", description: "Selected date(s). Type depends on mode: Date for single, Date[] for multiple, {from: Date, to: Date} for range." },
    { prop: "onSelect", type: "(date) => void", description: "Called when user selects date(s). Parameter type matches the mode." },
    { prop: "disabled", type: "Date[] | (date: Date) => boolean", description: "Array of disabled dates or function returning true for disabled dates. Useful for blocking past dates or specific days." },
    { prop: "fromDate", type: "Date", description: "Earliest selectable date. Dates before this are disabled." },
    { prop: "toDate", type: "Date", description: "Latest selectable date. Dates after this are disabled." }
  ],
  pagination: [
    { prop: "currentPage", type: "number", description: "Currently active page number. Usually starts at 1." },
    { prop: "totalPages", type: "number", description: "Total number of pages available." },
    { prop: "onPageChange", type: "(page: number) => void", description: "Callback when user navigates to a different page. Receives new page number." },
    { prop: "disabled", type: "boolean", description: "Disables pagination controls when true. Useful during loading states." }
  ]
};

const previewCode: Record<string, string> = {
  cards: `<Card>
<CardHeader>
  <CardTitle>Title</CardTitle>
</CardHeader>
<CardContent>
  Card body content
</CardContent>
</Card>`,
  table: `<Table>
<TableHeader>
  <TableRow>
    <TableHead>Name</TableHead>
    <TableHead>Email</TableHead>
  </TableRow>
</TableHeader>
<TableBody>
  <TableRow>
    <TableCell>John</TableCell>
    <TableCell>john@mail.com</TableCell>
  </TableRow>
</TableBody>
</Table>`,
  tabs: `<Tabs defaultValue="one">
<TabsList>
  <TabsTrigger value="one">One</TabsTrigger>
  <TabsTrigger value="two">Two</TabsTrigger>
</TabsList>
<TabsContent value="one">
  Content for tab one
</TabsContent>
<TabsContent value="two">
  Content for tab two
</TabsContent>
</Tabs>`,
  badges: `<Badge>New</Badge>
<Badge variant="secondary">Beta</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Draft</Badge>`,
  progress: `<Progress value={60} max={100} />`,
  slider: `const [value, setValue] = useState([50]);

<Slider 
value={value}
onValueChange={setValue}
max={100}
step={1}
/>
<p>Value: {value[0]}</p>`,
  carousel: `<Carousel>
<CarouselContent>
  {items.map((item, i) => (
    <CarouselItem key={i}>
      <Card>{item}</Card>
    </CarouselItem>
  ))}
</CarouselContent>
<CarouselPrevious />
<CarouselNext />
</Carousel>`,
  skeleton: `<Skeleton className="h-6 w-1/2" />
<Skeleton className="h-4 w-1/3" />
<Skeleton className="h-24 w-full" />`,
  stats: `<Card>
<CardHeader>
  <CardTitle>Total Sales</CardTitle>
</CardHeader>
<CardContent>
  <p className="text-3xl font-bold">$12,400</p>
  <Badge>+12%</Badge>
</CardContent>
</Card>`,
  charts: `import { LineChart, Line, XAxis, YAxis } from "recharts";

<ResponsiveContainer width="100%" height={300}>
<LineChart data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Line type="monotone" dataKey="value" stroke="#7c3aed" />
</LineChart>
</ResponsiveContainer>`,
  pagination: `const [page, setPage] = useState(1);
const totalPages = 10;

<div className="flex items-center gap-4">
<Button 
  onClick={() => setPage(p => Math.max(1, p - 1))}
  disabled={page === 1}
>
  Previous
</Button>
<span>Page {page} of {totalPages}</span>
<Button 
  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
  disabled={page === totalPages}
>
  Next
</Button>
</div>`,
};

export default function PropsPanel({ selected, onSelect}: PropsPanelProps) {
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
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
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