class Game < ApplicationRecord
  self.table_name = "games"
  self.primary_key = 'id'

  validates :game, format: {with: /(\d{1,2})((?:(?:O-O[-0]?)|(?:[KQNBR][a-h]?x?[a-h]x?[1-8])|(?:[a-h]x?[a-h]?[1-8]))\+?)((?:(?:O-O[-0]?)|(?:[KQNBR][a-h]?x?[a-h]x?[1-8])|(?:[a-h]x?[a-h]?[1-8]))\+?)-*/, message: '%{value} неправильная нотация!'}
  def self.add_game(a, b)
    Game.create({id: Game.count+1, user_id: b, game: a})
  end
end