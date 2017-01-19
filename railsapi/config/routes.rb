Rails.application.routes.draw do
  #Bots
  post 'msg_bot/receiveMsg' => 'msg_bot#receiveMsg'

  post 'chikka/receive' => 'chikka#receiveChikka'

  resources :evac_centers
  resources :stocks
  resources :pins
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :supplies

  get 'supplies/:id/pins' => 'supplies#showPins'
  get 'pins/:id/supplies' => 'pins#showSupplies'
end
