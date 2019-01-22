json.array! TodoItem.all do |item|
  json.title item.title
  json.completed item.completed
end