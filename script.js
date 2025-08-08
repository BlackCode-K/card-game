let cardContents = [];
const cardCount = 12;

document.addEventListener('DOMContentLoaded', () => {
  createInputFields();
});

function createInputFields() {
  const inputGrid = document.getElementById('input-grid');
  for (let i = 0; i < cardCount; i++) {
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.id = `input-${i}`;
    inputField.placeholder = `ข้อความสำหรับแผ่นป้ายที่ ${i + 1}`;
    inputGrid.appendChild(inputField);
  }
}

function startGame() {
  cardContents = [];
  for (let i = 0; i < cardCount; i++) {
    const inputElement = document.getElementById(`input-${i}`);
    cardContents.push(inputElement.value || `แผ่นป้ายที่ ${i + 1}`);
  }

  // สลับตำแหน่งของ cardContents ก่อนเริ่มเกม
  shuffleArray(cardContents); 

  document.getElementById('setup-view').classList.add('hidden');
  document.getElementById('game-view').classList.remove('hidden');

  createCardGrid();
}

function resetGame() {
  document.getElementById('game-view').classList.add('hidden');
  document.getElementById('setup-view').classList.remove('hidden');
  
  // ล้างข้อความในช่อง input ทั้งหมด
  for (let i = 0; i < cardCount; i++) {
    document.getElementById(`input-${i}`).value = '';
  }
  
  // ล้างอาร์เรย์ข้อความที่เคยใช้
  cardContents = [];
}

function createCardGrid() {
  const cardGrid = document.getElementById('card-grid');
  cardGrid.innerHTML = '';
  for (let i = 0; i < cardCount; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = `แผ่นป้าย ${i + 1}`;
    card.dataset.index = i;
    card.addEventListener('click', flipCard);
    cardGrid.appendChild(card);
  }
}

function flipCard(event) {
  const card = event.target;
  const index = parseInt(card.dataset.index);

  if (!card.classList.contains('flipped')) {
    card.classList.add('flipped');
    card.textContent = cardContents[index];
  }
}

// ฟังก์ชันสำหรับสลับตำแหน่งของอาร์เรย์แบบสุ่ม
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
