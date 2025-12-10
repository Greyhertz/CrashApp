import React from "react";
import { Sun, Moon } from "lucide-react";

export default function Header() {
  const [dark, setDark] = React.useState<boolean>(() =>
    document.documentElement.classList.contains("dark")
  );

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/30 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="rounded-lg px-3 py-1 text-sm font-semibold bg-clip-text text-transparent text-gradient">
          Shadcn Showcase
        </div>
        <nav className="hidden md:flex gap-4">
          <a className="text-sm hover:underline" href="/">Home</a>
          <a className="text-sm hover:underline" href="/demo/buttons">Buttons</a>
          <a className="text-sm hover:underline" href="/demo/inputs">Inputs</a>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <button
          aria-label="Toggle dark"
          onClick={() => setDark(d => !d)}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
}
