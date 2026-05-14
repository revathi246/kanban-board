import {
  Clock3,
  RotateCcw,
} from "lucide-react";

export default function TimelineSlider({
  historicalMode = true,
}) {

  return (
    <section
      className="
        mt-4

        bg-white
        border border-slate-200

        rounded-2xl

        p-4
      "
    >

      {/* TOP */}
      <div className="flex items-center justify-between mb-3">

        {/* LEFT */}
        <div className="flex items-center gap-2">

          <div
            className="
              w-8 h-8

              rounded-xl

              bg-indigo-50

              flex items-center justify-center
            "
          >
            <Clock3
              size={15}
              className="text-indigo-600"
            />
          </div>

          <div>
            <h3 className="
              text-sm
              font-semibold
              text-slate-800
            ">
              Timeline
            </h3>

            <p className="
              text-[11px]
              text-slate-500
            ">
              View historical board state
            </p>
          </div>
        </div>

        {/* LIVE BUTTON */}
        {historicalMode && (
          <button
            className="
              flex items-center gap-1.5

              px-3 py-1.5

              rounded-lg

              bg-indigo-600

              text-white
              text-[12px]
              font-medium

              hover:bg-indigo-700
              transition
            "
          >
            <RotateCcw size={13} />

            <span>Live</span>
          </button>
        )}
      </div>

      {/* SLIDER */}
      <div>

        <input
          type="range"
          min="0"
          max="100"
          defaultValue="70"
          className="
            w-full
            accent-indigo-600
            cursor-pointer
          "
        />

        {/* DATES */}
        <div
          className="
            flex items-center justify-between

            mt-2

            text-[10px]
            text-slate-400
          "
        >
          <span>Board Created</span>

          <span>2 hrs ago</span>

          <span>Live</span>
        </div>
      </div>
    </section>
  );
}