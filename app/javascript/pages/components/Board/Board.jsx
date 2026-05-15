import {
  DndContext,
  closestCorners,
  DragOverlay,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  useState,
  useEffect,
} from "react";

import { router } from "@inertiajs/react";

import BoardColumn from "./BoardColumn";

// GROUP
const groupCards = (cards) => ({

  Backlog:
    cards?.Backlog || [],

  "To Do":
    cards?.["To Do"] || [],

  "In Progress":
    cards?.["In Progress"] || [],

  "In Review":
    cards?.["In Review"] || [],

  Done:
    cards?.Done || [],
});

export default function Board({
  cards = {},
}) {

  const columns = [

    {
      id: "Backlog",
      color: "slate",
    },

    {
      id: "To Do",
      color: "blue",
    },

    {
      id: "In Progress",
      color: "amber",
    },

    {
      id: "In Review",
      color: "purple",
    },

    {
      id: "Done",
      color: "green",
    },
  ];

  const [boardData, setBoardData] =
    useState(
      groupCards(cards)
    );

  const [activeCard, setActiveCard] =
    useState(null);

  useEffect(() => {

    setBoardData(
      groupCards(cards)
    );

  }, [cards]);

  // FIND COLUMN
  const findColumn = (id) => {

    if (boardData[id]) {
      return id;
    }

    return Object.keys(boardData)
      .find((columnId) =>
        boardData[columnId]?.some(
          (card) =>
            String(card.id) === String(id)
        )
      );
  };

  // DRAG START
  const handleDragStart = ({
    active,
  }) => {

    const activeId =
      String(active.id);

    const column =
      findColumn(activeId);

    if (!column) return;

    const card =
      boardData[column].find(
        (item) =>
          String(item.id) === activeId
      );

    setActiveCard(card);
  };

  // DRAG END
const handleDragEnd = async ({
  active,
  over,
}) => {

  setActiveCard(null);

  if (!over) return;

  try {

    const activeId =
      String(active.id);

    const overId =
      String(over.id);

    const activeColumn =
      findColumn(activeId);

    const overColumn =
      findColumn(overId);

    if (
      !activeColumn ||
      !overColumn
    ) {
      return;
    }

    const activeItems =
      boardData[activeColumn];

    const overItems =
      boardData[overColumn];

    const activeIndex =
      activeItems.findIndex(
        (item) =>
          String(item.id) === activeId
      );

    // IF DROPPED ON COLUMN
    let overIndex;

    if (boardData[overId]) {

      overIndex =
        overItems.length;

    } else {

      overIndex =
        overItems.findIndex(
          (item) =>
            String(item.id) === overId
        );

      if (overIndex < 0) {
        overIndex =
          overItems.length;
      }
    }

    // SAME COLUMN
    if (
      activeColumn ===
      overColumn
    ) {

      if (
        activeIndex !==
        overIndex
      ) {

        const reordered =
          arrayMove(
            activeItems,
            activeIndex,
            overIndex
          );

        setBoardData((prev) => ({
          ...prev,
          [activeColumn]:
            reordered,
        }));

        fetch(
          `/cards/${activeId}/move`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",

              "X-CSRF-Token":
                document
                  .querySelector(
                    'meta[name="csrf-token"]'
                  )
                  .content,
            },

            body: JSON.stringify({
              status:
                activeColumn,

              position:
                overIndex + 1,
            }),
          }
        )
        .catch((err) => {
          console.log(err);
        });
      }

    } else {

      const movingCard =
        activeItems[activeIndex];

      if (!movingCard) {
        return;
      }

      const updatedSource =
        activeItems.filter(
          (item) =>
            String(item.id) !== activeId
        );

      const updatedTarget =
        [...overItems];

      updatedTarget.splice(
        overIndex,
        0,
        {
          ...movingCard,
          status:
            overColumn,
        }
      );

      setBoardData((prev) => ({
        ...prev,
        [activeColumn]:
          updatedSource,
        [overColumn]:
          updatedTarget,
      }));

      fetch(
        `/cards/${activeId}/move`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",

            "X-CSRF-Token":
              document
                .querySelector(
                  'meta[name="csrf-token"]'
                )
                .content,
          },

          body: JSON.stringify({
            status:
              overColumn,

            position:
              overIndex + 1,
          }),
        }
      )
      .catch((err) => {
        console.log(err);
      });
    }

  } catch (error) {

    console.log(
      "Drag Error:",
      error
    );
  }
};

  return (

    <DndContext

      collisionDetection={
        closestCorners
      }

      onDragStart={
        handleDragStart
      }

      onDragEnd={
        handleDragEnd
      }
    >

      <SortableContext

        items={Object.keys(boardData)}

        strategy={
          horizontalListSortingStrategy
        }
      >

        <section
          className="
            overflow-x-auto
          "
        >

          <div
            className="
              flex gap-3
              min-w-max
            "
          >

            {columns.map((column) => (

              <BoardColumn
                key={column.id}

                title={column.id}

                color={column.color}

                cards={
                  boardData[
                    column.id
                  ] || []
                }
              />
            ))}
          </div>
        </section>
      </SortableContext>

      {/* OVERLAY */}
      <DragOverlay>

        {activeCard ? (

          <div
            className="
              bg-white
              border border-slate-200
              rounded-xl
              p-3
              shadow-xl
              w-[250px]
            "
          >

            <h3
              className="
                text-sm
                font-semibold
              "
            >
              {activeCard.title}
            </h3>

            <p
              className="
                text-xs
                text-slate-500
                mt-2
              "
            >
              {activeCard.description}
            </p>

          </div>

        ) : null}

      </DragOverlay>

    </DndContext>
  );
}