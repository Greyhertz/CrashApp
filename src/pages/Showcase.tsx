import React from "react";
import Header from "@/components/Layout/Header";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card"; // <--- replace w/ your shadcn Card import

const demos = [
  { name: "Buttons", path: "/demo/buttons", desc: "All button variants & states" },
  { name: "Inputs", path: "/demo/inputs", desc: "Text fields, selects, etc." },
  { name: "Dialog", path: "/demo/dialog", desc: "Modal / Alerts / Confirm" },
  { name: "Side", path: "/demo/sidebar", desc: "Sidebar with nested navigation" },
  { name: "Form", path: "/demo/form", desc: "" },
  {name: "Data Display", path: "/demo/data-display", desc: "Tables, Cards, Carousels"}
];

export default function Showcase() {
  return (
    <>
      <Header />
      <main className="p-8 max-w-6xl mx-auto">
        <section className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2 text-gradient">Shadcn UI Showcase</h1>
          <p className="text-muted-foreground">Interactive demos of installed shadcn components.</p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((d, i) => (
            <motion.a
              key={d.name}
              href={d.path}
              whileHover={{ y: -6 }}
              className="card cursor-pointer"
            >
              {/* If you don't have Card component, tailwind card style will suffice */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{d.name}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{d.desc}</p>
                </div>
                <div className="ml-4 text-3xl">→</div>
              </div>
            </motion.a>
          ))}
        </section>
      </main>
    </>
  );
}
