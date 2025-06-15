document.addEventListener('DOMContentLoaded', () => {
  const noteInput = document.getElementById('noteInput');
  const saveBtn = document.getElementById('saveBtn');
  const notesList = document.getElementById('notesList');

  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  renderNotes();

  saveBtn.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    if (noteText === '') return;

    const now = new Date();
    const note = {
      text: noteText,
      date: now.toISOString()
    };

    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    noteInput.value = '';
    renderNotes();
  });

  function renderNotes() {
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
      const li = document.createElement('li');

      const textSpan = document.createElement('span');
      textSpan.className = 'note-text';
      textSpan.textContent = note.text;

      const dateSpan = document.createElement('span');
      dateSpan.className = 'note-date';
      dateSpan.textContent = formatDate(note.date);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '🗑️';
      deleteBtn.className = 'delete-btn';
      deleteBtn.addEventListener('click', () => {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
      });

      li.appendChild(textSpan);
      li.appendChild(dateSpan);
      li.appendChild(deleteBtn);
      notesList.appendChild(li);
    });
  }

  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const mins = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${mins}`;
  }

  const menuBtn = document.getElementById('menuBtn');
  const menuOverlay = document.getElementById('menuOverlay');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const logoutBtnClassic = document.getElementById('logoutBtnClassic');

  const justLoggedIn = sessionStorage.getItem('justLoggedIn') === 'true';

  if (justLoggedIn) {
    logoutBtnClassic.style.display = 'block';
    menuBtn.style.display = 'none';
  } else {
    logoutBtnClassic.style.display = 'none';
    menuBtn.style.display = 'block';
  }

  menuBtn.addEventListener('click', () => {
    menuOverlay.style.display = 'flex';
    menuOverlay.setAttribute('aria-hidden', 'false');
  });

  closeMenuBtn.addEventListener('click', () => {
    menuOverlay.style.display = 'none';
    menuOverlay.setAttribute('aria-hidden', 'true');
  });

  menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
      menuOverlay.style.display = 'none';
      menuOverlay.setAttribute('aria-hidden', 'true');
    }
  });
});
