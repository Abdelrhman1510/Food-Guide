let categeroyRow = document.getElementById("categeroyRow");
let areaRow = document.getElementById("areaRow");
let ingredientsRow = document.getElementById("ingredientsRow");
let contactRow = document.getElementById("contactRow");
let mealsRow = document.getElementById("mealsRow");
let descriptionRow = document.getElementById("descriptionRow");
let serachRow = document.getElementById("serachRow");


let searchContainer = document.getElementById("searchContainer");

$(document).ready(() => {
    $("#meals").removeClass("d-none")
    searchByName("").then(() => {
        $(".loading").fadeOut(500)
        

    })
})
//SIDEBAR
$("#menu").click(function(){
   
    if ($(".sidebar").width() == "250") {
    
        closeBar ();
    } else {
        $(".sidebar").width("250px");
     
        $(".menu").css("margin-left", "250px");
        
        $("#menu").css("display", "none");
        $("#close").css("display", "block");

        $(".para").animate({
          left:0
        },500);
        for (let i = 0; i < 5; i++) {
            $(".links li").eq(i).animate({
                top: 0
            }, (i + 5) * 100)
        }
    }

})

 $("#close").click( closeBar)
     function closeBar (){
        $(".sidebar").width("0px");
        $(".home-content").css("margin-left", "0px");
        $(".menu").css("margin-left", "0px");
        $("#menu").css("display", "block");
        $("#meals").css("margin-left", "50px");
        $("#close").css("display", "none");
        
    $(".links li").animate({
        top: 200
    }, 500)
    
    $(".para").animate({
        left:-200
      },100);
        
    }
//CLEAR-FUNCTION
    function emptyRows(){
        categeroyRow.innerHTML = ""
        areaRow.innerHTML = ""
        ingredientsRow.innerHTML = ""
        contactRow.innerHTML=""
        mealsRow.innerHTML=""
        descriptionRow.innerHTML=""
        serachRow.innerHTML=""
        $("#category").addClass("d-none")
        $("#meal-description").addClass("d-none")
        $("#ingredients").addClass("d-none")
        $("#contactRow").addClass("d-none")
        $("#area").addClass("d-none")
        $("#meals").addClass("d-none")
        $("#area").addClass("d-none")      
        $("#ingredients").addClass("d-none") 
        $("#search").addClass("d-none")    

    }
//SIDEBAR-ACTIONS
$("#cat").click(function (){
    getCategories();
    closeBar();
    $("#category").removeClass("d-none")
    
})
$("#ar").click(function (){
    getArea();
    closeBar();
    $("#area").removeClass("d-none")
   
})
$("#in").click(function (){
    getIngredients();
    closeBar();
    $("#ingredients").removeClass("d-none")
    
})
$("#cn").click(function (){
    displayContact();
    closeBar();
    $("#contactRow").removeClass("d-none")
   
})
$("#sc").click(function (){
    displaySearch();
    closeBar();
    $("#search").removeClass("d-none")
   
})
 //REQUEST-CATEGORIES 
    async function getCategories() {
        emptyRows();
        $(".loading").fadeIn(300)
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        response = await response.json()
        displayCategories(response.categories)
        $(".loading").fadeOut(300)
    }
//REQUEST-AREA
    async function getArea() {
        emptyRows()
        $(".loading").fadeIn(300)
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        respone = await respone.json()
        displayArea(respone.meals)
        $(".loading").fadeOut(300)
    
    }
//REQUEST-INGREDIENTS
    async function getIngredients() {
        emptyRows()
        $(".loading").fadeIn(300)
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        respone = await respone.json()
        displayIngredients(respone.meals.slice(0, 20))
        $(".loading").fadeOut(300)
    
    }
