Rails.application.routes.draw do

  get 'sessions/create'
  get 'sessions/destroy'
  get '/colors', to: 'colors#index'
  post '/users', to: 'users#create'

  resources :ratings
  resources :users, :only => [ :index, :post, :show ]
  






  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
