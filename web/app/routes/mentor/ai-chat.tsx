import { redirect } from "react-router";
import { Bot } from "lucide-react";
import { featureFlags } from "~/config/feature-flags";

export function clientLoader() {
  if (!featureFlags.aiChat) throw redirect("/mentor");
  return null;
}

export function meta() {
  return [{ title: "AI Assistant — MiniBooking" }];
}

export default function MentorAiChat() {
  return (
    <div className="flex h-full flex-col space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">AI Assistant</h2>
        <p className="text-muted-foreground">
          Get guidance and insights to improve your mentoring.
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <Bot className="mb-4 size-10 text-muted-foreground/50" />
        <p className="text-sm font-medium text-muted-foreground">
          AI chat coming soon
        </p>
      </div>
    </div>
  );
}
