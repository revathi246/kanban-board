import { useState } from "react";

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
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main */}
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

        {/* Header */}
        <Header />
        {/* Board */}
          <div className="xl:col-span-3">

            <Board cards={cards} />

          </div>
        {/* <HistoricalBanner /> */}

        {/* Timeline + Activity */}
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

          {/* Timeline */}
          <TimelineSlider />

          {/* Activity */}
          <ActivityLog
            activities={activities}
          />

        </div>
      </main>
    </div>
  );
}