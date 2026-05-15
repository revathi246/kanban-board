import {
  Activity,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import ActivityItem from "./ActivityItem";

export default function ActivityLog({
  activities = [],
}) {

  const [activityList, setActivityList] =
    useState(activities);

  const [page, setPage] =
    useState(1);

  const perPage = 6;

  useEffect(() => {

    setActivityList(
      [...activities].sort(
        (a, b) =>
          new Date(b.created_at) -
          new Date(a.created_at)
      )
    );

  }, [activities]);

  const totalPages =
    Math.ceil(
      activityList.length /
      perPage
    );

  const paginatedActivities =
    useMemo(() => {

      const start =
        (page - 1) * perPage;

      return activityList.slice(
        start,
        start + perPage
      );

    }, [
      activityList,
      page,
    ]);

  return (

    <section
      className="
        bg-white
        border border-slate-200

        rounded-xl

        h-[350px]

        flex
        flex-col

        p-2.5
      "
    >

      {/* HEADER */}
      <div
        className="
          flex
          items-center
          justify-between

          mb-2
        "
      >

        <div
          className="
            flex
            items-center
            gap-1.5
          "
        >

          <div
            className="
              w-5 h-5

              rounded-md

              bg-indigo-50

              flex
              items-center
              justify-center
            "
          >

            <Activity
              size={10}
              className="
                text-indigo-600
              "
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

        <span
          className="
            text-[10px]
            text-slate-400
          "
        >
          {activityList.length}
        </span>

      </div>

      {/* LIST */}
      <div
        className="
          flex-1

          overflow-y-auto

          space-y-1
        "
      >

        {paginatedActivities.map(
          (activity) => (

            <ActivityItem
              key={activity.id}
              activity={activity}
            />
          )
        )}

      </div>

      {/* PAGINATION */}
      <div
        className="
          pt-2
          mt-2

          border-t
          border-slate-100

          flex
          items-center
          justify-between
        "
      >

        <button
          onClick={() =>
            setPage((prev) =>
              Math.max(
                prev - 1,
                1
              )
            )
          }

          disabled={page === 1}

          className="
            h-6 w-6

            rounded-md
            border

            flex
            items-center
            justify-center

            disabled:opacity-40
          "
        >

          <ChevronLeft size={12} />

        </button>

        <span
          className="
            text-[10px]
            text-slate-500
          "
        >
          {page} / {totalPages || 1}
        </span>

        <button
          onClick={() =>
            setPage((prev) =>
              Math.min(
                prev + 1,
                totalPages
              )
            )
          }

          disabled={
            page === totalPages ||
            totalPages === 0
          }

          className="
            h-6 w-6

            rounded-md
            border

            flex
            items-center
            justify-center

            disabled:opacity-40
          "
        >

          <ChevronRight size={12} />

        </button>

      </div>

    </section>
  );
}