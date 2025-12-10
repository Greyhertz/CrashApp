// src/pages/demos/data-display-demo.tsx
import React, { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import PropsPanel from "@/components/demos/data-display-panel";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

// Recharts
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
} from "recharts";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

const chartData = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 55 },
  { name: "Mar", value: 30 },
  { name: "Apr", value: 70 },
  { name: "May", value: 60 },
];

export default function DataDisplayDemo(): JSX.Element {
  const [selected, setSelected] = useState<string>("cards");
  const [dark, setDark] = useState<boolean>(false);
  const [showProps, setShowProps] = useState<boolean>(false);
  
  // Slider state
  const [sliderValue, setSliderValue] = useState<number[]>([50]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 10;

  // preview code snippets for props panel

  const toggleDark = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  const handlePreviewClick = (key: string) => setSelected(key);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  return (
    <main className={`min-h-screen transition-colors duration-300 ${dark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-neutral-900 dark:text-neutral-100">
        <div className="max-w-7xl mx-auto p-6">
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold">Data Display — Interactive Demo</h1>
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
              {/* Cards area */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card 
                  className="cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-blue-500"
                  onClick={() => handlePreviewClick("cards")}
                >
                  <CardHeader>
                    <CardTitle>Total Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">$12,400</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge>+12%</Badge>
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">this month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card 
                  className="cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-blue-500"
                  onClick={() => handlePreviewClick("stats")}
                >
                  <CardHeader>
                    <CardTitle>Active Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">8,930</p>
                    <Progress value={45} className="mt-3" />
                  </CardContent>
                </Card>

                <Card 
                  className="cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-blue-500"
                  onClick={() => handlePreviewClick("cards")}
                >
                  <CardHeader>
                    <CardTitle>Conversion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">4.3%</p>
                    <Skeleton className="mt-3 h-4 w-2/3" />
                  </CardContent>
                </Card>
              </div>

              <Separator className="dark:bg-gray-800" />

              {/* Table preview */}
              <div 
                onClick={() => handlePreviewClick("table")} 
                className="rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-blue-500"
              >
                <h2 className="text-lg font-semibold mb-3">Table</h2>
                <div className="overflow-auto rounded-md border dark:border-neutral-700">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>John Doe</TableCell>
                        <TableCell>john@example.com</TableCell>
                        <TableCell><Badge>Active</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Sarah Lee</TableCell>
                        <TableCell>sarah@example.com</TableCell>
                        <TableCell><Badge variant="destructive">Banned</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Mike Johnson</TableCell>
                        <TableCell>mike@example.com</TableCell>
                        <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <Separator className="dark:bg-gray-800" />

              {/* Tabs / Carousel / Slider / Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div 
                  onClick={() => handlePreviewClick("tabs")} 
                  className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-blue-500"
                >
                  <h3 className="font-semibold mb-3">Tabs</h3>
                  <Tabs defaultValue="one">
                    <TabsList>
                      <TabsTrigger value="one">Tab One</TabsTrigger>
                      <TabsTrigger value="two">Tab Two</TabsTrigger>
                      <TabsTrigger value="three">Tab Three</TabsTrigger>
                    </TabsList>
                    <TabsContent value="one" className="mt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Content for tab one. This demonstrates the tab switching functionality.</p>
                    </TabsContent>
                    <TabsContent value="two" className="mt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Content for tab two with different information displayed.</p>
                    </TabsContent>
                    <TabsContent value="three" className="mt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Content for tab three showing more data.</p>
                    </TabsContent>
                  </Tabs>
                </div>

                <div 
                  onClick={() => handlePreviewClick("carousel")} 
                  className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-blue-500"
                >
                  <h3 className="font-semibold mb-3">Carousel</h3>
                  <div className="max-w-md mx-auto">
                    <Carousel>
                      <CarouselContent>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <CarouselItem key={i}>
                            <Card className="p-8 text-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">Slide {i}</div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Carousel item content</p>
                            </Card>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>
                </div>

                <div 
                  onClick={() => handlePreviewClick("slider")} 
                  className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-blue-500"
                >
                  <h3 className="font-semibold mb-3">Slider</h3>
                  <div className="space-y-4">
                    <Slider 
                      value={sliderValue}
                      onValueChange={setSliderValue}
                      max={100} 
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{sliderValue[0]}%</span>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSliderValue([0]);
                          }}
                        >
                          Min
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSliderValue([50]);
                          }}
                        >
                          Mid
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSliderValue([100]);
                          }}
                        >
                          Max
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => handlePreviewClick("charts")} 
                  className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-blue-500"
                >
                  <h3 className="font-semibold mb-3">Charts (Recharts)</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
                        <XAxis dataKey="name" className="text-xs" />
                        <YAxis className="text-xs" />
                        <ReTooltip 
                          contentStyle={{ 
                            backgroundColor: dark ? '#1f2937' : '#ffffff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }}
                        />
                        <Line type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <Separator className="dark:bg-gray-800" />

              {/* Pagination / Skeleton / Badges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  onClick={() => handlePreviewClick("pagination")} 
                  className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-blue-500"
                >
                  <h3 className="font-semibold mb-3">Pagination</h3>
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevPage();
                        }}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Previous
                      </Button>
                      <div className="flex items-center gap-2">
                        {[...Array(Math.min(5, totalPages))].map((_, i) => {
                          const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                          if (pageNum > totalPages) return null;
                          return (
                            <Button
                              key={pageNum}
                              variant={pageNum === currentPage ? "default" : "outline"}
                              size="sm"
                              className="w-10 h-10"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentPage(pageNum);
                              }}
                            >
                              {pageNum}
                            </Button>
                          );
                        })}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextPage();
                        }}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>
                </div>

                <div 
                  onClick={() => handlePreviewClick("skeleton")} 
                  className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-blue-500"
                >
                  <h3 className="font-semibold mb-3">Skeletons (Loading States)</h3>
                  <div className="space-y-3 animate-pulse animate">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-24 w-full" />
                    <div className="flex gap-2">
                      <Skeleton className="h-10 w-20" />
                      <Skeleton className="h-10 w-20" />
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => handlePreviewClick("badges")} 
                  className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 hover:border-blue-500 md:col-span-2"
                >
                  <h3 className="font-semibold mb-3">Badges</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>
                    <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">Warning</Badge>
                    <Badge className="bg-purple-500 hover:bg-purple-600">Premium</Badge>
                    <Badge className="bg-blue-500 hover:bg-blue-600">Info</Badge>
                  </div>

                </div>
  
             
              </div>
            </section>

            {/* RIGHT: Props Panel */}
            <aside className={`lg:w-96 w-full flex-shrink-0 ${showProps ? 'block' : 'hidden lg:block'}`}>
              <PropsPanel selected={selected} onSelect={setSelected} />
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}