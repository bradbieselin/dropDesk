class TicketsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        if params[:user_id]
            user = User.find(params[:user_id])
            render json: user.tickets, status: 200
        else
            tickets = Ticket.all
            render json: tickets, include: [:user, :category], status: 200
        end
    end

    def show
        ticket = Ticket.find_by(id: params[:id])
        render json: ticket, include: [:user, :category], status: 200
    end

    def create 
        ticket = Ticket.create!(ticket_params)
        render json: ticket, status: :created
    end

    def update
        ticket = Ticket.find_by(id: params[:id])
        ticket.update!(ticket_params)
        render json: ticket, status: 200
    end

    def destroy
        ticket = Ticket.find_by(id: params[:id])
        ticket.destroy
        head :no_content
    end

    private

    def ticket_params
        params.permit(:title, :description, :category_id, :user_id)
    end

    def render_not_found
        render json: {error: "Ticket Not Found"}, status: :not_found
    end

    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
end
