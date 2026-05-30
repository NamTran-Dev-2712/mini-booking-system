import { redirect } from "react-router";
import { featureFlags } from "~/config/feature-flags";

export { meta, default } from "~/features/user/ai-chat/ai-chat.page";

export function clientLoader() {
  if (!featureFlags.aiChat) throw redirect("/user");
  return null;
}
