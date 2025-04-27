// Очистити рецепти перед вставкою
function clearRecipes() {
  const recipesContainer = document.getElementById('recipes');
  recipesContainer.innerHTML = '';
}

// Показати рецепти
function showRecipes(recipes) {
  const recipesContainer = document.getElementById('recipes');
  clearRecipes();

  recipes.forEach(recipe => {
    const recipeCard = document.createElement('div');
    recipeCard.className = 'recipe-card';

    let content = `
      <h2>${recipe["Назва рецепту"]}</h2>
      <p><strong>Час:</strong> ${recipe["Час приготування"] || "Не вказано"}</p>
      <p><strong>Інгредієнти:</strong> ${recipe["Інгредієнти"] || "Не вказано"}</p>
    `;

    // Якщо це текстовий блок
    if (recipe["Тип блоку"] === 'текст') {
      content += `<p>${recipe["Контент"]}</p>`;
    }

    // Якщо це фото
    if (recipe["Тип блоку"] === 'фото') {
      content += `<img src="${recipe["Контент"]}" alt="Фото рецепту" style="max-width:100%; border-radius:12px; margin-top:10px;">`;
    }

    recipeCard.innerHTML = content;
    recipesContainer.appendChild(recipeCard);
  });
}

// Завантажити рецепти
async function fetchRecipes() {
  try {
    const response = await fetch('http://localhost:8000/recipes');
    const recipes = await response.json();
    console.log('Отримано рецепти:', recipes);
    showRecipes(recipes);
  } catch (error) {
    console.error('Помилка при завантаженні рецептів:', error);
  }
}

// При завантаженні сторінки
window.onload = fetchRecipes;
