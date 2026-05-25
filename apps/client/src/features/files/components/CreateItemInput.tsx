type Props = {
  placeholder: string;

  value: string;

  onChange: (
    value: string
  ) => void;

  onSubmit: () => void;

  onCancel: () => void;
};

export default function CreateItemInput({
  placeholder,
  value,
  onChange,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <input
      autoFocus
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      onKeyDown={(e) => {
        if (
          e.key === "Enter" &&
          value.trim()
        ) {
          onSubmit();
        }

        if (e.key === "Escape") {
          onCancel();
        }
      }}
      placeholder={placeholder}
      className="
        w-full bg-[#0d1117]
        border border-[#30363d]
        rounded px-2 py-1
        text-sm outline-none
      "
    />
  );
}