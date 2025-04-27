from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from google_sheets import worksheet

app = FastAPI()

# Дозволяємо доступ із браузера (WebApp)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # якщо буде потрібно — обмежимо
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Функція завантаження всіх рецептів
def load_all_recipes():
    data = worksheet.get_all_records()
    return data

# Ендпоінт для отримання рецептів за категорією
@app.get("/recipes")
async def get_recipes(category: str):
    all_recipes = load_all_recipes()
    filtered = [row for row in all_recipes if row["Категорія"].strip().lower() == category.strip().lower()]
    return {"recipes": filtered}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
