import {
  Activity,
  ArrowRight,
  Pencil,
  Trash2,
  MoveRight,
} from "lucide-react";

export default function ActivityLog() {

  const activities = [
    {
      id: 1,
      type: "move",
      message: "Fix login bug → In Progress",
      time: "2m",
    },

    {
      id: 2,
      type: "create",
      message: "Onboarding created",
      time: "10m",
    },

    {
      id: 3,
      type: "edit",
      message: "API integration updated",
      time: "20m",
    },

    {
      id: 4,
      type: "delete",
      message: "Legacy cleanup deleted",
      time: "45m",
    },
  ];

  const iconMap = {
    move: (
      <MoveRight
        size={10}
        className="text-blue-600"
      />
    ),

    create: (
      <ArrowRight
        size={10}
        className="text-green-600"
      />
    ),

    edit: (
      <Pencil
        size={10}
        className="text-amber-600"
      />
    ),

    delete: (
      <Trash2
        size={10}
        className="text-red-600"
      />
    ),
  };

  return (
    <section
      className="
        bg-white
        border border-slate-200

        rounded-xl

        p-2.5
      "
    >

      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">

        {/* LEFT */}
        <div className="flex items-center gap-1.5">

          <div
            className="
              w-5 h-5

              rounded-md

              bg-indigo-50

              flex items-center justify-center
            "
          >
            <Activity
              size={10}
              className="text-indigo-600"
            />
          </div>

          <h3
            className="
              text-[11px]
              font-semibold
              text-slate-800
            "
          >
            Activity
          </h3>
        </div>

        {/* FILTER */}
        <button
          className="
            px-2 py-0.5

            rounded-md

            border border-slate-200

            text-[9px]
            text-slate-500
          "
        >
          All
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-1">

        {activities.map((activity) => (

          <div
            key={activity.id}
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
              {iconMap[activity.type]}
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
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}