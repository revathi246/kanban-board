import { useState } from "react";

import {
  MoreVertical,
  CalendarDays,
  Pencil,
  Trash2,
} from "lucide-react";

import { router } from "@inertiajs/react";

import CardModal from "../Modals/CardModal";

import {
  useSortable,
} from "@dnd-kit/sortable";

import {
  CSS,
} from "@dnd-kit/utilities";

export default function CardItem({
  card,
}) {

  const [showActions, setShowActions] =
    useState(false);

  const [editModal, setEditModal] =
    useState(false);

  // SORTABLE
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: String(card.id),
  });

  // STYLE
const style = {

transform:
  transform
    ? CSS.Transform.toString(
        transform
      )
    : undefined,

  transition,

opacity:
  isDragging
    ? 0
    : 1,
};

  // DATE
  const formattedDate = new Date(
    card.created_at
  ).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    }
  );

  return (
    <>
      {/* CARD */}
      <div
        ref={setNodeRef}

        style={style}

        className="
          bg-white
          border border-slate-200

          rounded-xl

          p-3

          shadow-sm

          hover:shadow-md
          transition

          relative
        "
      >

        {/* TOP */}
        <div
          className="
            flex items-start
            justify-between
            gap-2
          "
        >

          {/* DRAG HANDLE */}
          <div
            {...attributes}
            {...listeners}

            className="
              flex-1

              cursor-grab
              active:cursor-grabbing
            "
          >

            {/* TITLE */}
            <h3
              className="
                text-[13px]
                font-semibold
                text-slate-800
                leading-5
              "
            >
              {card.title}
            </h3>
          </div>

          {/* MENU */}
          <div className="relative">

            <button
              onClick={(e) => {

                e.stopPropagation();

                setShowActions(
                  !showActions
                );
              }}

              className="
                text-slate-400
                hover:text-slate-600
                transition
              "
            >
              <MoreVertical size={15} />
            </button>

            {/* DROPDOWN */}
            {showActions && (

              <div
                className="
                  absolute
                  right-0
                  top-6

                  w-28

                  bg-white

                  border border-slate-200

                  rounded-xl

                  shadow-lg

                  overflow-hidden

                  z-20
                "
              >

                {/* EDIT */}
                <button
                  onClick={(e) => {

                    e.stopPropagation();

                    setEditModal(true);

                    setShowActions(
                      false
                    );
                  }}

                  className="
                    w-full

                    flex items-center
                    gap-2

                    px-3 py-2

                    text-[12px]
                    text-slate-700

                    hover:bg-slate-50
                    transition
                  "
                >
                  <Pencil size={12} />

                  Edit
                </button>

                {/* DELETE */}
                <button
                  onClick={(e) => {

                    e.stopPropagation();

                    setShowActions(
                      false
                    );

                    if (
                      confirm(
                        "Delete this card?"
                      )
                    ) {

                      router.delete(
                        `/cards/${card.id}`
                      );
                    }
                  }}

                  className="
                    w-full

                    flex items-center
                    gap-2

                    px-3 py-2

                    text-[12px]
                    text-red-600

                    hover:bg-red-50
                    transition
                  "
                >
                  <Trash2 size={12} />

                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* DESCRIPTION */}
        <p
          className="
            mt-2

            text-[11px]
            leading-5

            text-slate-500
          "
        >
          {card.description}
        </p>

        {/* FOOTER */}
        <div
          className="
            flex items-center
            justify-between

            mt-3
          "
        >

          {/* AVATAR */}
          <div
            className="
              w-6 h-6

              rounded-full

              bg-gradient-to-br
              from-indigo-600
              to-violet-500

              flex items-center
              justify-center

              text-white
              text-[10px]
              font-semibold
            "
          >
            {card.title?.charAt(0)}
          </div>

          {/* DATE */}
          <div
            className="
              flex items-center
              gap-1

              text-[10px]
              text-slate-400
            "
          >
            <CalendarDays size={12} />

            <span>
              {formattedDate}
            </span>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      <CardModal
        open={editModal}

        onClose={() =>
          setEditModal(false)
        }

        mode="edit"

        initialData={card}

        onSubmit={(data) => {

          router.patch(
            `/cards/${card.id}`,
            {
              title:
                data.title,

              description:
                data.description,
            },

            {
              preserveScroll: true,

              onSuccess: () => {
                setEditModal(
                  false
                );
              },
            }
          );
        }}
      />
    </>
  );
}