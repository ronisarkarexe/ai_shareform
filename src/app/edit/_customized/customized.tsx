import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { themes } from "@/app/_theme/theme";
const Customized = (props: { selectedTheme: (value: string) => void }) => {
  return (
    <div>
      <h1>Select Theme</h1>
      <Select onValueChange={(value) => props.selectedTheme(value)}>
        <SelectTrigger className="w-full bg-transparent">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {themes.map((theme, index) => (
            <SelectItem key={index} value={theme.name.toLowerCase()}>
              <div className="flex gap-2">
                <div className="flex">
                  <div
                    className="h-4 w-4"
                    style={{ backgroundColor: theme.primary }}
                  ></div>
                  <div
                    className="h-4 w-4"
                    style={{ backgroundColor: theme.secondary }}
                  ></div>
                  <div
                    className="h-4 w-4"
                    style={{ backgroundColor: theme.accent }}
                  ></div>
                  <div
                    className="h-4 w-4"
                    style={{ backgroundColor: theme.neutral }}
                  ></div>
                </div>
                {theme.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Customized;
