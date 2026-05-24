type MockSelectProps = {
  value: string;
  options: string[];
};

export function MockSelect({ value, options }: MockSelectProps) {
  return (
    <select
      value={value}
      disabled
      className="h-9 w-full rounded-md border border-white/10 bg-[#0b0d13] px-3 text-sm font-medium text-white/72 outline-none disabled:cursor-not-allowed disabled:opacity-100"
    >
      {options.map((option: string) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
