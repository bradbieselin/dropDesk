class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    skip_before_action :authorize, only: :create


    def index
        users = User.all
        render json: users, include: :tickets, status: :ok
    end

    def me
        render json: @current_user
    end

    def show
        user = User.find(params[:id])
        render json: user, status: :ok
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def update
        user = User.find_by(id: params[:id])
        user.update!(user_params)
        render json: user, status: 200
    end

    private

    def user_params
        params.permit(:username, :email, :password)
    end

    def render_not_found_response 
        render json: { error: 'User not found' }, status: :not_found
    end 
end
