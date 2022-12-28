class DashboardController < ApplicationController
  def dashboard
    @game = Game.all
  end
end

