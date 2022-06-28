class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
        users = User.all
        render json: users, include: :tickets, status: :ok
    end

    def show
        user = User.find_by(id: params[:id])
        render json: user, serializer: UserTicketsSerializer, status: :ok
    end

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end

    private

    def user_params
        params.permit(:name, :email)
    end

    def invalid
        render json: { error: 'User missing information' }, status: 422
    end

    def render_not_found_response 
        render json: { error: 'User not found' }, status: :not_found
    end 
end
