import BoardColumn from "./BoardColumn";

export default function Board({
  cards = {},
}) {

  const columns = [
    {
      id: "Backlog",
      title: "Backlog",
      color: "slate",
    },

    {
      id: "To Do",
      title: "To Do",
      color: "blue",
    },

    {
      id: "In Progress",
      title: "In Progress",
      color: "amber",
    },

    {
      id: "In Review",
      title: "In Review",
      color: "purple",
    },

    {
      id: "Done",
      title: "Done",
      color: "green",
    },
  ];

  return (
    <section className="overflow-x-auto">

      <div
        className="
          flex gap-3
          min-w-max
        "
      >

        {columns.map((column) => (

          <BoardColumn
            key={column.id}

            columnId={column.id}

            title={column.title}
            color={column.color}

            cards={cards[column.id] || []}
          />
        ))}
      </div>
    </section>
  );
}