Rails.application.routes.draw do
  resources :categories, only: [:index, :show]
  resources :tickets
  resources :users, only: [:index, :show, :create, :update]

  post '/signup', to: 'users#create'
  get '/me', to: 'users#me'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

 end