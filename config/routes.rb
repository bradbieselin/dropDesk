Rails.application.routes.draw do
  resources :categories, only: [:index, :show]
  resources :tickets, only: [:index, :show, :create]
  resources :users, only: [:index, :show, :create]
 end