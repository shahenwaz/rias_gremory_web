"use client";

import * as React from "react";
import type {
  BotMusicSettings,
  BotMusicSettingsPayload,
} from "@/app/dashboard/_data/bot-music-settings-data";

type MusicSettingsFormState = BotMusicSettingsPayload;

type MusicSettingsState = {
  config: BotMusicSettings | null;
  form: MusicSettingsFormState;
  isLoading: boolean;
  isSaving: boolean;
  errorMessage: string | null;
};

const emptyForm: MusicSettingsFormState = {
  stayEnabled: false,
  stayTextChannelId: null,
  stayVoiceChannelId: null,
  djModeEnabled: false,
  djRoleIds: [],
  setupEnabled: false,
  setupTextChannelId: null,
};

export function useMusicSettings(guildId: string) {
  const [state, setState] = React.useState<MusicSettingsState>({
    config: null,
    form: emptyForm,
    isLoading: true,
    isSaving: false,
    errorMessage: null,
  });

  React.useEffect(() => {
    let ignoreResponse = false;

    async function loadMusicSettings() {
      setState((currentState: MusicSettingsState) => ({
        ...currentState,
        isLoading: true,
        errorMessage: null,
      }));

      try {
        const response = await fetch(
          `/api/dashboard/guilds/${guildId}/music-settings`,
          {
            cache: "no-store",
          },
        );

        const data = (await response.json()) as
          | BotMusicSettings
          | {
              error?: string;
            };

        if (!response.ok) {
          throw new Error(
            "error" in data && data.error
              ? data.error
              : "Unable to load music settings.",
          );
        }

        if (!ignoreResponse) {
          applyConfig(data as BotMusicSettings);
        }
      } catch (error) {
        if (!ignoreResponse) {
          setState((currentState: MusicSettingsState) => ({
            ...currentState,
            isLoading: false,
            errorMessage:
              error instanceof Error
                ? error.message
                : "Unable to load music settings.",
          }));
        }
      }
    }

    loadMusicSettings();

    return () => {
      ignoreResponse = true;
    };
  }, [guildId]);

  function applyConfig(nextConfig: BotMusicSettings) {
    setState({
      config: nextConfig,
      form: createFormState(nextConfig),
      isLoading: false,
      isSaving: false,
      errorMessage: null,
    });
  }

  function updateForm(nextForm: Partial<MusicSettingsFormState>) {
    setState((currentState: MusicSettingsState) => ({
      ...currentState,
      form: {
        ...currentState.form,
        ...nextForm,
      },
    }));
  }

  function toggleDjRole(roleId: string) {
    setState((currentState: MusicSettingsState) => {
      const currentIds = currentState.form.djRoleIds;
      const nextIds = currentIds.includes(roleId)
        ? currentIds.filter((currentId: string) => currentId !== roleId)
        : [...currentIds, roleId];

      return {
        ...currentState,
        form: {
          ...currentState.form,
          djRoleIds: nextIds,
        },
      };
    });
  }

  function resetChanges() {
    if (!state.config) {
      return;
    }

    setState((currentState: MusicSettingsState) => ({
      ...currentState,
      form: createFormState(state.config as BotMusicSettings),
      errorMessage: null,
    }));
  }

  async function saveChanges() {
    if (!state.config) {
      return;
    }

    setState((currentState: MusicSettingsState) => ({
      ...currentState,
      isSaving: true,
      errorMessage: null,
    }));

    try {
      const response = await fetch(
        `/api/dashboard/guilds/${guildId}/music-settings`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state.form),
        },
      );

      const data = (await response.json()) as
        | BotMusicSettings
        | {
            error?: string;
          };

      if (!response.ok) {
        throw new Error(
          "error" in data && data.error
            ? data.error
            : "Unable to save music settings.",
        );
      }

      applyConfig(data as BotMusicSettings);
    } catch (error) {
      setState((currentState: MusicSettingsState) => ({
        ...currentState,
        isSaving: false,
        errorMessage:
          error instanceof Error
            ? error.message
            : "Unable to save music settings.",
      }));
    }
  }

  const hasChanges = state.config
    ? !areMusicSettingsEqual(state.form, createFormState(state.config))
    : false;

  return {
    ...state,
    hasChanges,
    updateForm,
    toggleDjRole,
    resetChanges,
    saveChanges,
  };
}

function createFormState(config: BotMusicSettings): MusicSettingsFormState {
  return {
    stayEnabled: config.stayEnabled,
    stayTextChannelId: config.stayTextChannelId,
    stayVoiceChannelId: config.stayVoiceChannelId,
    djModeEnabled: config.djModeEnabled,
    djRoleIds: config.djRoleIds,
    setupEnabled: config.setupEnabled,
    setupTextChannelId: config.setupTextChannelId,
  };
}

function areMusicSettingsEqual(
  firstSettings: MusicSettingsFormState,
  secondSettings: MusicSettingsFormState,
) {
  return (
    firstSettings.stayEnabled === secondSettings.stayEnabled &&
    firstSettings.stayTextChannelId === secondSettings.stayTextChannelId &&
    firstSettings.stayVoiceChannelId === secondSettings.stayVoiceChannelId &&
    firstSettings.djModeEnabled === secondSettings.djModeEnabled &&
    firstSettings.setupEnabled === secondSettings.setupEnabled &&
    firstSettings.setupTextChannelId === secondSettings.setupTextChannelId &&
    areStringListsEqual(firstSettings.djRoleIds, secondSettings.djRoleIds)
  );
}

function areStringListsEqual(firstList: string[], secondList: string[]) {
  if (firstList.length !== secondList.length) {
    return false;
  }

  const sortedFirstList = [...firstList].sort();
  const sortedSecondList = [...secondList].sort();

  return sortedFirstList.every(
    (item: string, index: number) => item === sortedSecondList[index],
  );
}
