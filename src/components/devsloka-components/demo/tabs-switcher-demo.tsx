import React from "react";
import { BarChart3, CalendarClock, CheckCircle2, Circle, Clock, Users } from "lucide-react";
import { TabsSwitcher, type TabsSwitcherItem } from "@/registry/ui/tabs-switcher";

const tasks = [
  { title: "Draft onboarding emails", done: true },
  { title: "Review pricing page copy", done: true },
  { title: "QA mobile checkout flow", done: false },
  { title: "Prepare launch retro", done: false },
];

const workload = [
  { name: "Design", value: 72 },
  { name: "Engineering", value: 88 },
  { name: "Marketing", value: 45 },
  { name: "Support", value: 60 },
];

const schedule = [
  { time: "09:30", title: "Sprint planning", people: 6 },
  { time: "11:00", title: "Design review", people: 3 },
  { time: "14:15", title: "Customer interview", people: 2 },
];

function Panel({
  icon: Icon,
  heading,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-card p-5 text-card-foreground">
      <div className="mb-4 flex items-center gap-2 text-sm font-medium">
        <Icon className="size-4 text-muted-foreground" />
        {heading}
      </div>
      {children}
    </div>
  );
}

const items: TabsSwitcherItem[] = [
  {
    value: "tasks",
    title: "Track every task",
    description: "Break projects into tasks, assign owners and see what's done at a glance.",
    content: (
      <Panel icon={CheckCircle2} heading="This week">
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.title} className="flex items-center gap-3 rounded-lg border px-3 py-2 text-sm">
              {task.done ? (
                <CheckCircle2 className="size-4 text-primary" />
              ) : (
                <Circle className="size-4 text-muted-foreground" />
              )}
              <span className={task.done ? "text-muted-foreground line-through" : undefined}>
                {task.title}
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    ),
  },
  {
    value: "workload",
    title: "Balance the workload",
    description: "Spot overloaded teams early and rebalance before deadlines slip.",
    content: (
      <Panel icon={BarChart3} heading="Capacity by team">
        <ul className="space-y-3">
          {workload.map((team) => (
            <li key={team.name} className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span>{team.name}</span>
                <span className="text-muted-foreground tabular-nums">{team.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${team.value}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    ),
  },
  {
    value: "schedule",
    title: "Plan the day",
    description: "Meetings and focus time live next to the work they belong to.",
    content: (
      <Panel icon={CalendarClock} heading="Today">
        <ul className="divide-y rounded-lg border">
          {schedule.map((event) => (
            <li key={event.time} className="flex items-center gap-3 px-3 py-2.5 text-sm">
              <Clock className="size-4 text-muted-foreground" />
              <span className="w-12 tabular-nums text-muted-foreground">{event.time}</span>
              <span className="flex-1">{event.title}</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Users className="size-3.5" />
                {event.people}
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    ),
  },
];

const TabsSwitcherDemo: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <TabsSwitcher items={items} />
    </div>
  );
};

export default TabsSwitcherDemo;
