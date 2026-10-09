"use client";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDateFormatter } from "@/registry/hooks/use-date-formatter";

type DateStyle = "full" | "long" | "medium" | "short";

// Fixed reference point keeps the relative output deterministic.
const REFERENCE_DATE = "2025-01-01";

export default function UseDateFormatterDemo() {
  const [date, setDate] = useState("2024-10-20");
  const [locale, setLocale] = useState("en-US");
  const [dateStyle, setDateStyle] = useState<DateStyle>("full");

  const { format, formatRelative } = useDateFormatter({ locale, dateStyle });

  return (
    <Card className="mx-auto w-full max-w-lg">
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="date-input">Date</Label>
            <Input
              id="date-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date-locale">Locale</Label>
            <Select value={locale} onValueChange={setLocale}>
              <SelectTrigger id="date-locale" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="de-DE">German</SelectItem>
                <SelectItem value="ja-JP">Japanese</SelectItem>
                <SelectItem value="hi-IN">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date-style">Style</Label>
            <Select
              value={dateStyle}
              onValueChange={(v) => setDateStyle(v as DateStyle)}
            >
              <SelectTrigger id="date-style" className="w-full">
                <SelectValue />
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

        <dl className="space-y-2 rounded-lg bg-muted p-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">format()</dt>
            <dd className="text-right font-medium">
              {format(date) || "Invalid date"}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">
              formatRelative() vs {REFERENCE_DATE}
            </dt>
            <dd className="text-right font-medium">
              {formatRelative(date, REFERENCE_DATE) || "Invalid date"}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
