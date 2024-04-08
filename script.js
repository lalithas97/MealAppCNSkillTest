// // // // // // // // // // // // // // // // // // // // // // // // //
//    Seach meal by name                                                //
//    www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata            //
//                                                                      //   
//    Random meal                                                       //         
//    www.themealdb.com/api/json/v1/1/random.php                        //                 
//                                                                      //     
//    list all meal categories                                          //         
//    www.themealdb.com/api/json/v1/1/categories.php                    //           
//                                                                      //             
//    filter by category                                                //     
//    www.themealdb.com/api/json/v1/1/filter.php?c=Seafood              //
// // // // // // // // // // // // // // // // // // // // // // // // //    

// Change themes
// localStorage.clear();

const bodyTag = document.querySelector('body')
const toggleThemeEl = document.querySelector('.theme-toggle')
const themeIndicator = document.getElementById('theme-one')
// Buttons && Input bar
const searchMealEl = document.querySelector('input[type="text"')
const randomBtnEl = document.getElementById('random-meal')
const listCategoriesBtnEl = document.getElementById('list-categories')
// Main Displays
const recipeContainerEl = document.querySelector('.recipe-container')
const categoriesContainerEl = document.querySelector('.categories-container')
const mealsContainerEl = document.querySelector('.meals-container')

/***************** Event Listeners******************/

toggleThemeEl.addEventListener('click', toggleTheme)
randomBtnEl.addEventListener('click', getRandomMeal)
listCategoriesBtnEl.addEventListener('click', showCategories)
searchMealEl.addEventListener('keydown', searchMeal)


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



/************************************
Get a meal (3 ways) > populate DOM
************************************/
// Searching a meal name manually in input bar
function searchMeal(e){
  if(e.key == 'Enter'){
    let mealName = searchMealEl.value
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
    let mealObj = data.meals[0]
    populateRecipeContainer(mealObj)
    })
  }
}

// Click Random button > Get Random Meal from API, then populate DOM
function getRandomMeal(){
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
  .then(res => res.json())
  .then(data => {
    let mealObj = data.meals[0]
    populateRecipeContainer(mealObj)
  })
}

// After browsing category and selecting a meal > populate DOM with its recipe
// After browsing category and selecting a meal > open recipe in new tab
function showRecipeSelected(e){
  e.preventDefault(); // Prevent default behavior of anchor tag
  let mealName = e.currentTarget.children[0].textContent;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(res => res.json())
    .then(data => {
      let mealObj = data.meals[0];
      populateRecipeContainer(mealObj);
    });
}

// Function to open recipe in new tab
function openRecipeInNewTab(mealObj) {
  const recipeUrl = mealObj.strSource || mealObj.strYoutube; // Use recipe source or YouTube link
  if (recipeUrl) {
    window.open(recipeUrl, '_blank'); // Open link in new tab
  } else {
    // If no source available, show an alert
    alert('No recipe source available for this meal.');
  }
}

// DOM populate function for Recipe
function populateRecipeContainer(mealObj){
  displayRecipe()
  console.log(mealObj);
    recipeContainerEl.innerHTML = `
    <div class="recipe-title">
    <h1>${mealObj.strMeal}
        <a href="${mealObj.strSource}"
          target="_blank"
          title="Recipe Blog Post"
          class="fa fa-book"
          >Read More</a>
      </h1>
      <a href="${mealObj.strYoutube}" title="Youtube Tutorial" class="fa fa-youtube-play"></a>
      <a href="javascript:void(0);" title="Youtube Tutorial" id="close-popup1" class="close-popup"><i class="fa fa-heart-o"></i></a>
      <a href="javascript:void(0);" onclick="alert('hello!');return false;" title="Youtube Tutorial" id="close-popup2" class="close-popup" style="display:none;"><i class="fa fa-heart" aria-hidden="true"><input value = "${mealObj.idMeal}" style="display:none;"/></i></a>
      </div>
        
    <div class="recipe-information">
      <div class="information">
      <img src="${mealObj.strMealThumb}" />
        <p>Category: ${mealObj.strCategory}</p>
        <p>Area: ${mealObj.strArea}</p>
        <p>Tags: ${mealObj.strTags}</p>
        <u class="ingredients" aria-label="Ingredients">
          <li>${mealObj.strIngredient1} - ${mealObj.strMeasure1}</li>
          <li>${mealObj.strIngredient2} - ${mealObj.strMeasure2}</li>
          <li>${mealObj.strIngredient3} - ${mealObj.strMeasure3}</li>
          <li>${mealObj.strIngredient4} - ${mealObj.strMeasure4}</li>
          <li>${mealObj.strIngredient5} - ${mealObj.strMeasure5}</li>
          <li>${mealObj.strIngredient6} - ${mealObj.strMeasure6}</li>
          <li>${mealObj.strIngredient7} - ${mealObj.strMeasure7}</li>
          <li>${mealObj.strIngredient8} - ${mealObj.strMeasure8}</li>
          <li>${mealObj.strIngredient9} - ${mealObj.strMeasure9}</li>
          <li>${mealObj.strIngredient10} - ${mealObj.strMeasure10}</li>
          <li>${mealObj.strIngredient11} - ${mealObj.strMeasure11}</li>
          <li>${mealObj.strIngredient12} - ${mealObj.strMeasure12}</li>
          <li>${mealObj.strIngredient13} - ${mealObj.strMeasure13}</li>
          <li>${mealObj.strIngredient14} - ${mealObj.strMeasure14}</li>
          <li>${mealObj.strIngredient15} - ${mealObj.strMeasure15}</li>
          <li>${mealObj.strIngredient16} - ${mealObj.strMeasure16}</li>
          <li>${mealObj.strIngredient17} - ${mealObj.strMeasure17}</li>
          <li>${mealObj.strIngredient18} - ${mealObj.strMeasure18}</li>
          <li>${mealObj.strIngredient19} - ${mealObj.strMeasure19}</li>
          <li>${mealObj.strIngredient20} - ${mealObj.strMeasure20}</li>
          </u>
      </div>
    </div>
      <div class="recipe-instructions" aria-label="Instructions">
          ${mealObj.strInstructions}
      </div>`
      document.getElementById('close-popup1').addEventListener('click', function(){
        addFavoritesAndBringHeart(mealObj);
      });
    }

