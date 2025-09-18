const carousel = document.querySelector('.carousel');
const images = [
  'imagens/img1.jpg',
  'imagens/img2.jpg',
  'imagens/img3.jpg'
];

// Criar os cards dinamicamente
images.forEach(src => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <img src="${src}" alt="Imagem do carrossel">
  `;
  carousel.appendChild(card);
});

let index = 0;

function showSlide(n) {
  const total = images.length;
  if (n >= total) index = 0;
  if (n < 0) index = total - 1;
  carousel.style.transform = `translateX(${-index * 100}%)`;
}

document.getElementById('nextBtn').addEventListener('click', () => {
  index++;
  showSlide(index);
});

document.getElementById('prevBtn').addEventListener('click', () => {
  index--;
  showSlide(index);
});

// Mostrar primeiro slide ao carregar
showSlide(index);
