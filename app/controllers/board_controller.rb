class BoardController < ApplicationController
  respond_to :json
  def create
  	@score = board.new(:name => params[:name], :score => params[:score])
    if @score.save
        respond_to do |format|
        format.json { render :json => @score, :status => :created, :location => @score }
      end
    end
  end

  def index
    respond_with(@scores = board.all)
  end

end
