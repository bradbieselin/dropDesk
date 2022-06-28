class TicketsController < ApplicationController

    def index
        tickets = Ticket.all
        render json: tickets, include: :user, status: :ok
    end

    def show
        ticket = Ticket.find_by(id: params[:id])
        render json: ticket, include: :user, status: :ok
    end

    def create 
        ticket = Ticket.create!(ticket_params)
        render json: ticket, status: :created
    end

    private

    def ticket_params
        params.permit(:title, :category_id, :user_id)
    end
end
