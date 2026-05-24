"use client";

import * as React from "react";
import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import { Button } from "@/components/ui/button";
import type { WelcomeVariable } from "@/app/dashboard/_data/welcome-module-data";
import { cn } from "@/lib/utils";

export type EditorTab<T extends string> = {
  id: T;
  label: string;
};

export function EditorField({
  label,
  helper,
  children,
}: {
  label: string;
  helper?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-[0.18em] text-white/35">
        {label}
      </label>

      <div className="mt-2">{children}</div>

      {helper ? (
        <p className="mt-1.5 text-xs leading-5 text-white/32">{helper}</p>
      ) : null}
    </div>
  );
}

export function EditorInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-10 w-full rounded-md border border-white/10 bg-[#0b0d13] px-3 text-sm font-medium text-white/75 outline-none transition-colors placeholder:text-white/30 focus:border-primary/35",
        className,
      )}
    />
  );
}

export function EditorTextarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full resize-y rounded-md border border-white/10 bg-[#0b0d13] px-3 py-3 text-sm leading-6 text-white/78 outline-none transition-colors placeholder:text-white/30 focus:border-primary/35",
        className,
      )}
    />
  );
}

export function EditorOptionButton({
  active,
  children,
  className,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  className?: string;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick}
      className={cn(
        "h-9 cursor-pointer rounded-md border px-3 text-sm font-medium transition-colors",
        active
          ? "border-primary/35 bg-primary/14 text-white hover:bg-primary/18"
          : "border-white/10 bg-white/4 text-white/48 hover:bg-white/7 hover:text-white",
        className,
      )}
    >
      {children}
    </Button>
  );
}

export function ChannelSelect({
  defaultValue,
  options = ["#welcome", "#general", "#lobby", "#goodbye", "#logs"],
}: {
  defaultValue: string;
  options?: readonly string[];
}) {
  return (
    <select
      defaultValue={defaultValue}
      className="h-10 w-full rounded-md border border-white/10 bg-[#0b0d13] px-3 text-sm font-medium text-white/75 outline-none transition-colors focus:border-primary/35"
    >
      {options.map((option: string) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function WelcomeVariableList({
  variables,
}: {
  variables: WelcomeVariable[];
}) {
  return (
    <EditorField label="Variables">
      <div className="flex flex-wrap gap-2">
        {variables.map(([token, description]: WelcomeVariable) => (
          <span
            key={token}
            title={description}
            className="rounded-md border border-white/8 bg-[#101218]/80 px-2.5 py-1.5 text-xs text-white/48"
          >
            <code className="font-semibold text-primary">{token}</code>
            <span className="ml-1.5 hidden sm:inline">{description}</span>
          </span>
        ))}
      </div>
    </EditorField>
  );
}

export function EditorTabList<T extends string>({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: readonly EditorTab<T>[];
  activeTab: T;
  onTabChange: (tab: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1 rounded-md border border-white/8 bg-[#101218] p-1">
      {tabs.map((tab: EditorTab<T>) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "h-9 cursor-pointer rounded-md px-3 text-xs font-semibold transition-colors",
              isActive
                ? "bg-primary/80 text-white shadow-sm shadow-primary/20"
                : "text-white/48 hover:bg-white/7 hover:text-white",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export function NumberControl({
  label,
  defaultValue,
  step = 1,
  min = 0,
  max = 9999,
  helper,
}: {
  label: string;
  defaultValue: number;
  step?: number;
  min?: number;
  max?: number;
  helper?: string;
}) {
  const [value, setValue] = React.useState(defaultValue);

  function updateValue(nextValue: number) {
    const clampedValue = Math.min(max, Math.max(min, nextValue));
    setValue(Number(clampedValue.toFixed(2)));
  }

  const displayValue = Number.isInteger(value) ? value : value.toFixed(1);

  return (
    <EditorField label={label} helper={helper}>
      <div className="flex h-10 items-center overflow-hidden rounded-md border border-white/10 bg-[#0b0d13]">
        <button
          type="button"
          onClick={() => updateValue(value - step)}
          className="flex items-center justify-center w-10 h-full transition-colors border-r cursor-pointer border-white/8 text-white/45 hover:bg-white/7 hover:text-white"
        >
          -
        </button>

        <div className="flex items-center justify-center flex-1 min-w-0 px-3 text-sm font-semibold text-white/72">
          {displayValue}
        </div>

        <button
          type="button"
          onClick={() => updateValue(value + step)}
          className="flex items-center justify-center w-10 h-full transition-colors border-l cursor-pointer border-white/8 text-white/45 hover:bg-white/7 hover:text-white"
        >
          +
        </button>
      </div>
    </EditorField>
  );
}
