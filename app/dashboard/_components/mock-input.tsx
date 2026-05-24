type MockInputProps = {
  value: string;
  placeholder?: string;
};

export function MockInput({ value, placeholder }: MockInputProps) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      readOnly
      className="h-9 w-full rounded-md border border-white/10 bg-[#0b0d13] px-3 text-sm font-medium text-white/72 outline-none placeholder:text-white/30"
    />
  );
}
