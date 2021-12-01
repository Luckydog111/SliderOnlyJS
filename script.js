const imagesList = [
0, 1, 2, 3, 4,
];

let viewport = document.getElementById('viewport');
let myImg = document.getElementById('my_img');
const btnNext = document.querySelector('.next');
const btnPrev = document.querySelector('.prev');
let slider = document.querySelector('.slider');
let viewSlider = document.querySelector('#viewSlider');
let activatedButtons = true;
let i = 0; 
let pixels = 0;
let k = 0;
let d = 0;

function createImagesList (list, parent) {
    list.forEach((numberOfPicture) => {
        parent.innerHTML += `
        <div id = "slide" class="slide">
        <img id = "my_img" src="./img/${numberOfPicture}.jpg" alt="">
        </div>
        `; 
    });
}

createImagesList(imagesList, slider);

viewSlider.innerHTML = '';
imagesList.forEach(() => {
    viewSlider.innerHTML += `
        <div class="viewSlide"></div>
    `;
});

let viewSliders = document.querySelectorAll('.viewSlide');
viewSliders[0].classList.add('active');

viewSliders.forEach((item, numberActiveBtn) => {
    viewSliders[numberActiveBtn].addEventListener('click', (event) => {
        event.preventDefault();

        if (activatedButtons) {
            let target = event.target;
            viewSliders.forEach(item => {
                item.classList.remove('active');
            });
            target.classList.add('active');
    
            if (numberActiveBtn >= 0 && (numberActiveBtn + k) < i) {
                let marginLeftString = slider.style.marginLeft.length; 
                let marginLeftWithOutPx = slider.style.marginLeft.slice(0, marginLeftString - 2); 
                let marginLeftNumber = Number(marginLeftWithOutPx); 
                pixels = 0;
                let right = setInterval(() => {
                    if (slider.style.marginLeft == `${-(numberActiveBtn + k) * 600}px`) {
                        activatedButtons = true;
                        clearInterval(right);
                        return;
                    }
                    slider.style = `margin-left: ${marginLeftNumber + pixels}px`;
                    pixels = pixels + 20;              
                }, 10);
                
            } else if (numberActiveBtn >= 0 && (numberActiveBtn + k) > i) {
                let marginLeftString = slider.style.marginLeft.length; 
                let marginLeftWithOutPx = slider.style.marginLeft.slice(0, marginLeftString - 2); 
                let marginLeftNumber = Number(marginLeftWithOutPx); 
                pixels = 0;
                let right = setInterval(() => {
                    if (slider.style.marginLeft == `${-(numberActiveBtn + k) * 600}px` || slider.style.marginLeft == `${(numberActiveBtn + k) * 600}px`) {
                        activatedButtons = true;
                        clearInterval(right);
                        return;
                    }
                    slider.style = `margin-left: ${marginLeftNumber + pixels}px`;
                    pixels = pixels - 20;
                                        
                }, 10);
            }
            d = numberActiveBtn;
            i = numberActiveBtn + k; 
            
        }

        activatedButtons = false;
            
    });
});

btnNext.addEventListener('click', (event) => {
    event.preventDefault();
    
    if (activatedButtons) {
        myImg = document.getElementById('my_img');
        slider = document.querySelector('.slider');
        arrImg = document.querySelectorAll('.slide');
        let lenLeft = slider.style.marginLeft.length;
        pixels = slider.style.marginLeft.slice(0, lenLeft - 2);
        let timerNext = setInterval(() => {
            if (slider.style.marginLeft == `${-i* 600}px` || slider.style.marginLeft == `${i* 600}px` ) {
                clearInterval(timerNext);
                activatedButtons = true;
                return;
            }
            slider.style = `margin-left: ${pixels}px`;
            pixels = pixels - 20;
        }, 10);
    
        i++;
    
        if (i == 0 || i%(imagesList.length) == 0) {
            createImagesList(imagesList, slider);
        }
    
        if (i%(imagesList.length) == 0 && i != 0 && k != i) {
            k += imagesList.length;
        }
        
        viewSliders.forEach(item => {
            item.classList.remove('active');
        });
    
        if (d === imagesList.length - 1) {
            d = -1;
        }
        d++;
        viewSliders[d].classList.add('active');   
    }
    activatedButtons = false;
});

btnPrev.addEventListener('click', (event) => {
    event.preventDefault();
    if (activatedButtons) {
        myImg = document.getElementById('my_img');
        slider = document.querySelector('.slider');
        arrImg = document.querySelectorAll('.slide');
    
        if (i%(imagesList.length) == 0 && i != 0) {
            k -= imagesList.length;
        }
     
        if (i == 0 || i%(imagesList.length) == 0) {
            slider.style.marginLeft = `-${imagesList.length * 600}px`;
            pixels = 0;
            imagesList.forEach((item, j) => {
             
                slider.insertAdjacentHTML("afterbegin", `
                <div id = "slide" class="slide">
                <img id = "my_img" src="./img/${imagesList.length - 1 - j}.jpg" alt="">
                </div>
                `); 
            });
    
            let timerPrev = setInterval(() => {
                i = imagesList.length - 1;
                if (slider.style.marginLeft == `${-(imagesList.length - 1)* 600}px` ) {
                    activatedButtons = true;
                    clearInterval(timerPrev);
                    return;
                }
                console.log(slider.style.width);
    
                slider.style = `margin-left: ${(-(imagesList.length * 600))  + pixels}px`;
                pixels = pixels + 20;
            }, 10);     
    
        } else {
            let marginLeftString = slider.style.marginLeft.length; 
            let marginLeftWithOutPx = slider.style.marginLeft.slice(0, marginLeftString - 2); 
            let marginLeftNumber = Number(marginLeftWithOutPx); 
            pixels = 0;
            let timerNext = setInterval(() => {
                if (slider.style.marginLeft == `${-(imagesList.length + i)* 600}px` || slider.style.marginLeft == `${-(i)* 600}px`) {
                    activatedButtons = true;
                    clearInterval(timerNext);
                    return;
                }
                slider.style = `margin-left: ${marginLeftNumber + pixels}px`;
                pixels = pixels + 20;       
            }, 10);
        }
    
        viewSliders.forEach(item => {
            item.classList.remove('active');
        });
    
        if (d === 0) {
            d = imagesList.length;
        }
        d--;
        viewSliders[d].classList.add('active');
        i--;   

    }
    activatedButtons = false;    
});    