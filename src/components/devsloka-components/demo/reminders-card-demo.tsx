import { RemindersCard } from "@/registry/ui/reminders-card";

export default function RemindersCardDemo() {
  return (
    <RemindersCard
      title="Devsloka UI"
      listTitle="Ship list for today"
      defaultReminders={[
        { id: "profile-card", label: "Ship the Profile Card.", done: true },
        { id: "review-pr", label: "Review PRs on GitHub.", done: true },
        { id: "post-x", label: "Post the launch on X.", done: true },
        { id: "previews", label: "Regenerate component previews.", done: false },
        { id: "changelog", label: "Update devsloka.in changelog.", done: false },
      ]}
    />
  );
}
