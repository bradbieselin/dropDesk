Rails.application.routes.draw do
  resources :categories, only: [:index, :show]
  resources :tickets
  resources :users, only: [:index, :show, :create]
 end