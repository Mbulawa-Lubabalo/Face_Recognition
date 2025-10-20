import requests



def API():

    SUPABASE_URL = "https://qktipwezlmrjkezunhnx.supabase.co"
    SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrdGlwd2V6bG1yamtlenVuaG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MzAyOTcsImV4cCI6MjA3NjQwNjI5N30.Kgt5yUFrmKVKK6YoPVSM8Fi-eKkrr_YdahEaGHx5FbQ"
    TABLE_NAME = "ProfileData"

    url = f"{SUPABASE_URL}/rest/v1/{TABLE_NAME}?select=name,description,image_url"

    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}"
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        print("API Response:", data)
        return data
    else:
        print("API Error:", response.status_code, response.text)
