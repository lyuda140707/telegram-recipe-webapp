let allRecipes = [];

// Очищення блоку перед вставкою нових рецептів
function clearRecipes() {
    const container = document.getElementById('recipes');
    container.innerHTML = '';
}

// Завантажити всі рецепти при старті
async function fetchAllRecipes() {
    try {
        const response = await fetch('http://localhost:8000/recipes');
        const recipes = await response.json();

        allRecipes = recipes.filter(r => r && Object.keys(r).length > 0);
        console.log('Усі рецепти після очистки:', allRecipes);

        showDefaultMessage();
    } catch (error) {
        console.error('Помилка при завантаженні всіх рецептів:', error);
    }
}

// Показати повідомлення при старті
function showDefaultMessage() {
    const container = document.getElementById('recipes');
    container.innerHTML = `
        <div style="text-align:center; padding:20px;">
            <p>🍽 Обери категорію, щоб побачити рецепти!</p>
        </div>
    `;
}

// Функція для очищення посилання Drive
function cleanDriveLink(url) {
    if (!url) return '';
    return String(url)
        .replace(/\n/g, '')
        .replace(/\r/g, '')
        .replace(/\s+/g, '')
        .trim();
}

// Фільтрація і показ рецептів за категорією
function selectCategory(category) {
    const container = document.getElementById('recipes');
    clearRecipes();

    const selected = allRecipes.filter(r => 
        r["категорія"] && r["категорія"].toLowerCase().trim() === category.toLowerCase().trim()
    );

    console.log(`🔵 Відфільтровано рецептів: ${selected.length}`);

    if (selected.length === 0) {
        container.innerHTML = "<p>Немає рецептів у цій категорії 😥</p>";
        return;
    }

    const recipesGrouped = {};

    selected.forEach(item => {
        const number = item["номер рецепту"];
        if (!recipesGrouped[number]) {
            recipesGrouped[number] = {
                title: item["назва рецепту"],
                time: item["час приготування"],
                ingredients: item["інгредієнти"],
                steps: []
            };
        }

        if (item["тип блоку"] === "текст") {
            recipesGrouped[number].steps.push({
                type: "text",
                content: item["контент"]
            });
        }
        if (item["тип блоку"] === "фото") {
            recipesGrouped[number].steps.push({
                type: "image",
                content: item["контент"]
            });
        }
    });

    // Малюємо картки
    Object.values(recipesGrouped).forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';

        let html = `
            <h2>${recipe.title || "Без назви"}</h2>
            <p><strong>Час приготування:</strong> ${recipe.time || "Не вказано"}</p>
            <p><strong>Інгредієнти:</strong><br>${recipe.ingredients?.replace(/\n/g, "<br>") || "Не вказано"}</p>
        `;

        recipe.steps.forEach(step => {
          if (step.type === "text") {
              html += `<p>${step.content}</p>`;
          } else if (step.type === "image") {
              const cleanUrl = cleanDriveLink(step.content);
              if (cleanUrl.startsWith("https://t.me/")) {
                  html += `<a href="${cleanUrl}" target="_blank"><img src="https://img.icons8.com/ios-filled/50/000000/telegram-app.png" alt="Фото рецепту" style="max-width:100px; margin:10px 0;"></a>`;
              } else if (
                  cleanUrl.startsWith("https://i.imgur.com/") ||
                  cleanUrl.startsWith("https://i.postimg.cc/") ||
                  cleanUrl.startsWith("https://upload.wikimedia.org/")
              ) {
                  html += `<img src="${cleanUrl}" alt="Фото рецепту" style="max-width:100%; border-radius:12px; margin:10px 0;">`;
              } else {
                  console.warn('Невідомий формат картинки:', cleanUrl);
              }
          }
      });
      

      
        recipeCard.innerHTML = html;
        container.appendChild(recipeCard);
    });
}

// Запуск при відкритті сторінки
window.onload = fetchAllRecipes;
