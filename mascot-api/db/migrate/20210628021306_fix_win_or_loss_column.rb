class FixWinOrLossColumn < ActiveRecord::Migration[6.1]
  def change
    rename_column :highlights, :win_or_loss, :highlight_type
  end
end
