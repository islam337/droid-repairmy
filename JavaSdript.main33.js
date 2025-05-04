document.addEventListener('DOMContentLoaded', function() {
    // Анимация при прокрутке
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Инициализация при загрузке
    
    // Форма обратного звонка
    const callbackForms = document.querySelectorAll('form[id^="callback-form"]');
    
    callbackForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            
            // Здесь должна быть логика отправки данных на сервер
            console.log('Форма отправлена', formData);
            
            // Показываем сообщение об успехе
            alert(`Спасибо, ${name}! Мы скоро с вами свяжемся.`);
            this.reset();
        });
    });
    
    // Фиксированная кнопка заказа звонка
    const fixedCallbackBtn = document.querySelector('.fixed-callback .btn');
    const callbackForm = document.querySelector('.callback-form');
    
    fixedCallbackBtn.addEventListener('click', function() {
        callbackForm.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
class Slider {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' 
            ? document.querySelector(container) 
            : container;
        
        this.options = {
            autoPlay: options.autoPlay || false,
            interval: options.interval || 3000,
            ...options
        };
        
        this.slides = this.container.querySelectorAll('.slider__item');
        this.wrapper = this.container.querySelector('.slider__wrapper');
        this.prevBtn = this.container.querySelector('.slider__prev');
        this.nextBtn = this.container.querySelector('.slider__next');
        
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        this.setSlideWidth();
        this.addEventListeners();
        
        if (this.options.autoPlay) {
            this.startAutoPlay();
        }
    }
    
    setSlideWidth() {
        this.slides.forEach(slide => {
            slide.style.width = ${100 / this.slideCount}%;
        });
        
        this.wrapper.style.width = ${100 * this.slideCount}%;
    }
    
    goToSlide(index) {
        if (index < 0) {
            index = this.slideCount - 1;
        } else if (index >= this.slideCount) {
            index = 0;
        }
        
        this.currentIndex = index;
        const translateX = -index * (100 / this.slideCount);
        this.wrapper.style.transform = translateX(${translateX}%);
    }
    
    nextSlide() {
        this.goToSlide(this.currentIndex + 1);
    }
    
    prevSlide() {
        this.goToSlide(this.currentIndex - 1);
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.options.interval);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    addEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                if (this.options.autoPlay) {
                    this.stopAutoPlay();
                    this.startAutoPlay();
                }
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                if (this.options.autoPlay) {
                    this.stopAutoPlay();
                    this.startAutoPlay();
                }
            });
        }
        
        // Пауза автоплея при наведении
        if (this.options.autoPlay) {
            this.container.addEventListener('mouseenter', () => {
                this.stopAutoPlay();
            });
            
            this.container.addEventListener('mouseleave', () => {
                this.startAutoPlay();
            });
        }
    }
}

// Инициализация всех слайдеров на странице
document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach(slider => {
        new Slider(slider, {
            autoPlay: slider.classList.contains('auto-play'),
            interval: 5000
        });
    });
});
