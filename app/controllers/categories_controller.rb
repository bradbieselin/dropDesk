class CategoriesController < ApplicationController

    def index
        categories = Category.all
        render json: categories, status: :ok
    end

    def show
        category = Category.find_by(id: params[:id])
        render json: category, status: :ok
    end

end
