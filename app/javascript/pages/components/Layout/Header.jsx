import { Plus } from "lucide-react";

export default function Header({
  onAddCard,
}) {

  return (
    <header className="flex items-center justify-between mb-4">

      {/* LEFT */}
      <div>

        <h1 className="
          text-2xl
          font-bold
          text-slate-900
          leading-tight
        ">
          Kanban Board
        </h1>

        <p className="
          mt-0.5
          text-xs
          text-slate-500
        ">
          Drag and drop cards to organize your workflow.
        </p>
      </div>

      {/* RIGHT */}
      {/* <button
        className="
          flex items-center gap-1.5

          px-3 py-2

          rounded-xl

          bg-gradient-to-r
          from-indigo-600
          to-violet-500

          text-white
          text-sm
          font-medium

          shadow-md
          shadow-indigo-200

          hover:opacity-95
          transition
        "
        onClick={onAddCard}
      >
        <Plus size={15} />

        <span>Add Card</span>
      </button> */}

    </header>
  );
}