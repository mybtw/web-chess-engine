class Game < ApplicationRecord
  self.table_name = "games"
  self.primary_key = 'id'
end