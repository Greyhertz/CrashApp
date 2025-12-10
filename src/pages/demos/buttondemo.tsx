import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import PropsPanel from "@/components/demos/button-panel";
export default function ButtonsDemo() {
  return (
    <div className="p-10 space-y-10">
      <h1 className="text-3xl font-bold">Buttons — Full Demo</h1>

      {/* VARIANTS */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      {/* SIZES */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="flex flex-wrap gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* STATES */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">States</h2>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled</Button>

          <Button disabled className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading
          </Button>
        </div>
      </div>

      {/* WITH ICON */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">With Icons</h2>
        <div className="flex flex-wrap gap-4">
          <Button className="flex items-center gap-2">
            Continue <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <section></section>
    </div>


  );
}
