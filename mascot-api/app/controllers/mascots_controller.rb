class MascotsController < ApplicationController

  def index 
    mascots = Mascot.all

    options =  {}
    options[:include] = [:team]
    render json: MascotSerializer.new(mascots, options).serializable_hash
  end
end
