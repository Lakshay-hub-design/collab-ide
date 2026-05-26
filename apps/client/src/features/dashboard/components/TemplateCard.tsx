import { motion } from "framer-motion";

type Props = {
  selected: boolean;

  title: string;

  description: string;

  icon: React.ElementType;

  onClick: () => void;
};

export default function TemplateCard({
  selected,
  title,
  description,
  icon: Icon,
  onClick,
}: Props) {
  return (
    <motion.button
      whileHover={{
        y: -4,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
      className={`
        relative p-4 rounded-2xl
        border transition-all
        text-left overflow-hidden
        ${
          selected
            ? "border-violet-500 bg-violet-500/10"
            : "border-[var(--border)] bg-[var(--panel)]"
        }
      `}
    >

      {/* GLOW */}
      {selected && (
        <div
          className="
            absolute inset-0
            bg-violet-500/10
          "
        />
      )}

      <div className="relative">

        <div
          className="
            h-12 w-12 rounded-2xl
            bg-gradient-to-br
            from-violet-500
            to-purple-600
            flex items-center
            justify-center
            text-white
          "
        >
          <Icon size={24} />
        </div>

        <h3
          className="
            mt-4 text-lg font-semibold
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-1 text-sm
            text-[var(--text-secondary)]
          "
        >
          {description}
        </p>

      </div>

    </motion.button>
  );
}