/*****************************************************************************/
function addFavoritesAndBringHeart(mealObj) {
    // Check if local storage is supported
    if (typeof(Storage) !== "undefined") {
        // Get the current favorites list from local storage or initialize an empty array
        // let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        // // Add the meal object to the favorites list
        // favorites.push(mealObj);

        // // Save the updated favorites list back to local storage
        // localStorage.setItem('favorites', JSON.stringify(favorites));
        addFav(mealObj);

        // Alert the user that the meal is saved into favorites
        alert('Saved into Favorites!');
        
        // Update the heart icon to indicate that the meal is favorited
        document.getElementById('close-popup1').style.display = "none";
        document.getElementById('close-popup2').style.display = "block"; 
    
      } 
    
    else {
        // If local storage is not supported, show an error message
        alert("Sorry, your browser does not support local storage. Unable to add to favorites.");
    }
}

function addFav(mealObj){
  console.log("meal obj :", mealObj);
  addMealLS(mealObj.idMeal);
}
function getMealsLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  console.log("get Items:")
  console.log(mealIds);
  return mealIds === null ? [] : mealIds;
}

function addMealLS(mealId) {
  console.log("mealID: ",mealId);
  const mealIds = getMealsLS();

  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
  console.log("Added Item");
  console.log(JSON.parse(localStorage.getItem("mealIds")))
}
function removeMealLS(mealId) {
  const mealIds = getMealsLS();

  localStorage.setItem(
      "mealIds",
      JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
  console.log("Removed item");
  console.log(JSON.parse(localStorage.getItem("mealIds")))
}

// // Event listener to handle clicking on the heart icon

/************************************
List all categories > Populate DOM
************************************/
function showCategories(){
  displayCategories()
  fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  .then(res => res.json())
  .then(data=> {
    let categoriesObj = data.categories
    console.log(categoriesObj)
    for (let i = 0; i < categoriesObj.length; i++){
      categoriesContainerEl.innerHTML += `
      <div class="category">
          <img src="${categoriesObj[i].strCategoryThumb}" />
          <h2>${categoriesObj[i].strCategory}</h2>
          <p>${categoriesObj[i].strCategoryDescription}</p>
        </div>`
    }
    addCategoriesListeners()
  })
}

// Selecting a specifiv category to see meals within it
function filterByCategory(e){
  displayMeals()
  let categoryChosen = e.currentTarget.children[1].textContent
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryChosen}`)
  .then(res => res.json())
  .then(data => {
    let mealsObj = data.meals
    for (let i = 0; i < mealsObj.length; i++){
      mealsContainerEl.innerHTML +=`
      <div class="meal">
        <h3>${mealsObj[i].strMeal}</h3>
        <img src="${mealsObj[i].strMealThumb}" />
      </div>` 
    }
    addMealsListeners()
  })
}



/**************************************************
Add Event Listeners to dynamically populated items
**************************************************/
// Category Cards clickable to filter by category
function addCategoriesListeners(){
  const categoryEl = document.getElementsByClassName('category')
  for(let i = 0; i < categoryEl.length; i++){
    categoryEl[i].addEventListener('click', filterByCategory)
  }
}

// In a given category, meals are clickable to open recipe
function addMealsListeners(){
  const mealEl = document.getElementsByClassName('meal')
  for(let i = 0; i < mealEl.length; i++){
    mealEl[i].addEventListener('click', showRecipeSelected)
  }
}


/************************************
Show/Hide proper windows
************************************/
function displayRecipe(){
  recipeContainerEl.style.display = 'grid'
  categoriesContainerEl.style.display = 'none'
  mealsContainerEl.style.display = 'none'
}

function displayCategories(){
  recipeContainerEl.style.display = 'none'
  categoriesContainerEl.style.display = 'flex'
  mealsContainerEl.style.display = 'none'
}

function displayMeals(){
  mealsContainerEl.innerHTML = ''
  recipeContainerEl.style.display = 'none'
  categoriesContainerEl.style.display = 'none'
  mealsContainerEl.style.display = 'flex'
}
