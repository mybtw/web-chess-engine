class DashboardController < ApplicationController
  def dashboard
    @games = Game.where(user_id: current_user.id)
    @stats = Statistics.where(user_id: current_user.id)
  end
  def infos
    Game.add_game(params[:answer], current_user.id)
    redirect_to("/dashboard")
  end
end

