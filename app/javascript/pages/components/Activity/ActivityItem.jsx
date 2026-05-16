import {
  Plus,
  Pencil,
  Trash2,
  MoveRight,
  ArrowDownUp,
} from "lucide-react";
export default function ActivityItem({
  activity,
}) {

const iconMap = {

  move: (

    activity.message
      ?.toLowerCase()
      .includes("reordered")

      ? (

        <ArrowDownUp
          size={10}
          className="
            text-violet-600
          "
        />
      )

      : (

        <MoveRight
          size={10}
          className="
            text-blue-600
          "
        />
      )
  ),

  create: (
    <Plus
      size={10}
      className="
        text-green-600
      "
    />
  ),

  edit: (
    <Pencil
      size={10}
      className="
        text-amber-600
      "
    />
  ),

  delete: (
    <Trash2
      size={10}
      className="
        text-red-600
      "
    />
  ),
};

  const dateTime = new Date(
    activity.created_at
  ).toLocaleString([], {

    day: "2-digit",
    month: "short",

    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="
        flex items-center gap-1.5

        py-1.5

        border-b border-slate-100
        last:border-0
      "
    >

      {/* ICON */}
      <div
        className="
          w-5 h-5

          rounded-md

          bg-slate-100

          flex items-center justify-center

          shrink-0
        "
      >
        {iconMap[activity.action]}
      </div>

      {/* MESSAGE */}
      <p
        className="
          flex-1

          text-[10px]
          text-slate-700

          truncate
        "
      >
        {activity.message}
      </p>

      {/* TIME */}
      <span
        className="
          text-[8px]
          text-slate-400

          shrink-0
        "
      >
        {dateTime}
      </span>
    </div>
  );
}