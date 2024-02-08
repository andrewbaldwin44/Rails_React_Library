Rails.application.routes.draw do
  root 'homepage#index'

  resource :session, only: [:create, :destroy]
  resource :users, only: [:create, :edit, :destroy]

  get '/book_search', to:'books#index'
  resource :books, only: [:create]

  get '/*path' => 'homepage#index'
end
