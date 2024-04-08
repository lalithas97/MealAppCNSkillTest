
const bodyTag = document.querySelector('body')
const toggleThemeEl = document.querySelector('.theme-toggle')
const themeIndicator = document.getElementById('theme-one')

toggleThemeEl.addEventListener('click', toggleTheme)
/**********************Changing Themes*******************/
let currentTheme = 3
function toggleTheme(){
  if(currentTheme === 1){
    themeIndicator.style.transform = 'translateX(20px)'
    bodyTag.classList.replace('theme-one', 'theme-two')
  }
  if(currentTheme === 2){
    themeIndicator.style.transform = 'translateX(40px)'
    bodyTag.classList.replace('theme-two', 'theme-three')
  }
  if(currentTheme === 3){
    themeIndicator.style.transform = ''
    bodyTag.classList.replace('theme-three', 'theme-one')
    currentTheme = 0
  }
  currentTheme++
}
/******************************************************/
// Display each favorite meal
const favoritesContainer = document.getElementById('favorites-container');

document.addEventListener('DOMContentLoaded', function() {
     // Retrieve favorites from local storage
    
    getMealsOnscreen();
    
    function getMealsOnscreen(){
       
        const favorites = JSON.parse(localStorage.getItem('mealIds')) || [];
        console.log("fav:",favorites);
        
        favorites.forEach(function(mealId) {
            console.log(mealId);
            //Get the items from the API and bring the values w.r.t the ID we have.
            // www.themealdb.com/api/json/v1/1/lookup.php?i=52772
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then(res => res.json())
            .then(data => {
            let mealObj = data.meals[0];
            populateRecipeContainer(mealObj);
            console.log(data);
            });
            
            
        });
    }

    

function populateRecipeContainer(mealObj){
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('favorite-meal');

    const mealTitle = document.createElement('h2');
    mealTitle.textContent = mealObj.strMeal;

    const mealImg = document.createElement('img');
    mealImg.src = mealObj.strMealThumb;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function() {
        // Remove meal from favorites list
        console.log("Onclick remove")
        removeMealLS(mealObj);
    });

    mealDiv.appendChild(mealTitle);
    mealDiv.appendChild(removeButton);
    favoritesContainer.appendChild(mealDiv);
}
function removeMealLS(mealObj) {
    const mealIds = getMealsLS();

    localStorage.setItem(
        "mealIds",
        JSON.stringify(mealIds.filter((id) => id !== mealObj.idMeal))
    );
    favoritesContainer.innerHTML = "";
    getMealsOnscreen();
}
function getMealsLS() {
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));

    return mealIds === null ? [] : mealIds;
}

});