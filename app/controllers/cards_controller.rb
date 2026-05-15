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
        .limit(20)

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

    Rails.logger.debug "ACTIVITY CREATED:"
    Rails.logger.debug message

    Rails.logger.debug "========== MOVE END =========="

    head :ok
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