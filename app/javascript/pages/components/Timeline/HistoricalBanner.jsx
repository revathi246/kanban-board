import {
  History,
  Lock,
} from "lucide-react";

export default function HistoricalBanner() {

  return (
    <div
      className="
        mt-4

        flex items-center justify-between

        bg-amber-50
        border border-amber-200

        rounded-2xl

        px-4 py-3
      "
    >

      {/* LEFT */}
      <div className="flex items-center gap-3">

        <div
          className="
            w-8 h-8

            rounded-xl

            bg-amber-100

            flex items-center justify-center
          "
        >
          <History
            size={15}
            className="text-amber-600"
          />
        </div>

        <div>
          <h3
            className="
              text-[13px]
              font-semibold
              text-amber-800
            "
          >
            Historical View Enabled
          </h3>

          <p
            className="
              text-[11px]
              text-amber-700
            "
          >
            Editing and drag actions are disabled.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div
        className="
          flex items-center gap-1

          text-[11px]
          text-amber-700
        "
      >
        <Lock size={12} />

        <span>Read Only</span>
      </div>
    </div>
  );
}