Rails.application.routes.draw do
  devise_for :users
  get 'persons/profile'
  get 'static/index'
  get 'start/welcome_page'
  get 'dashboard/dashboard'
  post '/infos', to: 'dashboard#infos'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'start#welcome_page'

end
