const init = () => {
  renderEvents();
  setupCalendarHandlers();
  setupEventModalHandlers();
};

const calculateIntersections = (events) => {
  events.sort((a, b) => a.start - b.start);
  events.forEach((event, i, arr) => {
    const e = arr
      .slice(0, i)
      .reverse()
      .find((e) => event.start >= e.start && event.start < e.start + e.duration);
    event.int = e?.int + 1 || 0;
  });
  return events;
};

const renderEvents = () => {
  const eventsContainer = document.getElementById('js-events');
  eventsContainer.innerHTML = calculateIntersections(events).map(({start, duration, title, int, draft}, i) => {
    return `<div class="event ${duration <= 15 ? 'small' : ''} ${draft ? 'draft' : ''}" data-index="${i}" style="top: ${start + 1}px; height: ${duration}px; left: ${int * 200}px;">${title}</div>`;
  }).join('');
};

const setupCalendarHandlers = () => {
  const time = document.getElementById('time');
  time.addEventListener('click', (e) => {
    if (e.target.classList.contains('quarter-hour')) {
      const { start } = e.target.dataset;
      const event = {
        draft: true,
        start: +start,
        duration: 15,
        title: '(no title)'
      };
      events.push(event);
      renderEvents();
      renderCreateEventModal(event);
    }
    if (e.target.classList.contains('event')) {
      const { index } = e.target.dataset;
      renderEditEventModal(events[index], index);
    }
  });
};

const renderCreateEventModal = (e) => {
  const container = document.getElementById('js-modal-container');
  container.innerHTML = `
    <div class="overlay"></div>
    <div class="modal-content">
        <div class="container">
          <div class="title">${e.title}</div>
          <div class="start">${e.start}</div>
          <div class="duration">${e.duration}</div>
        </div>
        <button class="create">Save</button>
     </div>
  `;
};

const renderEditEventModal = (e, i) => {
  const container = document.getElementById('js-modal-container');
  container.innerHTML = `
    <div class="overlay"></div>
    <div class="modal-content">
        <div class="container">
          <div class="title">${e.title}</div>
          <div class="start">${e.start}</div>
          <div class="duration">${e.duration}</div>
        </div>
        <div class="footer">
          <button class="save" data-index="${i}">Save</button>
          <button class="del" data-index="${i}">Delete</button>
        </div>
     </div>
  `;
};

const setupEventModalHandlers = () => {
  const modalContainer = document.getElementById('js-modal-container');
  modalContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('overlay')) {
      events = events.filter((e) => !e.draft);
      modalContainer.innerHTML = '';
      renderEvents();
    }
    if (e.target.classList.contains('create')) {
      events.forEach((e) => e.draft = false);
      modalContainer.innerHTML = '';
      renderEvents();
    }
    if (e.target.classList.contains('del')) {
      events.splice(e.target.dataset.index, 1);
      modalContainer.innerHTML = '';
      renderEvents();
    }
    if (e.target.classList.contains('save')) {
      modalContainer.innerHTML = '';
      renderEvents();
    }
  });
};

window.addEventListener('load', init);