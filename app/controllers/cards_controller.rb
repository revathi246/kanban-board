class CardsController < ApplicationController

  # INDEX
  def index

    grouped_cards =
      Card
        .order(:status, :position)
        .group_by(&:status)

    activities =
      Activity
        .order(created_at: :desc)

    render inertia:
      "inertia_example/index",

      props: {

        cards:
          grouped_cards.as_json,

        activities:
          activities.as_json,
      }
      
  end

  # CREATE
  def create

    card = Card.create!(

      card_params.merge(
        position:
          next_position
      )
    )

    Activity.create!(
      card: card,

      action: "create",

      message:
        "#{card.title} created"
    )

    BoardEvent.create!(
      event_type: "create",

      payload: {
        card_id: card.id,

        title: card.title,

        description:
          card.description,

        status:
          card.status,

        position:
          card.position,
      }
    )
    redirect_to root_path

  end

  # UPDATE
  def update

    card =
      Card.find(params[:id])

    card.update!(
      card_params.slice(
        :title,
        :description
      )
    )

    Activity.create!(
      card: card,

      action: "edit",

      message:
        "#{card.title} updated"
    )
    BoardEvent.create!(
      event_type: "edit",

      payload: {
        card_id: card.id,

        title: card.title,

        description:
          card.description,
      }
    )
    redirect_to root_path

  end

  # DELETE
  def destroy

    card =
      Card.find(params[:id])

    Activity.create!(

      action: "delete",

      message:
        "#{card.title} deleted"
    )

    card.destroy!
    BoardEvent.create!(
      event_type: "delete",

      payload: {
        card_id: card.id,
      }
    )
    redirect_to root_path
  end

  # MOVE + REORDER
  def move

    Rails.logger.debug "========== MOVE START =========="
    Rails.logger.debug params.inspect

    card =
      Card.find(params[:id])

    old_status =
      card.status

    Rails.logger.debug "CARD BEFORE:"
    Rails.logger.debug({
      id: card.id,
      title: card.title,
      status: card.status,
      position: card.position,
    })

    card.update!(

      card_params.slice(
        :status,
        :position
      )
    )

    Rails.logger.debug "CARD AFTER:"
    Rails.logger.debug({
      id: card.id,
      title: card.title,
      status: card.status,
      position: card.position,
    })

    message =
      if old_status == card.status

        "#{card.title} reordered"

      else

        "#{card.title} moved from #{old_status} to #{card.status}"
      end

    Activity.create!(
      card: card,

      action: "move",

      message: message
    )
    BoardEvent.create!(
      event_type: "move",

      payload: {
        card_id: card.id,

        title: card.title,

        status:
          card.status,

        position:
          card.position,
      }
    )
    Rails.logger.debug "ACTIVITY CREATED:"
    Rails.logger.debug message

    Rails.logger.debug "========== MOVE END =========="

    head :ok
  end


  def history

    timestamp =
      Time.parse(
        params[:timestamp]
      )

    events =
      BoardEvent
        .where(
          "created_at <= ?",
          timestamp
        )
        .order(:created_at)

    board = {

      "Backlog" => [],

      "To Do" => [],

      "In Progress" => [],

      "In Review" => [],

      "Done" => [],
    }

    deleted_ids = []

    events.each do |event|

      payload =
        event.payload

      case event.event_type

      when "create"

        next if deleted_ids.include?(
          payload["card_id"]
        )

        board[
          payload["status"]
        ] << {

          id:
            payload["card_id"],

          title:
            payload["title"],

          description:
            payload["description"],

          status:
            payload["status"],

          position:
            payload["position"].to_f
        }

      when "edit"

        board.each do |_column, cards|

          card = cards.find do |c|

            c[:id] ==
              payload["card_id"]
          end

          next unless card

          card[:title] =
            payload["title"]

          card[:description] =
            payload["description"]
        end

      when "move"

        moved_card = nil

        board.each do |_column, cards|

          found = cards.find do |c|

            c[:id] ==
              payload["card_id"]
          end

          if found

            moved_card = found

            cards.delete(found)
          end
        end

        # CARD NOT FOUND
        unless moved_card

          moved_card = {

            id:
              payload["card_id"],

            title:
              payload["title"],

            description:
              payload["description"],

            status:
              payload["status"],

            position:
              payload["position"].to_f,
          }
        end

        moved_card[:status] =
          payload["status"]

        moved_card[:position] =
          payload["position"].to_f

        board[
          payload["status"]
        ] << moved_card

      when "delete"

        deleted_ids <<
          payload["card_id"]

        board.each do |_column, cards|

          cards.reject! do |card|

            card[:id] ==
              payload["card_id"]
          end
        end
      end
    end

    board.each do |_column, cards|

      cards.sort_by! do |card|

        card[:position]
      end
    end

    render json: board
  end

  private

  # STRONG PARAMS
  def card_params

    params.permit(
      :title,
      :description,
      :status,
      :position
    )
  end

  # NEXT POSITION
  def next_position

    (
      Card.maximum(
        :position
      ) || 0
    ) + 1
  end
end