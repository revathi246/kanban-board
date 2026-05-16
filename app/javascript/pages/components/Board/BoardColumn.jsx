import { useState } from "react";

import { router } from "@inertiajs/react";

import {
  Plus,
} from "lucide-react";

import {
  useDroppable,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import CardItem from "./CardItem";

import CardModal from "../Modals/CardModal";

export default function BoardColumn({
  title,
  color,
  cards,
  historicalMode,
}) {

  const [openModal, setOpenModal] =
    useState(false);

  // DROPPABLE
  const {
    setNodeRef,
  } = useDroppable({
    id: title,
  });

  const colors = {

    slate:
      "border-slate-200 bg-slate-50",

    blue:
      "border-blue-200 bg-blue-50",

    amber:
      "border-amber-200 bg-amber-50",

    purple:
      "border-purple-200 bg-purple-50",

    green:
      "border-green-200 bg-green-50",
  };

  return (
    <>
    <div
      ref={setNodeRef}
      className={`
        w-[250px]
        rounded-2xl
        border
        ${colors[color]}
        p-3
        flex flex-col
        min-h-[500px]
        h-[78vh]
      `}
    >

        {/* HEADER */}
        <div
          className="
            flex items-center
            justify-between

            mb-3
          "
        >

          <h2
            className="
              text-sm
              font-semibold
            "
          >
            {title}
          </h2>

          <span
            className="
              text-xs
              text-slate-500
            "
          >
            {cards.length}
          </span>
        </div>

        {!historicalMode && (

          <button
            onClick={() =>
              setOpenModal(true)
            }

            className="
              flex items-center
              justify-center
              gap-1

              bg-white

              border
              border-slate-200

              rounded-xl

              py-2
              mb-3

              text-xs
            "
          >

            <Plus size={14} />

            Add Card

          </button>
        )}

        {/* SORTABLE */}
        <SortableContext
          items={cards.map(
            (card) => String(card.id)
          )}

          strategy={
            verticalListSortingStrategy
          }
        >

      <div
        className="
          flex-1
          min-h-[400px]
          overflow-y-auto
          space-y-2
          pr-1
        "
      >

            {cards.map((card) => (

              <CardItem
                key={card.id}
                card={card}
                historicalMode={
                  historicalMode
                }
              />
            ))}
          </div>
        </SortableContext>
      </div>

      {/* MODAL */}
      <CardModal
        open={openModal}

        onClose={() =>
          setOpenModal(false)
        }

        mode="create"

        onSubmit={(data) => {

          router.post(
            "/cards",

            {
              title:
                data.title,

              description:
                data.description,

              status: title,
            },

            {
              onSuccess: () =>
                setOpenModal(
                  false
                ),
            }
          );
        }}
      />
    </>
  );
}