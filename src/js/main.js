/**
 * NutriPlan - Main Entry Point
 * 
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */

const searchBtn = document.getElementById('search-input');
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
    const response = await fetch(
        `https://nutriplan-api.vercel.app/api/meals/search?q=${recipe}&page=1&limit=25`,
    );
    const resDate = await response.json();
    console.log(resDate);
    displayDate(resDate.results)
    
}
console.log(resDate)
function displayDate(list){
    console.log("display", list);
    let htmlMarkUp ;
    if (list.length > 0){
        htmlMarkUp = list.map(function(rec){
          return  ` 
            <div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="52772"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${rec.thumbnail}"
                  alt="Teriyaki Chicken Casserole"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    Chicken
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    Japanese
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
                    Chicken
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    Japanese
                  </span>
                </div>
              </div>
            </div>
          `
        }).join('')
        console.log(htmlMarkUp);
        document.getElementById('recipes-grid').innerHTML = htmlMarkUp;
    }
}