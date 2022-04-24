'use strict'
const url = './src/data.json'
const img = document.getElementById('img1')
const priceOfProduct = document.getElementById('product-price')
const logoOfProduct = document.getElementById('product-logo')
const stockBalance = document.getElementById('stock-balance')
const search = document.querySelector('.search-input')
const items = document.querySelectorAll('#pagination li')
const switcher = document.getElementById('switcher')
const contentWrapper = document.getElementById('content-wrapper')
let notesOnPageTen = 10
let notesOnPageThirty = 30
let data = []

console.log(img)
async function getData() {
  try {
    data = await fetch(url).then(response => response.json()).then(obj => obj)
  //  card
  data.forEach(({Image, logo, Price, Stock , Manufacturer_ID , unit}) => {
    if(Image) img.src = Image
    logoOfProduct.src = logo
    priceOfProduct.innerHTML = `${Price} ₽`
    stockBalance.innerHTML = `${Stock}  ${unit}.`
    // let HtmlCatalog = ''
    // HtmlCatalog += `
    // <div class="product-card">
    //             <div class="product-image">
    //             <a  href="#">
    //                 <img
    //                         id="img1"
    //                         class="product-img"
    //                         data-src="./img/product.jpg"
    //                         loading="lazy"
    //                         src="${Image}"
    //                         alt="product-image">
    //             </a>
    //             </div>
    //             <div class="product-description">
    //                 <div class="product-title">
    //                     <a class="product-title" href="#">Амортизатор (345\\503) BPW, SAF, ТОНАР - ПААЗ</a>
    //                 </div>
    //                 <div class="company-name">
    //                     <a href="#">
    //                         <img src="${logo}" alt="product-logo" id="product-logo">
    //                     </a>
    //                     ПААЗ, ЗАО, г.Первоуральск
    //                 </div>
    //                 <div class="product-article">
    //                     <b>Артикул:</b> <span>П50.1.290.5005</span>
    //                 </div>
    //             </div>
    //             <div class="product-action">
    //                    <div class="product-top">
    //                        <div class="price">
    //                            <b id="product-price">${Price}</b> <span>Ваша цена</span>
    //                        </div>
    //                    </div>
    //                <div class="product-bottom">
    //                    <div class="stock-balance">
    //                        На складе: <b id="stock-balance">${Stock} ${unit}.</b>
    //                    </div>
    //                    <div class="counter">
    //                        <div class="counter-top">
    //                            <button class="counter-button">-</button>
    //                            <div class="counter__input-wrapper">
    //                                <input
    //                                        class="counter-input"
    //                                        inputmode="numeric"
    //                                        autocomplete="off"
    //                                        name="quantity"
    //                                        type="text"
    //                                        data-counter-input
    //                                        data-prev-value="1"
    //                                        value="1" >
    //                            </div>
    //                            <button class="counter-button">+</button>
    //                        </div>
    //                        <div class="counter-bottom">
    //                            <div>
    //                                <button type="button" class="button-primary counter-btn">В корзину</button>
    //                            </div>
    //
    //                        </div>
    //                    </div>
    //                </div>
    //             </div>
    //         </div>
    // `
    // const html = `
    // <div>
    // ${HtmlCatalog}
    // </div>
    // `
    // contentWrapper.innerHTML = html

})
  } catch (error) {
    console.log('Что-то пошло не так!')
  }
}
getData()


//switch
switcher.onchange = function() {
  let val = this.value
  if (val) {

  }
}

//pagination
for (let item of items) {
  item.addEventListener('click', function () {
    let pageNum = +this.innerHTML
    const start = (pageNum - 1) * notesOnPageTen
    const end = start + notesOnPageTen
    let notes = data.slice(start, end)
    console.log(notes)
    // card.innerHTML = ''

  })
}


//lazy img
[].forEach.call(document.querySelectorAll('img[data-src]'),    function(img) {
  img.setAttribute('src', img.getAttribute('data-src'));
  img.onload = function() {
    img.removeAttribute('data-src');
  };
});

//search
search.oninput = function () {
  let value = this.value.trim()
  let searchItems = document.querySelectorAll('.list li')
  if(value !== '') {
    searchItems.forEach(function (element) {
      if (element.innerText.search(value) === -1) {
        element.classList.add('hide')
      } else {
        element.classList.remove('hide')
      }
    })
  } else {
    searchItems.forEach((element) => {
      element.classList.remove('hide')
    })
  }
}




//dropdown
let x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /* When an item is clicked, update the original select box,
      and the selected item: */
      let y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML === this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  let x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt === y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
