// src/pages/demos/fragments-demo.tsx
import React, { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import FragmentsPanel from "@/components/demos/fragments-panel";
import { 
  Check, 
  ChevronsUpDown, 
  Bold, 
  Italic, 
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Home,
  ChevronRight
} from "lucide-react";

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

const tableData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User", status: "Active" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Admin", status: "Active" },
];

export default function FragmentsDemo(): JSX.Element {
  const [selected, setSelected] = useState<string>("combobox");
  const [dark, setDark] = useState<boolean>(false);
  const [showProps, setShowProps] = useState<boolean>(false);

  // Combobox state
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  // Toggle states
  const [boldPressed, setBoldPressed] = useState(false);
  const [italicPressed, setItalicPressed] = useState(false);
  const [underlinePressed, setUnderlinePressed] = useState(false);

  // Toggle Group state
  const [alignment, setAlignment] = useState("left");

  // Data Table filtering
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = tableData.filter(row => 
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const previewCode: Record<string, string> = {
    combobox: `import { Combobox } from "@/components/ui/combobox";

const [open, setOpen] = useState(false);
const [value, setValue] = useState("");

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button variant="outline" role="combobox">
      {value || "Select framework..."}
      <ChevronsUpDown className="ml-2 h-4 w-4" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-[200px] p-0">
    <Command>
      <CommandInput placeholder="Search..." />
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup>
        {frameworks.map((framework) => (
          <CommandItem
            key={framework.value}
            onSelect={() => {
              setValue(framework.value);
              setOpen(false);
            }}
          >
            <Check className={value === framework.value ? "mr-2" : "mr-2 invisible"} />
            {framework.label}
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  </PopoverContent>
</Popover>`,
    datatable: `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const data = [
  { id: 1, name: "John", email: "john@example.com" },
  { id: 2, name: "Jane", email: "jane@example.com" },
];

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((row) => (
      <TableRow key={row.id}>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.email}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
    breadcrumbs: `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/products">Products</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    toggle: `import { Toggle } from "@/components/ui/toggle";
import { Bold } from "lucide-react";

const [pressed, setPressed] = useState(false);

<Toggle 
  pressed={pressed}
  onPressedChange={setPressed}
  aria-label="Toggle bold"
>
  <Bold className="h-4 w-4" />
</Toggle>`,
    togglegroup: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const [value, setValue] = useState("left");

<ToggleGroup type="single" value={value} onValueChange={setValue}>
  <ToggleGroupItem value="left">
    <AlignLeft className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="center">
    <AlignCenter className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="right">
    <AlignRight className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`,
    resizable: `import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={50}>
    <div>Panel 1</div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>
    <div>Panel 2</div>
  </ResizablePanel>
</ResizablePanelGroup>`,
  };

  const toggleDark = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  const handlePreviewClick = (key: string) => setSelected(key);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${dark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-neutral-900 dark:text-neutral-100">
        <div className="max-w-7xl mx-auto p-6">
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Fragments — Interactive Demo</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Advanced UI components for complex interactions</p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => setShowProps(!showProps)} 
                className="lg:hidden"
                variant="outline"
              >
                {showProps ? "Hide" : "Show"} Props
              </Button>
              <Button onClick={toggleDark} variant="ghost">
                {dark ? "☀️ Light" : "🌙 Dark"}
              </Button>
            </div>
          </header>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT: Preview / interactive area */}
            <section className={`flex-1 space-y-6 overflow-auto ${showProps ? 'hidden lg:block' : 'block'}`}>
              
              {/* Breadcrumbs */}
              <div 
                onClick={() => handlePreviewClick("breadcrumbs")}
                className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-blue-500"
              >
                <h3 className="font-semibold mb-4">Breadcrumbs</h3>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#" className="flex items-center gap-1">
                        <Home className="h-4 w-4" />
                        Home
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Products</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Electronics</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbPage>Laptops</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              {/* Combobox */}
              <div 
                onClick={() => handlePreviewClick("combobox")}
                className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-blue-500"
              >
                <h3 className="font-semibold mb-4">Combobox (Searchable Select)</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Framework</label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {value
                            ? frameworks.find((framework) => framework.value === value)?.label
                            : "Select framework..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" onClick={(e) => e.stopPropagation()}>
                        <Command>
                          <CommandInput placeholder="Search framework..." />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {frameworks.map((framework) => (
                              <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                  setValue(currentValue === value ? "" : currentValue);
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${
                                    value === framework.value ? "opacity-100" : "opacity-0"
                                  }`}
                                />
                                {framework.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  {value && (
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
                      <p className="text-sm">
                        <strong>Selected:</strong> {frameworks.find(f => f.value === value)?.label}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Toggle & Toggle Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  onClick={() => handlePreviewClick("toggle")}
                  className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-blue-500"
                >
                  <h3 className="font-semibold mb-4">Toggle Buttons</h3>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Toggle 
                        pressed={boldPressed}
                        onPressedChange={(e) => {
                          setBoldPressed(e);
                        }}
                        aria-label="Toggle bold"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Bold className="h-4 w-4" />
                      </Toggle>
                      <Toggle 
                        pressed={italicPressed}
                        onPressedChange={setItalicPressed}
                        aria-label="Toggle italic"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Italic className="h-4 w-4" />
                      </Toggle>
                      <Toggle 
                        pressed={underlinePressed}
                        onPressedChange={setUnderlinePressed}
                        aria-label="Toggle underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Underline className="h-4 w-4" />
                      </Toggle>
                    </div>
                    <div className="text-sm space-y-1">
                      <p><strong>Bold:</strong> {boldPressed ? "On" : "Off"}</p>
                      <p><strong>Italic:</strong> {italicPressed ? "On" : "Off"}</p>
                      <p><strong>Underline:</strong> {underlinePressed ? "On" : "Off"}</p>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => handlePreviewClick("togglegroup")}
                  className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-blue-500"
                >
                  <h3 className="font-semibold mb-4">Toggle Group</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Text Alignment</label>
                      <ToggleGroup 
                        type="single" 
                        value={alignment} 
                        onValueChange={setAlignment}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ToggleGroupItem value="left" aria-label="Align left">
                          <AlignLeft className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="center" aria-label="Align center">
                          <AlignCenter className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="right" aria-label="Align right">
                          <AlignRight className="h-4 w-4" />
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                    <div className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-900 text-${alignment}`}>
                      <p className="text-sm">Sample text aligned to the {alignment}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="dark:bg-gray-800" />

              {/* Data Table */}
              <div 
                onClick={() => handlePreviewClick("datatable")}
                className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-blue-500"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Data Table with Search</h3>
                  <Badge>{filteredData.length} results</Badge>
                </div>
                <Input 
                  placeholder="Search by name or email..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4"
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="overflow-auto rounded-md border dark:border-neutral-700">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.length > 0 ? (
                        filteredData.map((row) => (
                          <TableRow key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                            <TableCell>{row.id}</TableCell>
                            <TableCell className="font-medium">{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>
                              <Badge variant={row.role === "Admin" ? "default" : "secondary"}>
                                {row.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={row.status === "Active" ? "default" : "destructive"}>
                                {row.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                            No results found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <Separator className="dark:bg-gray-800" />

              {/* Resizable Panels */}
              <div 
                onClick={() => handlePreviewClick("resizable")}
                className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-blue-500"
              >
                <h3 className="font-semibold mb-4">Resizable Panels</h3>
                <div className="border rounded-lg overflow-hidden" style={{ height: "300px" }}>
                  <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={50} minSize={30}>
                      <div className="h-full p-6 bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
                        <div className="text-center">
                          <h4 className="font-semibold mb-2">Panel 1</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Drag the handle to resize</p>
                        </div>
                      </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={50} minSize={30}>
                      <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={50} minSize={20}>
                          <div className="h-full p-6 bg-purple-50 dark:bg-purple-950 flex items-center justify-center">
                            <div className="text-center">
                              <h4 className="font-semibold mb-2">Panel 2A</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Nested vertical layout</p>
                            </div>
                          </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={50} minSize={20}>
                          <div className="h-full p-6 bg-green-50 dark:bg-green-950 flex items-center justify-center">
                            <div className="text-center">
                              <h4 className="font-semibold mb-2">Panel 2B</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Resize vertically</p>
                            </div>
                          </div>
                        </ResizablePanel>
                      </ResizablePanelGroup>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </div>
              </div>
            </section>

            {/* RIGHT: Props Panel */}
            <aside className={`lg:w-96 w-full flex-shrink-0 ${showProps ? 'block' : 'hidden lg:block'}`}>
              <FragmentsPanel selected={selected} onSelect={setSelected} previewCode={previewCode} />
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}