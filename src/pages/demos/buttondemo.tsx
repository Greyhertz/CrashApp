// src/pages/demos/buttons-demo.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, Download, Mail, Plus, Trash2, Settings } from "lucide-react";
import ButtonPanel from "@/components/demos/button-panel";

export default function ButtonsDemo() {
  const [selected, setSelected] = useState<string>("variants");
  const [dark, setDark] = useState<boolean>(false);
  const [showProps, setShowProps] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const previewCode: Record<string, string> = {
    variants: `import { Button } from "@/components/ui/button";

// Default (Primary)
<Button>Default</Button>

// Secondary (Muted)
<Button variant="secondary">Secondary</Button>

// Destructive (Danger/Delete)
<Button variant="destructive">Destructive</Button>

// Outline (Border only)
<Button variant="outline">Outline</Button>

// Ghost (Transparent with hover)
<Button variant="ghost">Ghost</Button>

// Link (Text link style)
<Button variant="link">Link</Button>`,
    sizes: `import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Small
<Button size="sm">Small</Button>

// Default (Medium)
<Button size="default">Default</Button>

// Large
<Button size="lg">Large</Button>

// Icon (Square)
<Button size="icon">
  <ArrowRight className="h-4 w-4" />
</Button>`,
    states: `import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Disabled
<Button disabled>Disabled</Button>

// Loading state
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading
</Button>

// With click handler
<Button onClick={() => console.log('Clicked!')}>
  Click Me
</Button>`,
    icons: `import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Mail } from "lucide-react";

// Icon on the right
<Button>
  Continue
  <ArrowRight className="ml-2 h-4 w-4" />
</Button>

// Icon on the left
<Button>
  <Mail className="mr-2 h-4 w-4" />
  Send Email
</Button>

// Icon only
<Button size="icon">
  <Download className="h-4 w-4" />
</Button>`,
    events: `import { Button } from "@/components/ui/button";
import { useState } from "react";

const [count, setCount] = useState(0);

<Button onClick={() => setCount(count + 1)}>
  Clicked {count} times
</Button>

<Button 
  onMouseEnter={() => console.log('Hovered')}
  onFocus={() => console.log('Focused')}
>
  Hover or Focus Me
</Button>`
  };

  const toggleDark = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  const handlePreviewClick = (key: string) => setSelected(key);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <main className={`min-h-screen transition-colors duration-300 ${dark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-neutral-900 dark:text-neutral-100">
        <div className="max-w-7xl mx-auto p-6">
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Buttons — Interactive Demo</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Complete button component showcase</p>
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
              
              {/* VARIANTS */}
              <div 
                onClick={() => handlePreviewClick("variants")}
                className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-blue-500"
              >
                <h2 className="text-xl font-semibold mb-4">Variants</h2>
                <div className="flex flex-wrap gap-4">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                  Choose from 6 different visual styles to match your UI needs
                </p>
              </div>

              {/* SIZES */}
              <div 
                onClick={() => handlePreviewClick("sizes")}
                className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-blue-500"
              >
                <h2 className="text-xl font-semibold mb-4">Sizes</h2>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                  4 sizes available: small, default, large, and icon-only square buttons
                </p>
              </div>

              {/* STATES */}
              <div 
                onClick={() => handlePreviewClick("states")}
                className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-blue-500"
              >
                <h2 className="text-xl font-semibold mb-4">States</h2>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <Button disabled>Disabled</Button>
                    <Button disabled variant="secondary">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading
                    </Button>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        simulateLoading();
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Click to Load"
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Buttons can be disabled or show loading states during async operations
                  </p>
                </div>
              </div>

              {/* WITH ICONS */}
              <div 
                onClick={() => handlePreviewClick("icons")}
                className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-blue-500"
              >
                <h2 className="text-xl font-semibold mb-4">With Icons</h2>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <Button>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </Button>
                    <Button variant="secondary">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button size="icon" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Combine buttons with Lucide icons for enhanced visual communication
                  </p>
                </div>
              </div>

              {/* COMBINATIONS */}
              <div 
                onClick={() => handlePreviewClick("events")}
                className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-blue-500"
              >
                <h2 className="text-xl font-semibold mb-4">Interactive Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Action buttons */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</h3>
                    <div className="space-y-2">
                      <Button className="w-full" onClick={(e) => e.stopPropagation()}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create New
                      </Button>
                      <Button className="w-full" variant="outline" onClick={(e) => e.stopPropagation()}>
                        <Download className="mr-2 h-4 w-4" />
                        Export Data
                      </Button>
                      <Button className="w-full" variant="destructive" onClick={(e) => e.stopPropagation()}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete All
                      </Button>
                    </div>
                  </div>

                  {/* Small actions */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Compact Actions</h3>
                    <div className="space-y-2">
                      <Button size="sm" className="w-full" onClick={(e) => e.stopPropagation()}>
                        Save Changes
                      </Button>
                      <Button size="sm" className="w-full" variant="secondary" onClick={(e) => e.stopPropagation()}>
                        Cancel
                      </Button>
                      <Button size="sm" className="w-full" variant="ghost" onClick={(e) => e.stopPropagation()}>
                        Reset Form
                      </Button>
                    </div>
                  </div>

                  {/* Icon buttons */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Icon Toolbar</h3>
                    <div className="flex gap-2">
                      <Button size="icon" variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Call to action */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Call to Action</h3>
                    <Button size="lg" className="w-full" onClick={(e) => e.stopPropagation()}>
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button size="lg" variant="outline" className="w-full" onClick={(e) => e.stopPropagation()}>
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* RIGHT: Props Panel */}
            <aside className={`lg:w-96 w-full flex-shrink-0 ${showProps ? 'block' : 'hidden lg:block'}`}>
              <ButtonPanel selected={selected} onSelect={setSelected} previewCode={previewCode} />
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}