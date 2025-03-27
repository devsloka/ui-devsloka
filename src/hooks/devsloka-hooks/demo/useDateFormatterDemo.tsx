"use client";
import { useState } from "react";
import { useDateFormatter } from "@/hooks/devsloka-hooks/use-date-formatter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UseDateFormatterDemo() {
  const [dateInput, setDateInput] = useState("2023-10-20");
  const [locale, setLocale] = useState("en-US");
  const [format, setFormat] = useState("full");

  const formatDate = useDateFormatter(
    { dateStyle: format as "full" | "long" | "medium" | "short" },
    locale
  );

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">useDateFormatter</h1>
        <p className="text-muted-foreground">
          Format dates with different locales and styles
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Date Input</Label>
            <Input
              type="date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Locale</Label>
            <Select value={locale} onValueChange={setLocale}>
              <SelectTrigger>
                <SelectValue placeholder="Select locale" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="de-DE">German</SelectItem>
                <SelectItem value="ja-JP">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Format Style</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full</SelectItem>
                <SelectItem value="long">Long</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="short">Short</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-muted/20">
          <p className="text-lg font-medium">
            Formatted Date: {formatDate(dateInput)}
          </p>
        </div>
      </div>
    </div>
  );
}
