let submit = document.getElementById("submit");
//dam check daca inputu este gol da sau nu 
submit.addEventListener("click", (event) => {
  event.preventDefault(); 

  let foodSearch = document.getElementById("search-bar").value;

  if (foodSearch == null || foodSearch == "") {
    alert("Pls do not add empty input");
  } else {
    foodid.fetchId(foodSearch)
      .then((id) => {
        console.log(id); // logs the id of the first recipe found for the searched food
        recipe.fetchRecipes(id); // calls the fetchRecipes function with the id
      })
      .catch((error) => {
        console.error(error); // logs any errors that occur during the Promise chain
      });
  }
});

let foodid = {
  apiKey: "4eb8222593c648b99409b8a846faaf5d",
  fetchId: function (food) {
    return fetch(
      "https://api.spoonacular.com/recipes/search?apiKey=" +
        this.apiKey +
        "&query=" +
        food +
        "&number=1"
    )
      .then((response) => {
        if (!response.ok) {
          alert("No recipe found.");
          throw new Error("No recipe found.");
        }
        return response.json();
      })
      .then((data) => {
        const FoodData = data.results[0].id;
        return FoodData;
      });
  },
};


foodid.fetchId("ribs").then((id) => {
  console.log(id); 
  recipe.fetchRecipes(id); 
});

//  aici avem acces la date din API
let recipe = {
  apiKey: "4eb8222593c648b99409b8a846faaf5d",
  fetchRecipes: function (id) {
    fetch(
      "https://api.spoonacular.com/recipes/" +
        id +
        "/information?apiKey=" +
        this.apiKey +
        "&includeNutrition=false"
    )
      .then((response) => {
        if (!response.ok) {
          alert("No recipe found.");
          throw new Error("No recipe found.");
        }
        return response.json();
      })
      .then((data) => this.displayRecipes(data));
  },
  displayRecipes: function (data) {
    // aici modifici   datele
    // si afiesezi datele 
    const { readyInMinutes, sourceUrl } = data;
    const { title, image, summary } = data;

    document.getElementById("titlu").innerHTML = title;
    document.getElementById("text").innerHTML = summary;
    document.getElementById("link").href = sourceUrl;
    document.getElementById("poza").src = image;
  },
};
