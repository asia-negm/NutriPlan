/**
 * NutriPlan - Main Entry Point
 * 
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */

const searchBtn = document.getElementById('search-input');
const loadingScreen = document.getElementById("loaderScreen");
const loadingOverAll = document.getElementById("app-loading-overlay");
const recipePanel = document.querySelector("#meal-details");
const logRecipe = document.querySelector("#log-meal-modal");
const canselBtn =document.getElementById('cancel-log-meal');
const confirmBtm = document.getElementById('confirm-log-meal'); 
const productBtn = document.getElementById('products-section');






canselBtn.addEventListener('click',function(){
  logRecipe.classList.remove('show-card')
})

confirmBtm.addEventListener('click',function(){
  logRecipe.classList.remove('show-card')
  Swal.fire({
  title: "Meal Logged!",
  icon: "success",
  draggable: true,
});
});

let debounceTimer ;
 searchBtn.addEventListener('input', function(){
  

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
     const searchTerm = document.getElementById("search-input").value
  getRacipe(searchTerm)
  },400);
  
 })


getRacipe()


async function getRacipe(recipe ="chicken") {
  overallScreen(true)
  showhide(true)
  try{
    const response = await fetch(
        `https://nutriplan-api.vercel.app/api/meals/search?q=${recipe}&page=1&limit=25`,
    );
    const resDate = await response.json();
    console.log(resDate);
    displayDate(resDate.results)
  }catch(err){
    console.log(`Error Happend : ${err}`)
  }finally{
showhide(false)
overallScreen(false)
  }
    
}

function displayDate(list){
    console.log("display", list);
    let htmlMarkUp ;
    if (list.length > 0){
        htmlMarkUp = list.map(function(rec){
          return  ` 
            <div
              class=" recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${rec.id}"
            >
              <div class="relative h-48 overflow-hidden">
                <img 
                  class="recipe-thumb  w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${rec.thumbnail}"
                  alt="Teriyaki Chicken Casserole"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                   <i class="fa-solid fa-tag text-emerald-600 mr-1"></i>
                    ${rec.category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                   <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${rec.area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${rec.name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                   ${rec.instructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${rec.category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${rec.area}
                  </span>
                </div>
              </div>
            </div>
          `
        }).join('')
        console.log(htmlMarkUp);
      }else{
        htmlMarkUp = `<div class="">
<div class="flex items-center justify-center mb-4 flex-col">
  <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
    <i class="fa-solid fa-magnifying-glass text-2x1 text-gray-400"></i>
  </div>
  <p class="text-gray-500 text-lg">No recipes found. Try a different search term.</p>

</div>
</div>`
      }
      document.getElementById('recipes-grid').innerHTML = htmlMarkUp;
}

function showhide(isShow){
  if(isShow){
    loadingScreen.style.display = 'flex'
  }else{
    loadingScreen.style.display = 'none'
  }
}

function overallScreen(show){
  if(show){
    loadingOverAll.style.display = 'flex'
  }else{
    loadingOverAll.style.display = 'none'
    
  }
}

function showPage(pageId){
  document.querySelectorAll(".page-section").forEach(section => {
    section.classList.remove('show');
  });
  document.querySelector(pageId).classList.add('show');
}

function showPages(pageIds) {
  document.querySelectorAll(".page-section").forEach(section => {
    section.classList.remove('show');
  });
  pageIds.forEach(id => {
    const el = document.querySelector(id);
    if (el) el.classList.add('show');
  });
}

document.addEventListener("click" , (e) =>{
  if (e.target.closest(".recipe-card")){
    const card = e.target.closest('.recipe-card');
const mealId = card.dataset.mealId;
console.log(mealId);
    showPage('#meal-details');
    getMealDetails(mealId);
    
  }
 else if (e.target.closest("#product-btn")){
    showPage('#products-section');
  }
  else if (e.target.closest("#food-btn")){
    showPage('#foodlog-section');
  }
  else if (e.target.closest("#meals-btn") || e.target.closest("#back-to-meals-btn")){
      showPages([
     "#all-recipes-section",
      "#search-filters-section",
      "#meal-categories-section"
   ])
  }
})



function getRecipeDetails(){
  

  showRecipePanel()
}

function showRecipePanel(){
logRecipe.classList.add('show-card')
}

document.addEventListener("click" , (e) =>{
  if (e.target.closest("#log-meal-btn")){
    showRecipePanel('#log-meal-modal');
  }
})




async function getMealDetails(id) {
  overallScreen(true)
  showhide(true)
  try{
    const response = await fetch(
        `https://nutriplan-api.vercel.app/api/meals/${id}`,
    );
    const resDate = await response.json();
    console.log(resDate);
    document.getElementById('imgMeal').src = resDate.result.thumbnail;
    document.getElementById('nameMeal').textContent = resDate.result.name;
    document.getElementById('categoryMeal').textContent = resDate.result.category;
    document.getElementById('areaMeal').textContent = resDate.result.area;
    document.getElementById('ingredientsCount').textContent = resDate.result.ingredients.length + ' items';
    document.getElementById('youtubeVideo').src = `https://www.youtube.com/embed/${resDate.result.youtube.split('=')[1]}`;

    const instructionsHtml = resDate.result.instructions.map((step , index) =>{
      return`
                  <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">

                       ${index + 1}
                    </div>
                    <p class="text-gray-700 leading-relaxed pt-2">
                     ${step}
                    </p>
                  </div>`;
    }).join('');
        document.getElementById('instructionsContainer').innerHTML = instructionsHtml
 const ingredientsHtml = resDate.result.ingredients.map((item) =>{
      return`<div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">${item.measure}</span> ${item.ingredient}
                    </span>
                  </div>
                 `
    }).join('');
        document.getElementById('ingredientsContainer').innerHTML = ingredientsHtml 
  }catch(err){
    console.log(`Error Happend : ${err}`)
  }finally{
showhide(false)
overallScreen(false)
  }
    
}
 