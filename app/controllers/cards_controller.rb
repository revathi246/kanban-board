class CardsController < ApplicationController

  def index

    cards = Card.order(:position)

    grouped_cards = cards.group_by(&:status)

    render inertia: "inertia_example/index",
      props: {
        cards: grouped_cards
      }
  end

  def create

    Card.create!(
      card_params.merge(
        position: next_position
      )
    )

    redirect_to root_path
  end

  def update

    card = Card.find(params[:id])

    card.update!(
      card_params
    )

    redirect_to root_path
  end

  def destroy

    card = Card.find(params[:id])

    card.destroy!

    redirect_to root_path
  end

  private

  def card_params
    params.permit(
      :title,
      :description,
      :status
    )
  end

  def next_position
    (Card.maximum(:position) || 0) + 1000
  end
end