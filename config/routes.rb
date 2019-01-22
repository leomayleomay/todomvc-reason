Rails.application.routes.draw do
  resources :todo_items, only: [:index, :create]

  root 'pages#home'
end
