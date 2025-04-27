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
