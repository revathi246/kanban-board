import { useState } from "react";
import { router } from "@inertiajs/react";
import {
  Plus,
} from "lucide-react";

import CardItem from "./CardItem";

import CardModal from "../Modals/CardModal";

export default function BoardColumn({
  title,
  color,
  cards,
}) {

  const [openModal, setOpenModal] = useState(false);

  const colorStyles = {
    slate: {
      border: "border-slate-200",
      bg: "bg-slate-50",
      badge: "bg-slate-200 text-slate-700",
      button: "hover:bg-slate-100",
    },

    blue: {
      border: "border-blue-200",
      bg: "bg-blue-50",
      badge: "bg-blue-200 text-blue-700",
      button: "hover:bg-blue-100",
    },

    amber: {
      border: "border-amber-200",
      bg: "bg-amber-50",
      badge: "bg-amber-200 text-amber-700",
      button: "hover:bg-amber-100",
    },

    purple: {
      border: "border-purple-200",
      bg: "bg-purple-50",
      badge: "bg-purple-200 text-purple-700",
      button: "hover:bg-purple-100",
    },

    green: {
      border: "border-green-200",
      bg: "bg-green-50",
      badge: "bg-green-200 text-green-700",
      button: "hover:bg-green-100",
    },
  };

  const styles = colorStyles[color];

  return (
    <>
      {/* COLUMN */}
      <div
        className={`
          w-[250px]

          rounded-2xl
          border

          ${styles.border}
          ${styles.bg}

          p-3

          flex flex-col

          max-h-[78vh]
        `}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between mb-3">

          <div className="flex items-center gap-2">

            {/* COUNT */}
            <div
              className={`
                w-6 h-6

                rounded-full

                flex items-center justify-center

                text-[11px]
                font-semibold

                ${styles.badge}
              `}
            >
              {cards.length}
            </div>

            {/* TITLE */}
            <h2
              className="
                text-sm
                font-semibold
                text-slate-800
              "
            >
              {title}
            </h2>
          </div>
        </div>

        {/* ADD CARD */}
        <button
          onClick={() => setOpenModal(true)}
          className={`
            flex items-center justify-center gap-1.5

            w-full

            py-2
            mb-3

            rounded-xl

            bg-white

            border border-slate-200

            text-[13px]
            text-slate-600

            transition

            ${styles.button}
          `}
        >
          <Plus size={14} />

          <span>Add Card</span>
        </button>

        {/* CARDS */}
        <div
          className="
            flex-1
            overflow-y-auto
            space-y-2
          "
        >

          {cards.length > 0 ? (

            cards.map((card) => (
              <CardItem
                key={card.id}
                card={card}
              />
            ))

          ) : (

            <div
              className="
                flex items-center justify-center

                h-24

                rounded-xl

                border border-dashed border-slate-300

                text-xs
                text-slate-400
              "
            >
              No cards
            </div>
          )}
        </div>
      </div>

      <CardModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        mode="create"

        onSubmit={(cardData) => {

            router.post(
            "/cards",
            {
                title: cardData.title,
                description: cardData.description,
                status: title,
            },
            {
                preserveScroll: true,

                onSuccess: () => {
                setOpenModal(false);
                },

                onError: (errors) => {
                console.log(errors);
                },
            }
            );
        }}
      />
    </>
  );
}