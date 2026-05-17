import {
  Clock3,
  RotateCcw,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

export default function TimelineSlider({
  events = [],

  selectedIndex = 0,

  onTimelineChange,

  onLive,

  historicalMode = false,
}) {

  // SORT EVENTS
  const sortedEvents =
    useMemo(() => {

      return [...events].sort(
        (a, b) =>

          new Date(
            a.created_at
          ) -

          new Date(
            b.created_at
          )
      );

    }, [events]);

  const maxIndex =
    Math.max(
      sortedEvents.length - 1,
      0
    );

  // INTERNAL SLIDER
  const [internalIndex, setInternalIndex] =
    useState(maxIndex);

  // AUTO REFRESH
    // AUTO FIX LIVE MODE
  useEffect(() => {

    // if slider reaches latest
    // automatically exit
    // historical mode

    if (
      internalIndex >=
      maxIndex
    ) {

      onLive();
    }

  }, [
    internalIndex,
    maxIndex,
    onLive
  ]);
  // SYNC PARENT
  useEffect(() => {

    if (
      selectedIndex !==
      internalIndex
    ) {

      setInternalIndex(
        selectedIndex
      );
    }

  }, [
    selectedIndex,
    internalIndex
  ]);

  // CURRENT EVENT
  const selectedEvent =
    sortedEvents[
      internalIndex
    ];

  // FORMAT FULL DATE
  const formattedDate =
    selectedEvent

      ? new Date(
          selectedEvent.created_at
        ).toLocaleString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",

            hour: "2-digit",
            minute: "2-digit",
          }
        )

      : new Date().toLocaleString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",

            hour: "2-digit",
            minute: "2-digit",
          }
        );

  // TODAY
  const today =
    new Date();

  // YESTERDAY
  const yesterday =
    new Date();

  yesterday.setDate(
    today.getDate() - 1
  );

  // DYNAMIC LEFT DATE
  const oldestDate =
    sortedEvents.length > 0

      ? new Date(
          sortedEvents[0]
            .created_at
        ).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
          }
        )

      : yesterday.toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
          }
        );

  // DYNAMIC RIGHT DATE
  const latestDate =
    sortedEvents.length > 0

      ? new Date(
          sortedEvents[maxIndex]
            .created_at
        ).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
          }
        )

      : today.toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
          }
        );

  // SLIDER CHANGE
  const handleSliderChange = (
    e
  ) => {

    const value =
      Number(
        e.target.value
      );

    setInternalIndex(
      value
    );

    // IF LAST INDEX
    // => LIVE MODE
    if (
      value >= maxIndex
    ) {

      onLive();

      return;
    }

    // OTHERWISE
    // HISTORICAL
    onTimelineChange(
      value
    );
  };
  // LIVE BUTTON
  const handleBackToLive = () => {

    setInternalIndex(
      maxIndex
    );

    onLive();
  };

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

      {/* HEADER */}
      <div
        className="
          flex items-center
          justify-between
          mb-3
        "
      >

        {/* LEFT */}
        <div
          className="
            flex items-center
            gap-2
          "
        >

          <div
            className="
              w-8 h-8
              rounded-xl
              bg-indigo-50
              flex items-center
              justify-center
            "
          >

            <Clock3
              size={15}
              className="
                text-indigo-600
              "
            />
          </div>

          <div>

            <h3
              className="
                text-sm
                font-semibold
                text-slate-800
              "
            >
              Timeline
            </h3>

            <p
              className="
                text-[11px]
                text-slate-500
              "
            >
              Replay historical board state
            </p>
          </div>
        </div>

        {/* LIVE BUTTON */}
        <button
          onClick={
            handleBackToLive
          }

          disabled={internalIndex >= maxIndex}

          className={`
            flex items-center
            gap-1.5

            px-3 py-1.5

            rounded-lg

            text-white
            text-[12px]
            font-medium

            transition

            ${
              historicalMode

                ? `
                    bg-indigo-600
                    hover:bg-indigo-700
                  `

                : `
                    bg-slate-300
                    cursor-not-allowed
                  `
            }
          `}
        >

          <RotateCcw size={13} />

          <span>
            Live
          </span>
        </button>
      </div>

      {/* SLIDER */}
      <div>

        <input
          type="range"

          min="0"

          max={maxIndex}

          step="1"

          value={internalIndex}

          onChange={
            handleSliderChange
          }

          className="
            w-full
            accent-indigo-600
            cursor-pointer
          "
        />

        {/* DATES */}
        <div
          className="
            flex items-center
            justify-between

            mt-2

            text-[10px]
            text-slate-400
          "
        >

          {/* START */}
          <span>
            {oldestDate}
          </span>

          {/* CURRENT */}
          <span
            className="
              text-slate-600
              font-medium
            "
          >
            {formattedDate}
          </span>

          {/* END */}
          <span>
            {latestDate}
          </span>
        </div>

        {/* STATUS */}
        <div
          className="
            mt-2
            text-center
            text-[11px]
            font-medium
          "
        >

          {internalIndex < maxIndex ? (

            <span
              className="
                text-amber-600
              "
            >
              Historical Mode
            </span>

          ) : (

            <span
              className="
                text-green-600
              "
            >
              Live Mode
            </span>
          )}
        </div>
      </div>
    </section>
  );
}