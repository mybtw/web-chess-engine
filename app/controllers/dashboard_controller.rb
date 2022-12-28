class DashboardController < ApplicationController
  def dashboard
    @games = Game.all
  end
end

