function selectCategory(category) {
    document.getElementById("recipe-card").classList.remove("hidden");
}
async function loadRecipes() {
  try {
    const response = await fetch('http://localhost:8000/recipes');
    const data = await response.json();

    console.log('Отримані рецепти:', data);

    // Тут ти можеш вивести рецепти на сторінку
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    data.forEach(recipe => {
      const recipeBlock = document.createElement('div');
      recipeBlock.classList.add('recipe-card');
      recipeBlock.innerHTML = `
        <h2>${recipe.title}</h2>
        <p>${recipe.details}</p>
        <img src="${recipe.image}" alt="Фото рецепту" style="max-width:100%; border-radius:12px; margin:10px 0;">
      `;
      recipesContainer.appendChild(recipeBlock);
    });

  } catch (error) {
    console.error('Помилка при завантаженні рецептів:', error);
  }
}

// Викликаємо завантаження рецептів, коли відкривається сторінка
loadRecipes();
async function loadRecipes() {
  try {
    const response = await fetch('/recipes');
    const recipes = await response.json();

    const container = document.getElementById('recipes');
    container.innerHTML = ''; // очищаємо перед вставкою нових рецептів

    recipes.forEach(recipe => {
      const recipeBlock = document.createElement('div');
      recipeBlock.className = 'recipe-card';
      recipeBlock.innerHTML = `
        <h2>${recipe.title}</h2>
        <p class="details">${recipe.time}</p>
        <p class="ingredients"><strong>Інгредієнти:</strong> ${recipe.ingredients}</p>
        ${recipe.steps.map(step => step.type === 'текст'
          ? `<p>${step.content}</p>`
          : `<img src="${step.content}" alt="Фото" style="max-width:100%; border-radius: 12px; margin-top: 10px;">`
        ).join('')}
      `;
      container.appendChild(recipeBlock);
    });
  } catch (error) {
    console.error('Помилка при завантаженні рецептів:', error);
  }
}

// Викликаємо функцію одразу при відкритті сторінки
loadRecipes();

