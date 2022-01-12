class ColorsController < ApplicationController
    def index 
        colors = Color.all
        render json: colors, include: :ratings, status: :ok
    end


end


# include: :ratings