// src/pages/demos/form/index.tsx
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import PropsPanel from "@/components/demos/form-panel";

export default function FormDemo() { 
  const [darkMode, setDarkMode] = useState(false);
  const [selected, setSelected] = useState("Input");
  const [showProps, setShowProps] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      message: "",
      checkbox: false,
      switch: false,
      radio: "option1",
      select: "",
      calendar: new Date()
    }
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <main className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Form Components Demo</h1>
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowProps(!showProps)} 
                className="lg:hidden text-primary"
                variant="outline"
              >
                {showProps ? "Hide" : "Show"} Props
              </Button>
              <Button onClick={toggleDarkMode}>
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </Button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT PANEL: Live preview */}
            <section className="flex-1 space-y-6">
              <div className="space-y-6">
                {/* Input */}
                <Controller
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <div 
                      onClick={() => setSelected("Input")}
                      className={`p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 border-2 transition-all cursor-pointer hover:shadow-xl ${
                        selected === "Input" ? "border-blue-500" : "border-transparent"
                      }`}
                    >
                      <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-gray-100">
                        Email Address
                      </label>
                      <Input 
                        {...field} 
                        type="email"
                        placeholder="you@example.com" 
                        className="w-full"
                      />
                    </div>
                  )}
                />

                {/* Textarea */}
                <Controller
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <div 
                      onClick={() => setSelected("Textarea")}
                      className={`p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 border-2 transition-all cursor-pointer hover:shadow-xl ${
                        selected === "Textarea" ? "border-blue-500" : "border-transparent"
                      }`}
                    >
                      <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-gray-100">
                        Message
                      </label>
                      <Textarea 
                        {...field} 
                        placeholder="Type your message here..." 
                        className="w-full min-h-[100px] bg-secondary"
                      />
                    </div>
                  )}
                />

                {/* Checkbox */}
                <Controller
                  control={form.control}
                  name="checkbox"
                  render={({ field }) => (
                    <div 
                      onClick={() => setSelected("Checkbox")}
                      className={`p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 border-2 transition-all cursor-pointer hover:shadow-xl ${
                        selected === "Checkbox" ? "border-blue-500" : "border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          I accept the terms and conditions
                        </label>
                      </div>
                    </div>
                  )}
                />

                {/* Switch */}
                <Controller
                  control={form.control}
                  name="switch"
                  render={({ field }) => (
                    <div 
                      onClick={() => setSelected("Switch")}
                      className={`p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 border-2 transition-all cursor-pointer hover:shadow-xl ${
                        selected === "Switch" ? "border-blue-500" : "border-transparent"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Enable Email Notifications
                        </label>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    </div>
                  )}
                />

                {/* Radio */}
                <Controller
                  control={form.control}
                  name="radio"
                  render={({ field }) => (
                    <div 
                      onClick={() => setSelected("Radio")}
                      className={`p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 border-2 transition-all cursor-pointer hover:shadow-xl ${
                        selected === "Radio" ? "border-blue-500" : "border-transparent"
                      }`}
                    >
                      <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">
                        Choose your preference
                      </label>
                      <RadioGroup 
                        value={field.value}
                        onValueChange={field.onChange}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="option1" id="opt1" />
                          <label htmlFor="opt1" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">Option 1</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="option2" id="opt2" />
                          <label htmlFor="opt2" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">Option 2</label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                />

                {/* Select */}
                <Controller
                  control={ form.control }
                  name="select"
                  render={({ field }) => (
                    <div 
                      onClick={() => setSelected("Select")}
                      className={`p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 border-2 transition-all cursor-pointer hover:shadow-xl ${
                        selected === "Select" ? "border-blue-500" : "border-transparent"
                      }`}
                    >
                      <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-gray-100">
                        Select Your Country
                      </label>
                      <Select 
                        value={field.value}
                        onValueChange={ field.onChange }
                      >
                        <SelectTrigger className="w-full bg-secondary border-0">
                          <SelectValue placeholder="Choose a country"/>
                        </SelectTrigger>
                        <SelectContent className="bg-primary text-secondary border-0">
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="ng">Nigeria</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />
                {/* Calendar */}
                <Controller
                  control={form.control}
                  name="calendar"
                  render={({ field }) => (
                    <div 
                      onClick={() => setSelected("Calendar")}
                      className={`p-6 rounded-2xl shadow-lg dark:bg-gray-800 border-2 transition-all cursor-pointer hover:shadow-xl ${
                        selected === "Calendar" ? "border-blue-500" : "border-transparent"
                      }`}
                    >
                      <label className="block text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">
                        Select a Date
                      </label>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="rounded-md border mx-auto text-primary"
                      />
                    </div>
                  )}
                />

                <Button onClick={() => onSubmit(form.getValues())} className="w-full py-6 text-lg">
                  Submit Form
                </Button>
              </div>
              {/* Display current form values */}
              <div className="mt-6 p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">Current Form Values:</h2>
                <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-auto text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                  {JSON.stringify(form.watch(), null, 2)}
                </pre>
              </div>
            </section>

            {/* RIGHT PANEL: Props + explanations */}
            <section className={`lg:w-96 flex-shrink-0 ${showProps ? 'block' : 'hidden lg:block'}`}>
              <PropsPanel selected={selected} onSelect={setSelected} />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}