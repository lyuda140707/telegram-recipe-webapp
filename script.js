<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>РецептБот Web App</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
</head>
<body>
  <div class="bg-decor"></div>
  <div class="app">
    <h1>🍽 Що приготувати?</h1>
    <div id="recipes"></div>

    <button class="back-button" style="display:none;" onclick="goHome()">⬅ На головну</button>

    <div class="scroll-menu section active" id="section-categories">
      <button>👶 Для дітей</button>
      <button>🥗 Вегетаріанське</button>
      <button>🌾 Без глютену</button>
      <button>⚡ Швидко</button>
      <button>🍲 Перші страви</button>
      <button>🥘 Другі страви</button>
      <button>🥗 Салати</button>
      <button>🥒 Консервація та соління</button>
      <button>🥤 Напої</button>
      <button>🍰 Десерти</button>
      <button>🍞 Випічка</button>
      <button>🥪 Закуски</button>
      <button>🫕 Соуси та заправки</button>
    </div>

    <div class="section" id="section-recipes"></div>

    <div class="section" id="section-menu">
      <h2>📋 Моє меню</h2>
      <p>Тут будуть збережені рецепти.</p>
    </div>

    <div class="section" id="section-list">
      <h2>📟 Список покупок</h2>
      <p>Скоро додаємо функціонал!</p>
    </div>

    <div class="profile-block section" id="section-profile">
      <h2>👤 Профіль</h2>
      <p id="days-left">✨ Залишилось <strong>7 днів</strong> пробної версії</p>
    </div>
  </div>

  <div class="bottom-nav-wrapper">
    <div class="bottom-nav" id="bottomNav">
      <button onclick="showSection('section-profile')">👤 Профіль</button>
      <button onclick="showSection('section-recipes')">🍽 Рецепти</button>
      <button onclick="showSection('section-menu')">🮺 Меню</button>
      <button onclick="showSection('section-list')">📟 Список</button>
    </div>
  </div>

  <script>
    function showSection(id) {
      document.querySelectorAll('.section').forEach(el => {
        el.classList.remove('active');
        el.style.display = 'none';
      });
      const section = document.getElementById(id);
      if (section) {
        section.style.display = 'block';
        setTimeout(() => section.classList.add('active'), 10);
      }
    }

    function goHome() {
      document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
      document.getElementById('section-categories').classList.add('active');
      document.getElementById('section-recipes').classList.add('active');
    }

    async function loadCategory(category) {
      try {
        const response = await fetch(`https://recipe-backend-0gz1.onrender.com/recipes?category=${encodeURIComponent(category)}`);
        const recipes = await response.json();
        const section = document.getElementById('section-recipes');
        section.innerHTML = `<h2>🍴 ${category}</h2>`;

        recipes.forEach(recipe => {
          const block = document.createElement('div');
          block.className = 'recipe-card';

          if (recipe["тип блоку"] === "текст") {
            block.innerHTML = `<p>${recipe["контент"]}</p>`;
          } else if (recipe["тип блоку"] === "фото") {
            block.innerHTML = `<img src="${recipe["контент"]}" alt="Фото рецепту" style="max-width:100%; border-radius:12px; margin-top:10px;" onclick="openImageModal('${recipe["контент"]}')">`;
          }

          section.appendChild(block);
        });

        showSection('section-recipes');
      } catch (error) {
        console.error('Помилка завантаження:', error);
      }
    }

    document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.scroll-menu button').forEach(button => {
    button.addEventListener('click', () => {
      const category = button.textContent.replace(/^[^\w\u0400-\u04FF]+/, '').trim();
      loadCategory(category);
    });
  });
});


    function openImageModal(src) {
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `<img src="${src}" style="max-width:90%; margin: 5% auto; display:block;">`;
      modal.onclick = () => modal.remove();
      document.body.appendChild(modal);
    }
  </script>
</body>
</html>