//REQUEST-CATEGORIES-MEALS
async function getCategoryMeals(category) {
    emptyRows();
  $(".loading").fadeIn(300)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  response = await response.json()
  displayMeals(response.meals.slice(0, 20))
  $(".loading").fadeOut(300)
  $("#meals").removeClass("d-none")

}
//REQUEST-AREA-MEALS
async function getAreaMeals(area) {
  emptyRows();
  $(".loading").fadeIn(300)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  response = await response.json()
  displayMeals(response.meals.slice(0, 20))
  $(".loading").fadeOut(300)
  $("#meals").removeClass("d-none")
}
//REQUEST-INGREDIENTS-MEALS
async function getIngredientsMeals(ingredients) {
  emptyRows();
  $(".loading").fadeIn(300)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
  response = await response.json()
  displayMeals(response.meals.slice(0, 20))
  $(".loading").fadeOut(300)
  $("#meals").removeClass("d-none")

}
//REQUEST-MEALS-DESCRIPTION
async function getMealDetails(mealID) {
    closeBar();
    emptyRows();
    $(".loading").fadeIn(300)
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();
    displayMealDetails(respone.meals[0])
    $(".loading").fadeOut(300)

}
//DISPLAY-MEALS
function displayMeals(arr) {
    let cartona = "";
    for (let i = 0; i < arr.length; i++) {
        cartona += 
    ` <div class="col-lg-4 col-md-6 ">
    <div class="card cardz mb-3 p-2 shadow-lg" onclick="getMealDetails('${arr[i].idMeal}')" >
        <div class="meal-layer position-absolute d-flex justify-content-center align-items-center rounded overflow-hidden text-white ">
        
            <h3 class="vm" > View More </h3>
        </div>
  <div class="row g-0">
    <div class="col-6">
      <img src="${arr[i].strMealThumb}" class="img-fluid rounded " alt="...">
    </div>
    <div class="col-6 d-flex align-items-center justify-content-center">
      <div class="card-body ">
        <h4 class="card-title">${arr[i].strMeal}</h4>
      
      </div>
    </div>
  </div>

</div>

  
  </div> 
        
  




  
  
  `
    
    }

    mealsRow.innerHTML = cartona
}
    
//DISPLAY-CATEGORIES
function displayCategories(arr) {
    let cartona = "";
    console.log(arr)
    for (let i = 0; i < arr.length; i++) {
        cartona += 
        `
        


                <div class="col-lg-4 col-md-6 ">
    <div class="card cardz mb-3 p-2 shadow-lg category-card " onclick="getCategoryMeals('${arr[i].strCategory}')" >
        <div class="meal-layer position-absolute d-flex justify-content-center align-items-center rounded overflow-hidden text-white ">
        
            <h3 class="vm"> View More </h3>
        </div>
  <div class="row g-0">
    <div class="col-6">
      <img src="${arr[i].strCategoryThumb}" class="img-fluid rounded " alt="...">
    </div>
    <div class="col-6 d-flex align-items-center justify-content-center">
      <div class="card-body ">
        <h4 class="card-title ">${arr[i].strCategory}</h4>
        <p  >${arr[i].strCategoryDescription.split(" ").slice(0,10).join(" ")}</p>
      
      </div>
    </div>
  </div>

</div>

  
  </div> 
        











        `
    }
    categeroyRow.innerHTML = cartona
}
//DISPLAY-AREA
function displayArea(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += 
        `
        

    <div class="col-lg-4 col-md-6 ">
    <div class="card cardz mb-3 p-2 shadow-lg category-card " onclick="getAreaMeals('${arr[i].strArea}')" >
        <div class="meal-layer position-absolute d-flex justify-content-center align-items-center rounded overflow-hidden text-white ">
        
            <h3 class="vm"> View More </h3>
        </div>
  <div class="row g-0">
    <div class="col-6 ">
      <img src="images/countries.png" class="img-fluid rounded  " alt="...">
    </div>
    <div class="col-6 d-flex align-items-center justify-content-center">
      <div class="card-body text-black ">
        <h4 class="card-title text-success">${arr[i].strArea}</h4>
        
      
      </div>
    </div>
  </div>

</div>

  
  </div> 












        `



    }
    areaRow.innerHTML = cartoona
}
//DISPLAY-INGREDIENTS
function displayIngredients(arr) {
    let cartona = "";

    for (let i = 0; i < arr.length; i++) {
        cartona += 
        `
       

        
            <div class="col-lg-4 col-md-6 ">
            <div class="card mb-3 p-2 shadow-lg category-card " onclick="getIngredientsMeals('${arr[i].strIngredient}')" >
                <div class="meal-layer position-absolute d-flex justify-content-center align-items-center rounded overflow-hidden text-white ">
                
                    <h3 class="vm"> View More </h3>
                </div>
          <div class="row g-0">
            <div class="col-5">
              <img src="images/ingredient.png" class="img-fluid rounded " alt="...">
            </div>
            <div class="col-7 d-flex align-items-center justify-content-center">
              <div class="card-body ">
                <h4 class="card-title text-warning">${arr[i].strIngredient}</h4>
                <p  >${arr[i].strDescription.split(" ").slice(0,10).join(" ")}</p>
              
              </div>
            </div>
          </div>
        
        </div>
        
          
          </div> 
                












        `
    }

    ingredientsRow.innerHTML = cartona
}
  //DISPLAY-MEAL-DESCRIPTION
