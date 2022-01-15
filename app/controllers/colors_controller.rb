class ColorsController < ApplicationController
    def index 
        colors = Color.all
        render json: colors, include: :ratings, status: :ok
    end

    def show
        color = Color.find(params[:id])
          render json: color, status: :ok
      end

    def favorite
        colors = Color.all
        averages = colors.map { |color| 
           { name: color.name, average: color.ratings.map { |rating| rating.score }.inject(0.0) { |sum, el| sum + el } / color.ratings.size }
        }
        
        fav = averages.max_by do |element|
            element[:average]
        end

        render json: fav, status: :ok
        


        # averages.max {|a,b| a[:average] <=> b[:average] }
        # colors.map { |color| {
        #     color.ratings.map { |k,v| [ k , v ]}.to_h
        # }}

        # let scores = [.01]
        # let scoreTotal = 1
        # ratings.map(r => scores.push(r.score))
        # // console.log(name + ' scores:' + scores)
        # for(let i = 0; i < scores.length; i++) {
        #     scoreTotal += scores[i]
        # }
        # // console.log(name + ' score total:' + scoreTotal)
        # let averageScore = Math.round(scoreTotal / scores.length)

    end


end


#, include: :ratings