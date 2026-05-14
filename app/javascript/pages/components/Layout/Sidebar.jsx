import {
  LayoutDashboard,
  Activity,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export default function Sidebar({
  collapsed,
  setCollapsed,
}) {

  return (
    <aside
      className={`
        h-screen bg-white border-r border-slate-200
        transition-all duration-300 flex flex-col
        ${collapsed ? "w-16" : "w-56"}
      `}
    >

      {/* TOP */}
      <div className="border-b border-slate-100 py-3">

        {/* EXPANDED */}
        {!collapsed ? (

          <div className="flex items-center justify-between px-4">

            {/* Logo */}
            <div className="flex items-center gap-2.5">

              <div className="
                w-8 h-8
                rounded-xl
                bg-gradient-to-br
                from-indigo-600
                to-violet-500
                flex items-center justify-center
                shadow-md
              ">
                <span className="text-white font-bold text-xs">
                  K
                </span>
              </div>

              <div>
                <h1 className="text-base font-bold text-slate-900 leading-none">
                  Kanban
                </h1>

                <p className="text-[10px] text-slate-500 mt-1">
                  Workspace
                </p>
              </div>
            </div>

            {/* Collapse */}
            <button
              onClick={() => setCollapsed(true)}
              className="
                p-1.5 rounded-lg
                text-slate-500
                hover:bg-slate-100
                transition
              "
            >
              <PanelLeftClose size={16} />
            </button>
          </div>

        ) : (

          /* COLLAPSED */
          <div className="flex flex-col items-center gap-4">

            {/* Logo */}
            <div className="
              w-8 h-8
              rounded-xl
              bg-gradient-to-br
              from-indigo-600
              to-violet-500
              flex items-center justify-center
              shadow-md
            ">
              <span className="text-white font-bold text-xs">
                K
              </span>
            </div>

            {/* Expand */}
            <button
              onClick={() => setCollapsed(false)}
              className="
                p-1.5 rounded-lg
                text-slate-500
                hover:bg-slate-100
                transition
              "
            >
              <PanelLeftOpen size={16} />
            </button>
          </div>
        )}
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-2 py-4 space-y-2">

        {/* Dashboard */}
        <button
          className={`
            w-full flex items-center
            ${collapsed ? "justify-center" : "gap-3"}

            px-3 py-2
            rounded-lg

            bg-indigo-50
            text-indigo-700

            text-[13px]
            font-medium

            hover:bg-indigo-100
            transition
          `}
        >
          <LayoutDashboard size={16} />

          {!collapsed && (
            <span>Dashboard</span>
          )}
        </button>

        {/* Activity */}
        <button
          className={`
            w-full flex items-center
            ${collapsed ? "justify-center" : "gap-3"}

            px-3 py-2
            rounded-lg

            text-slate-600
            text-[13px]

            hover:bg-slate-100
            hover:text-slate-900

            transition
          `}
        >
          <Activity size={16} />

          {!collapsed && (
            <span>Activity Log</span>
          )}
        </button>

        {/* Settings */}
        <button
          className={`
            w-full flex items-center
            ${collapsed ? "justify-center" : "gap-3"}

            px-3 py-2
            rounded-lg

            text-slate-600
            text-[13px]

            hover:bg-slate-100
            hover:text-slate-900

            transition
          `}
        >
          <Settings size={16} />

          {!collapsed && (
            <span>Settings</span>
          )}
        </button>
      </nav>

      {/* PROFILE */}
      <div className="border-t border-slate-100 p-3">

        <div
          className={`
            flex items-center bg-slate-50 rounded-xl

            ${collapsed
              ? "justify-center p-2"
              : "gap-2.5 px-3 py-2"}
          `}
        >

          {/* Avatar */}
          <div className="
            w-8 h-8
            rounded-full
            bg-gradient-to-br
            from-indigo-600
            to-violet-500
            flex items-center justify-center
            text-white
            text-xs
            font-semibold
          ">
            R
          </div>

          {!collapsed && (
            <div>
              <p className="text-[13px] font-semibold text-slate-800 leading-none">
                Revathi
              </p>

              <p className="text-[10px] text-slate-500 mt-1">
                Full Stack Developer
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}