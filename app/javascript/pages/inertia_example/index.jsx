import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Sidebar from "../components/Layout/Sidebar";

import Header from "../components/Layout/Header";

import Board from "../components/Board/Board";

import TimelineSlider from "../components/Timeline/TimelineSlider";

import HistoricalBanner from "../components/Timeline/HistoricalBanner";

import ActivityLog from "../components/Activity/ActivityLog";

export default function Index({
  cards,
  activities,
}) {

  const [collapsed, setCollapsed] =
    useState(false);
  const [activityList, setActivityList] = useState(activities);

  // TIMELINE
  // OLDEST -> NEWEST
  const timelineActivities =
    useMemo(() => {

      return [...activities].sort(
        (a, b) =>

          new Date(
            a.created_at
          ) -

          new Date(
            b.created_at
          )
      );

    }, [activities]);

  // ACTIVITY LOG
  // NEWEST -> OLDEST
  // const activityList =
  //   useMemo(() => {

  //     return [...activities].sort(
  //       (a, b) =>

  //         new Date(
  //           b.created_at
  //         ) -

  //         new Date(
  //           a.created_at
  //         )
  //     );

  //   }, [activities]);
  useEffect(() => {

    setActivityList(activities);

  }, [activities]);
  console.log(activities)

  // LIVE BOARD
  const [boardData, setBoardData] =
    useState(cards);

  // HISTORICAL MODE
  const [historicalMode, setHistoricalMode] =
    useState(false);

  // DEFAULT -> LATEST
  const [selectedIndex, setSelectedIndex] =
    useState(
      Math.max(
        timelineActivities.length - 1,
        0
      )
    );

  // LIVE BOARD UPDATE
  useEffect(() => {

    if (!historicalMode) {

      setBoardData(cards);
    }

  }, [
    cards,
    historicalMode,
  ]);

  // SAFE INDEX
  useEffect(() => {

    if (
      selectedIndex >
      timelineActivities.length - 1
    ) {

      setSelectedIndex(
        Math.max(
          timelineActivities.length - 1,
          0
        )
      );
    }

  }, [timelineActivities]);

  // TIMELINE CHANGE
  const handleTimelineChange = (
    index
  ) => {

    setSelectedIndex(index);

    // LATEST = LIVE
    if (
      index ===
      timelineActivities.length - 1
    ) {

      setHistoricalMode(false);

      setBoardData(cards);

      return;
    }

    setHistoricalMode(true);

    const timestamp =
      timelineActivities[index]
        ?.created_at;

    if (!timestamp) return;

    fetch(
      `/board/history?timestamp=${timestamp}`
    )
    .then((res) =>
      res.json()
    )
    .then((data) => {

      setBoardData(data);
    })
    .catch((err) => {

      console.log(err);
    });
  };

  // LIVE MODE
  const handleLive = () => {

    setHistoricalMode(false);

    setBoardData(cards);

    setSelectedIndex(
      Math.max(
        timelineActivities.length - 1,
        0
      )
    );
  };

  return (
    <div
      className="
        flex
        h-screen

        bg-slate-50

        overflow-hidden
      "
    >

      {/* SIDEBAR */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* MAIN */}
      <main
        className="
          flex-1
          overflow-auto

          p-3
          sm:p-4
          lg:p-5

          transition-all
          duration-300
        "
      >

        {/* HEADER */}
        <Header />



        {/* BOARD */}
        <div
          className="
            xl:col-span-3
          "
        >

          <Board
            cards={boardData}
            setActivityList={
                setActivityList
            }
            historicalMode={
              historicalMode
            }
          />
        </div>
                {/* BANNER */}
        {historicalMode && (

          <HistoricalBanner
            selectedDate={
              timelineActivities[
                selectedIndex
              ]?.created_at
            }
          />
        )}

        {/* TIMELINE + ACTIVITY */}
        <div
          className="
            mt-4

            grid
            grid-cols-1
            xl:grid-cols-2

            gap-4

            items-start
          "
        >

          {/* TIMELINE */}
          <TimelineSlider
            events={
              timelineActivities
            }

            selectedIndex={
              selectedIndex
            }

            historicalMode={
              historicalMode
            }

            onTimelineChange={
              handleTimelineChange
            }

            onLive={
              handleLive
            }
          />

          {/* ACTIVITY */}
          <ActivityLog
            activities={
              activityList
            }
          />
        </div>
      </main>
    </div>
  );
}