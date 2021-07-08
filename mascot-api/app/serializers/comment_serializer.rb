class CommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :comment_text, :username, :created_at
end
