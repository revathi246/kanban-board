import { useState } from "react";

import {
  X,
} from "lucide-react";

export default function CardModal({
  open,
  onClose,
  mode = "create",
  onSubmit,
  initialData = {},
}) {

const [title, setTitle] = useState(
  initialData.title || ""
);

const [description, setDescription] = useState(
  initialData.description || ""
);

  if (!open) return null;

  const handleSubmit = () => {

    if (!title.trim()) return;

    onSubmit({
      title,
      description,
    });

    setTitle("");
    setDescription("");

    onClose();
  };

  return (
    <div
      className="
        fixed inset-0
        z-50

        flex items-center justify-center

        bg-black/30
        backdrop-blur-sm

        p-4
      "
    >

      {/* MODAL */}
      <div
        className="
          w-full
          max-w-md

          bg-white

          rounded-2xl

          shadow-2xl

          overflow-hidden
        "
      >

        {/* HEADER */}
        <div
          className="
            flex items-center justify-between

            px-4 py-3

            border-b border-slate-100
          "
        >

          <div>
            <h2
              className="
                text-sm
                font-semibold
                text-slate-800
              "
            >
              {mode === "create"
                ? "Create Card"
                : "Edit Card"}
            </h2>

            <p
              className="
                text-[11px]
                text-slate-500
                mt-0.5
              "
            >
              Manage your task details
            </p>
          </div>

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="
              p-1.5

              rounded-lg

              text-slate-500

              hover:bg-slate-100
              transition
            "
          >
            <X size={15} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 space-y-4">

          {/* TITLE */}
          <div>

            <label
              className="
                block

                text-[11px]
                font-medium
                text-slate-600

                mb-1.5
              "
            >
              Title
            </label>

            <input
              type="text"

              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }

              placeholder="Enter card title"

              className="
                w-full

                px-3 py-2.5

                rounded-xl

                border border-slate-200

                text-[13px]
                text-slate-700

                outline-none

                focus:border-indigo-400
                focus:ring-2
                focus:ring-indigo-100

                transition
              "
            />
          </div>

          {/* DESCRIPTION */}
          <div>

            <label
              className="
                block

                text-[11px]
                font-medium
                text-slate-600

                mb-1.5
              "
            >
              Description
            </label>

            <textarea
              rows="4"

              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }

              placeholder="Enter description..."

              className="
                w-full

                px-3 py-2.5

                rounded-xl

                border border-slate-200

                text-[13px]
                text-slate-700

                outline-none

                resize-none

                focus:border-indigo-400
                focus:ring-2
                focus:ring-indigo-100

                transition
              "
            />
          </div>
        </div>

        {/* FOOTER */}
        <div
          className="
            flex items-center justify-end gap-2

            px-4 py-3

            border-t border-slate-100
          "
        >

          {/* CANCEL */}
          <button
            onClick={onClose}
            className="
              px-3 py-2

              rounded-xl

              border border-slate-200

              text-[12px]
              text-slate-600

              hover:bg-slate-50
              transition
            "
          >
            Cancel
          </button>

          {/* SAVE */}
          <button
            onClick={handleSubmit}
            className="
              px-4 py-2

              rounded-xl

              bg-gradient-to-r
              from-indigo-600
              to-violet-500

              text-white
              text-[12px]
              font-medium

              hover:opacity-95
              transition
            "
          >
            {mode === "create"
              ? "Create"
              : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}