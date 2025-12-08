import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const items = [
  { name: "Buttons", path: "/demo/buttons" },
  { name: "Inputs", path: "/demo/inputs" },
  { name: "Forms", path: "/demo/forms" },
  { name: "Dialogs", path: "/demo/dialogs" },
  { name: "Menus", path: "/demo/menus" },
  { name: "Cards", path: "/demo/cards" },
  { name: "Tables", path: "/demo/tables" },
  { name: "Alerts", path: "/demo/alerts" },
  { name: "Tabs", path: "/demo/tabs" },
];

export default function Showcase() {
  return (
    <div className="p-10 grid md:grid-cols-3 gap-6">
      {items.map(item => (
        <Card key={item.name} className="hover:shadow-lg transition">
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link
              to={item.path}
              className="text-primary underline underline-offset-4"
            >
              View {item.name}
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
