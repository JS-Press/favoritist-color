Rails.application.routes.draw do

  get '/favorite', to: 'colors#favorite'
  get '/average/:id', to: 'colors#average'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/colors', to: 'colors#index'
  get '/colors/:id', to: 'colors#show'
  post '/users', to: 'users#create'
  get '/me', to: 'sessions#show'
  # get '/users/:id', to: 'users#show'
  # delete '/ratings/:id', to: 'ratings#destroy'

  resources :ratings
  resources :users, :only => [ :index, :create, :show ]
  






  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
