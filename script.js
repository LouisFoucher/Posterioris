document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('noteInput');
    const saveBtn = document.getElementById('saveBtn');
    const notesList = document.getElementById('notesList');
  
    // notes = tableau d’objets { text: ..., date: ... }
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
  
    // Formate la date en jj/mm/aaaa hh:mm
    function formatDate(isoString) {
      const date = new Date(isoString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const mins = String(date.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${mins}`;
    }
  });
  