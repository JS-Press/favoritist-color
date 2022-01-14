Rails.application.routes.draw do

  get '/favorite', to: 'colors#favorite'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/colors', to: 'colors#index'
  get '/colors/:id', to: 'colors#show'
  post '/users', to: 'users#create'
  get '/users/:id', to: 'users#show'

  resources :ratings
  resources :users, :only => [ :index, :post, :show ]
  






  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
