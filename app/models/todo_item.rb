class TodoItem < ApplicationRecord
  validates :title, presence: true

  scope :completed, -> { where(completed: true) }
  scope :incompleted, -> { where(completed: false) }
end
