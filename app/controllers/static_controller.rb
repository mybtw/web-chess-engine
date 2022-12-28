class StaticController < ApplicationController
  before_action :authenticate_user!

  def authenticate_user!
    redirect_to '/start/welcome_page' unless current_user
  end

  def index

  end
end