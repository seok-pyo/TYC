let isPlate = true;
let isList = false;

const letters = ['a', 'b', 'c', 'A', 'B', 'C', 'ㄱ', 'ㄴ', 'ㄷ'];
const letters2 = ['a', 'b', 'c', 'A', 'B', 'C', 'ㄱ', 'ㄴ', 'ㄷ'];

const plate = document.querySelector('.plate');

let intervalId;

document.addEventListener('DOMContentLoaded', laodPositioning);

const popupOverlay = document.querySelector('.popup');

function laodPositioning() {
  const randomNum = Math.random() > 0.5 ? 0 : 1;

  const isMobile = window.innerWidth <= 900;

  if (randomNum === 0) {
    letters.forEach((ele, index) => {
      let p = document.createElement('p');

      p.innerText = ele;
      p.style.color = 'white';
      p.style.position = 'absolute';
      p.setAttribute('data-letter', `letter${index}`);

      plate.appendChild(p);
      p.classList.add('randomText');
      setRandomPosition(p, isMobile);
    });
  } else {
    letters2.forEach((ele, index) => {
      let p = document.createElement('p');

      p.innerText = ele;
      p.style.color = 'white';
      p.style.position = 'absolute';
      p.setAttribute('data-letter', `letter2-${index}`);
      plate.appendChild(p);
      p.classList.add('randomText');
      setRandomPosition(p, isMobile);
    });
  }

  startRandomPositioning();

  const pArray = Array.from(document.querySelectorAll('.randomText'));

  if (isMobile && isMobileAgent()) {
    pArray.forEach((e) => {
      const letter = e.getAttribute('data-letter');

      e.addEventListener('touchstart', () => {
        const popupContent = document.querySelector(`.${letter}`);

        if (popupContent) popupContent.style.display = 'flex';
        clearInterval(intervalId);
      });
      e.addEventListener('touchend', () => {
        startRandomPositioning();
      });
    });

    document.querySelectorAll('.popup-overlay').forEach((pop) => {
      pop.addEventListener('click', () => {
        pArray.forEach((p) => {
          const letter = p.getAttribute('data-letter');
          const popupContent = document.querySelector(`.${letter}`);
          if (popupContent) popupContent.style.display = 'none';
        });
      });
    });
  } else {
    pArray.forEach((e) => {
      e.addEventListener('mouseover', (event) => {
        clearInterval(intervalId);

        const letter = e.getAttribute('data-letter');

        const popupContent = document.querySelector(`.${letter}`);

        if (popupContent) popupContent.style.display = 'flex';
      });
      e.addEventListener('mouseout', () => {
        startRandomPositioning();
      });
    });

    document.querySelectorAll('.popup-overlay').forEach((pop) => {
      pop.addEventListener('click', () => {
        pArray.forEach((p) => {
          const letter = p.getAttribute('data-letter');
          const popupContent = document.querySelector(`.${letter}`);
          if (popupContent) popupContent.style.display = 'none';
        });
      });
    });
  }
}

function startRandomPositioning() {
  intervalId = setInterval(() => {
    const isMobile = window.innerWidth <= 900;
    const pG = Array.from(document.querySelectorAll('p'));
    pG.forEach((ele) => {
      setRandomPosition(ele, isMobile);
    });
  }, 5000);
}

function setRandomPosition(element, isMobile) {
  const maxTop = window.innerHeight - element.offsetHeight;
  const maxLeft = window.innerWidth - element.offsetWidth;

  if (!isMobile) {
    element.style.left = `${(Math.random() * maxLeft) / 2}px`; // 전체 화면에 나오게 하려면 reason
    element.style.top = `${Math.random() * maxTop + 40}px`;
  } else {
    element.style.left = `${Math.random() * maxLeft}px`; // 전체 화면에 나오게 하려면 reason
    element.style.top = `${Math.random() * maxTop}px`; // 상단은 나누기 / 4
  }
}

function isMobileAgent() {
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
}

document.querySelectorAll('.tb-bar').forEach((bar) => {
  const hiddenBar = bar.nextElementSibling;
  bar.addEventListener('click', () => {
    if (hiddenBar && hiddenBar.classList.contains('hidden1')) {
      hiddenBar.classList.toggle('show');
    }
  });

  if (hiddenBar) {
    hiddenBar.addEventListener('click', (e) => {
      e.stopPropagation();
      hiddenBar.classList.toggle('show');
    });
  }
});
