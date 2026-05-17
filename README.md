=================1.Setup Instructions =================

================= Required Versions =================

Ruby 3.4.9
Rails 8.1.3
PostgreSQL 18.3

======================================================

Download and install Ruby with DevKit:

Install Ruby:
https://rubyinstaller.org/

---------------- Verify Installation ----------------

$ ruby -v

======================================================

Install Rails:

$ gem install rails

---------------- Verify Installation ----------------

$ rails -v

Expected Output:

Rails 8.1.3

======================================================

Install PostgreSQL:

https://www.postgresql.org/download/windows/

Make sure PostgreSQL service is running.

======================================================

-------------------- Clone Project -------------------

$ git clone <repository-url>

$ cd kanban

======================================================

---------------- Install Dependencies ----------------

$ bundle install

$ npm install

======================================================

---------------- Configure Database ------------------

Update PostgreSQL username and password in:

config/database.yml

======================================================

------------------ Create Database -------------------

$ rails db:create

======================================================

------------------- Run Migrations -------------------

$ rails db:migrate

======================================================

****************** Run Application *******************

--------------------- Terminal 1 ---------------------

$ rails s

--------------------- Terminal 2 ---------------------

$ bundle exec vite dev

======================================================

Open Application:

http://localhost:3000

======================================================



================= 2.Architecture Overview =================

The application uses two separate storage approaches:

1. Current board state storage
2. Historical event storage

This separation allows the system to support both fast live updates and historical timeline replay.

=========================================================

================= Card State Storage ====================

The current board state is stored in the `cards` table.

Each card contains:

- title
- description
- status
- position

The `status` field determines which column the card belongs to:

- Backlog
- To Do
- In Progress
- In Review
- Done

The `position` field maintains ordering of cards inside a column.

The `cards` table always represents the latest live board state.

This makes normal board rendering fast because the frontend can directly load the current cards without replaying history.

=========================================================

============== Historical Event Storage =================

All board actions are stored in the `board_events` table.

Supported event types:

- create
- edit
- move
- delete

Each event stores:

- event_type
- payload
- created_at timestamp

Example payload:

{
  "card_id": 12,
  "title": "Fix Timeline Bug",
  "status": "In Progress",
  "position": 2
}

Every user action creates a new immutable event.

Examples:

- Creating a card creates a `create` event
- Editing a card creates an `edit` event
- Dragging a card creates a `move` event
- Deleting a card creates a `delete` event

This creates a complete historical audit trail of the board.

=========================================================

========== Historical Board Reconstruction ==============

When the user moves the timeline slider:

1. Frontend sends a timestamp request:

/board/history?timestamp=...

2. Backend loads all events before that timestamp:

BoardEvent.where(
  "created_at <= ?",
  timestamp
)

3. Events are sorted chronologically.

4. The backend replays each event sequentially.

5. A temporary in-memory board is rebuilt.

Replay logic:

- create
  -> add card to board

- edit
  -> update existing card

- move
  -> move card between columns
     and update position

- delete
  -> remove card from board

6. After replay finishes, the reconstructed board is returned as JSON.

The frontend then renders the board in historical read-only mode.

This allows the application to display the exact board state at any moment in the past.

=========================================================

================ Why This Approach ======================

The project uses a lightweight event sourcing style architecture.

Advantages:

- Full historical tracking
- Accurate timeline replay
- Easy debugging
- Complete audit history
- Lower storage duplication
- Replayable board state

The current board remains fast because live state is stored separately in the `cards` table.

=========================================================

============= Alternatives Considered ===================

1. Full Snapshot Storage

Store the complete board after every change.

Pros:
- Faster historical loading

Cons:
- High storage usage
- Large duplicated data
- Expensive writes

---------------------------------------------------------

2. Soft Delete / Audit Columns

Store only latest row state with audit fields.

Pros:
- Simple implementation

Cons:
- Cannot reconstruct exact historical board states
- Weak timeline replay support

=========================================================

The chosen event replay approach provides better flexibility for historical timeline functionality while keeping the live board implementation simple and efficient.

=========================================================




================= 3.Scaling Discussion =================

The current implementation rebuilds historical board state by replaying all events before a selected timestamp.

For small and medium datasets this works well and keeps the implementation simple.

======================================================

============= Behavior with 100,000 Events ============

With 100,000 historical events on a single board:

- Historical replay becomes slower
- More memory is required
- Timeline requests take longer
- Backend replay cost increases
- Frontend loading may feel delayed

Currently the backend performs:

1. Load all events before timestamp
2. Replay events sequentially
3. Rebuild board state in memory
4. Return reconstructed board

With very large histories, replaying every event on every request would become inefficient.

======================================================

================ Production Improvements ===============

1. Snapshotting

The best improvement would be periodic board snapshots.

Example:

- Store a full board snapshot every 100 events
or
- Store snapshots every few minutes

Historical replay would then:

1. Load nearest snapshot
2. Replay only remaining recent events

This would significantly reduce replay time.

======================================================

2. Database Indexing

Indexes should be added on:

- created_at
- event_type
- card_id

This improves event filtering and replay queries.

======================================================

3. Pagination and Virtualization

Large activity logs should use:

- pagination
- infinite scrolling
- virtualized rendering

This reduces frontend rendering overhead.

======================================================

4. Background Processing

Board event creation could move to background jobs using:

- Sidekiq
- Solid Queue

This reduces request latency during heavy activity.

======================================================

5. Caching

Frequently accessed historical states could be cached using:

- Redis
- Memory cache

This avoids repeated event replay for common timestamps.

======================================================

6. Real-Time Synchronization

For multi-user collaboration, production systems could use:

- ActionCable
- AnyCable

to synchronize board updates in real time.

======================================================

The current architecture is suitable for development and moderate workloads.

For production-scale systems with very large histories, snapshotting and optimized replay strategies would be essential for maintaining fast historical timeline performance.

======================================================