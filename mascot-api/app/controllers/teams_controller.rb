class TeamsController < ApplicationController

  def show 
    team = Team.find_by_id(params[:id])

    render json: TeamSerializer.new(team).as_json
  end

  def index 
    teams = Team.all
    options = {:include => [:mascot]}

    render json: TeamSerializer.new(teams, options).serializable_hash

  end
end
