json.extract! board, :id, :title, :created_at, :updated_at
json.lists board.lists, partial: 'api/lists/list', as: :list
json.members board.members, :id, :email 