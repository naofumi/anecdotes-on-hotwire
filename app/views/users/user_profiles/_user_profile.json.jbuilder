json.extract! user_profile, :id, :user_id, :name, :name_jp, :age, :created_at, :updated_at
json.url user_user_profile_url(user_profile.user_id, format: :json)