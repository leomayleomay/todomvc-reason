class TodoItemsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  def create
    @todo_item = TodoItem.create(todo_item_params)
  end

  protected

  def todo_item_params
    params.require(:todo_item).permit(:title, :completed)
  end
end
