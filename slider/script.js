const next = document.querySelector('.next'),
      back = document.querySelector('.back'),
      slides = document.querySelectorAll('.slide'),
      slideElements = document.getElementsByClassName('smallslide');
      points = document.querySelectorAll('.point'),
      line = document.querySelector('.slider-line');

let index = 0, action = true;

function currentIndex (value) {
    index = (value + slides.length) % slides.length; //функция, меняющего номер текущего активного слайда
}

function hideSlide(direction) {
    action = false;
    slides[index].classList.add(direction);
    slides[index].addEventListener('animationend', function() {
        this.classList.remove('active', direction);
    })
}

function showSlide(direction) {
    slides[index].classList.add('new', direction);
    slides[index].addEventListener('animationend', function() {
        this.classList.remove('new', direction);
        this.classList.add('active');
        action = true;
    })
    
}
  
next.addEventListener('click', function() {
    if (action) {
        hideSlide('to-right');
        points[index].classList.remove('white');
        currentIndex(index + 1); //!!!внимание, добавляем единичку!!!;
        showSlide('to-left');
        points[index].classList.add('white');
        lineRight()    
    }     
})

back.addEventListener('click', function() {
    if (action) {
        hideSlide('from-left');
        points[index].classList.remove('white');
        currentIndex(index - 1); //!!!внимание, отнимаем единичку!!!;
        showSlide('from-right');
        points[index].classList.add('white');
        lineLeft()   
    }       
})

points.forEach((item, indexItem) => {
    item.addEventListener('click', function() {
        if (action) {
            slides[index].classList.remove('active');
            points[index].classList.remove('white');
            index = indexItem;
            slides[index].classList.add('active');
            this.classList.add('white');
        }      
    })
})


let position = 0;
function lineLeft() {
    position--;
    if (position < 0) {
        position += slideElements.length;
    }
    //line.style.transform = `translateX(${position * 33.5}%`;
    moveLine(position);
}

function lineRight() {
    position++;
    console.log(position);
    //line.style.transform = `translateX(${position * 33.5}%`;
    moveLine(position);
}
    moveLine(position);

    function moveLine(position){
    for (var i = 0; i < slideElements.length; i++) {
        var order = ((i + position + 1) % slideElements.length) - 1;
        
        if (order >= 0 & order <= 2){
            slideElements[i].classList.remove('hidden');
        }
        else {
            slideElements[i].classList.add('hidden');
        }
        var elemPosition = order - i;
        slideElements[i].style.transform = `translateX(${elemPosition * 200 + 2}px)`;
    }
}