function displayMealDetails(meal) {
    emptyRows();
    $("#meal-description").removeClass("d-none")
  let ingredients = ``
  for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
          ingredients += ` <li class="badge text-bg-primary ">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
      }                       
  }
  let tags = meal.strTags?.split(",")
  if (!tags) tags = []
  let tagsStr = ''
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
     <li class="badge text-bg-warning ">${tags[i]}</li>`       
  }
  let cartoona = `



<div class="card mb-3 p-4 text-black">
  <img src="${meal.strMealThumb}" class="  rounded  w-50 mx-auto" alt="...">
  <div class="card-body">
    <h2 class="card-title">${meal.strMeal}</h2>
    <p class="card-text">${meal.strInstructions}</p>
   
    <p class="fs-3 ">Area: <span class="text-primary">${meal.strArea}</span></p>
  <p class="fs-3 ">Category : <span class="text-success">${meal.strCategory}</span></p>
  <p class="fs-2">Recipes :</p>
  <ul class="fs-3 list-unstyled "> 
      ${ingredients}     
  </ul>
  <p class="fs-2"> Tags :   
  </p>
  <ul class="fs-3 list-unstyled mb-5 p-2" > ${tagsStr} </ul>
  <p class="fs-2">Links :</p>
      <a target="_blank" href="${meal.strSource}" type="button" class="btn btn-primary">Source</a>
      <a target="_blank" href="${meal.strYoutube}" type="button" class="btn btn-danger">Youtube</a>
  </div>







`
  descriptionRow.innerHTML = cartoona
}
//SEARCH
//DISPLAY-SEARCH-HTML
function displaySearch() {
    emptyRows();
    $("#meals").removeClass("d-none")
    serachRow.innerHTML = `
    <div class="row g-3">
    <div class="col-md-6">
        <input type="text" onkeyup="searchByName(this.value)" class="form-control mb-3" id="srch" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
        <input type="text" onkeyup="searchByFLetter(this.value)" class="form-control mb-3" maxlength="1" id="letter" placeholder="Search By letter">
    </div>
</div>
    
    `
}
//SEARCH-BY-NAME
async function searchByName(term) {
    closeBar();
    $(".loading").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".loading").fadeOut(300)
}
//SEARCH-BY-LETTER
async function searchByFLetter(term) {
    closeBar();
    $(".loading").fadeIn(300)
    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".loading").fadeOut(300)

}
//CONTACT+VALDIATION
function displayContact() {
    emptyRows();
    contactRow.innerHTML = 
    `
    <div class="container w-75 mx-auto text-center">
            <div class="row">
    <div class="col-md-6">
    <div class="right">
        <input type="text" class="form-control mb-3" id="nameInput" onkeyup="inputsValidation()" placeholder="Enter Your Name">
            <p id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">  Special characters and numbers not allowed</p>
        <input type="tel" class="form-control mb-3"id="phoneInput" onkeyup="inputsValidation()" placeholder="Enter Your Phone">
        <p id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">  Enter valid Phone Number</p>
        <input type="password" class="form-control mb-3"  id="passwordInput" onkeyup="inputsValidation()" placeholder="Enter Your password">
        <p id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">   Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
        </div>
</div>
<div class="col-md-6">
    <div class="left">
       <input type="email" class="form-control mb-3" id="emailInput" onkeyup="inputsValidation()" placeholder="Enter Your Email">
       <p id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">    Email not valid *exemple@yyy.zzz</p>
       
       <input type="number" class="form-control mb-3" id="ageInput" onkeyup="inputsValidation()" placeholder="Enter Your Age">
       <p id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">   Enter valid age</p>
       <input type="password" class="form-control mb-3" id="repasswordInput" onkeyup="inputsValidation()" placeholder="Repeat Your Password">
       <p id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">     Enter valid repassword </p>
       </div>
</div>
</div>
<button type="submit" disabled id="submitBtn" class="btn btn-outline-primary rounded-3 px-5">Submit</button>
</div>
    
    `
    submitBtn = document.getElementById("submitBtn")
    document.getElementById("nameInput").addEventListener("focus", () => {
        nameFocus = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailFocus = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneFocus = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageFocus = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passFocus = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repassFocus = true
    })
}

let nameFocus = false;
let emailFocus = false;
let phoneFocus = false;
let ageFocus = false;
let passFocus = false;
let repassFocus = false;

function inputsValidation() {
    if (nameFocus) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailFocus) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneFocus) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageFocus) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passFocus) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repassFocus) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
'use strict'

let toRadians = (deg) => deg * Math.PI / 180
let map = (val, a1, a2, b1, b2) => b1 + (val - a1) * (b2 - b1) / (a2 - a1)

