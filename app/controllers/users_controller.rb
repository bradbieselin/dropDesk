class UsersController < ApplicationController

    def index
        users = User.all
        render json: users, include: :tickets, status: :ok
    end

    def show
        user = User.find_by(id: params[:id])
        render json: user, include: :tickets, status: :ok
    end

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end

    private

    def user_params
        params.permit(:name, :email)
    end
end
