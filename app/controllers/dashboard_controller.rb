class DashboardController < ApplicationController
  def dashboard
    @games = Game.where(user_id: current_user.id)
    @stats = Statistics.where(user_id: current_user.id)
  end
end