class Pizza {
  constructor(id) {
    this.canvas = document.getElementById(id)
    this.ctx = this.canvas.getContext('2d')

    this.sliceCount = 6
    this.sliceSize = 80

    this.width = this.height = this.canvas.height = this.canvas.width = this.sliceSize * 2 + 50
    this.center = this.height / 2 | 0

    this.sliceDegree = 360 / this.sliceCount
    this.sliceRadians = toRadians(this.sliceDegree)
    this.progress = 0
    this.cooldown = 10

  }

  update() {
    let ctx = this.ctx
    ctx.clearRect(0, 0, this.width, this.height)

    if (--this.cooldown < 0) this.progress += this.sliceRadians*0.01 + this.progress * 0.07

    ctx.save()
    ctx.translate(this.center, this.center)
    
    for (let i = this.sliceCount - 1; i > 0; i--) {

      let rad
      if (i === this.sliceCount - 1) {
        let ii = this.sliceCount - 1

        rad = this.sliceRadians * i + this.progress

        ctx.strokeStyle = '#FBC02D'
        cheese(ctx, rad, .9, ii, this.sliceSize, this.sliceDegree)
        cheese(ctx, rad, .6, ii, this.sliceSize, this.sliceDegree)
        cheese(ctx, rad, .5, ii, this.sliceSize, this.sliceDegree)
        cheese(ctx, rad, .3, ii, this.sliceSize, this.sliceDegree)

      } else rad = this.sliceRadians * i
      
      // border
      ctx.beginPath()
      ctx.lineCap = 'butt'
      ctx.lineWidth = 11
      ctx.arc(0, 0, this.sliceSize, rad, rad + this.sliceRadians)
      ctx.strokeStyle = '#F57F17'
      ctx.stroke()

      // slice
      let startX = this.sliceSize * Math.cos(rad)
      let startY = this.sliceSize * Math.sin(rad)
      let endX = this.sliceSize * Math.cos(rad + this.sliceRadians)
      let endY = this.sliceSize * Math.sin(rad + this.sliceRadians)
      let varriation = [0.9,0.7,1.1,1.2]
      ctx.fillStyle = '#FBC02D'
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(startX, startY)
      ctx.arc(0, 0, this.sliceSize, rad, rad + this.sliceRadians)
      ctx.lineTo(0, 0)
      ctx.closePath()
      ctx.fill()
      ctx.lineWidth = .3
      ctx.stroke()

      // meat
      let x = this.sliceSize * .65 * Math.cos(rad + this.sliceRadians / 2)
      let y = this.sliceSize * .65 * Math.sin(rad + this.sliceRadians / 2)
      ctx.beginPath()
      ctx.arc(x, y, this.sliceDegree / 6, 0, 2 * Math.PI)
      ctx.fillStyle = '#D84315'
      ctx.fill()

    }

    ctx.restore()

    if (this.progress > this.sliceRadians) {
      ctx.translate(this.center, this.center)
      ctx.rotate(-this.sliceDegree * Math.PI / 180)
      ctx.translate(-this.center, -this.center)

      this.progress = 0
      this.cooldown = 20
    }

  }

}

function cheese(ctx, rad, multi, ii, sliceSize, sliceDegree) {
  let x1 = sliceSize * multi * Math.cos(toRadians(ii * sliceDegree) - .2)
  let y1 = sliceSize * multi * Math.sin(toRadians(ii * sliceDegree) - .2)
  let x2 = sliceSize * multi * Math.cos(rad + .2)
  let y2 = sliceSize * multi * Math.sin(rad + .2)

  let csx = sliceSize * Math.cos(rad)
  let csy = sliceSize * Math.sin(rad)

  var d = Math.sqrt((x1 - csx) * (x1 - csx) + (y1 - csy) * (y1 - csy))
  ctx.beginPath()
  ctx.lineCap = 'round'

  let percentage = map(d, 15, 70, 1.2, 0.2)

  let tx = x1 + (x2 - x1) * percentage
  let ty = y1 + (y2 - y1) * percentage
  ctx.moveTo(x1, y1)
  ctx.lineTo(tx, ty)

  tx = x2 + (x1 - x2) * percentage
  ty = y2 + (y1 - y2) * percentage
  ctx.moveTo(x2, y2)
  ctx.lineTo(tx, ty)

  ctx.lineWidth = map(d, 0, 100, 20, 2)
  ctx.stroke()
}

let pizza = new Pizza('pizza')

;(function update() {
  requestAnimationFrame(update)
  pizza.update()

}())





















































    
    
    
  
    



    

    
 
    
   
    
    
   

    
    

    

    
  
  

    
    
