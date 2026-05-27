"use client";

import * as React from "react";
import type {
  BotServerConfig,
  BotTextChannel,
} from "@/app/dashboard/_data/bot-server-config-data";

export type ServerConfigSummaryStatus = "loading" | "ready" | "error";

type ConfigSummaryState = {
  status: ServerConfigSummaryStatus;
  config: BotServerConfig | null;
  errorMessage: string | null;
};

export function useServerConfigSummary(guildId: string) {
  const [state, setState] = React.useState<ConfigSummaryState>({
    status: "loading",
    config: null,
    errorMessage: null,
  });

  React.useEffect(() => {
    let ignoreResponse = false;

    async function loadServerConfigSummary() {
      setState({
        status: "loading",
        config: null,
        errorMessage: null,
      });

      try {
        const response = await fetch(
          `/api/dashboard/guilds/${guildId}/server-config`,
          {
            cache: "no-store",
          },
        );

        const data = (await response.json()) as
          | BotServerConfig
          | {
              error?: string;
            };

        if (!response.ok) {
          throw new Error(
            "error" in data && data.error
              ? data.error
              : "Unable to load server config.",
          );
        }

        if (!ignoreResponse) {
          setState({
            status: "ready",
            config: data as BotServerConfig,
            errorMessage: null,
          });
        }
      } catch (error) {
        if (!ignoreResponse) {
          setState({
            status: "error",
            config: null,
            errorMessage:
              error instanceof Error
                ? error.message
                : "Unable to load server config.",
          });
        }
      }
    }

    loadServerConfigSummary();

    return () => {
      ignoreResponse = true;
    };
  }, [guildId]);

  const textChannels = state.config?.textChannels ?? [];

  const commandReadyChannels = textChannels.filter(
    (channel: BotTextChannel) => channel.commandUsable !== false,
  );

  const disabledChannelCount = state.config?.disabledChannelIds.length ?? 0;

  const prefixLabel =
    state.status === "ready" ? state.config?.prefix || "." : "Loading";

  const channelAccessLabel =
    state.status === "ready"
      ? `${disabledChannelCount} disabled`
      : state.status === "error"
        ? "Unavailable"
        : "Loading";

  const commandReadyLabel =
    state.status === "ready"
      ? `${commandReadyChannels.length} ready`
      : state.status === "error"
        ? "Unavailable"
        : "Loading";

  const disabledChannelLabel =
    state.status === "ready"
      ? `${disabledChannelCount} disabled`
      : "Bot API status";

  return {
    ...state,
    prefixLabel,
    channelAccessLabel,
    commandReadyLabel,
    disabledChannelLabel,
  };
}
