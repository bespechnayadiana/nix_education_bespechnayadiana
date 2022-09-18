const init = () => {
  renderEvents();
  setupCalendarHandlers();
  setupEventModalHandlers();
};

const calculateIntersections = (events) => {
  events.sort((a, b) => b.start - a.start);
  events.forEach((event, i, arr) => {
    const e = arr
      .slice(0, i)
      .reverse()
      .find((e) => event.start + event.duration > e.start);
    event.rtl = e?.rtl + 1 || 0;
  });
  events.reverse().forEach((event, i, arr) => {
    const prev = arr[i - 1] || {left: 0, width: 100};
    const e = arr
      .slice(0, i)
      .reverse()
      .find((e) => event.start >= e.start && event.start < e.start + e.duration);
    event.ltr = e?.ltr + 1 || 0;
    event.width = 100 / (event.rtl + event.ltr + 1);
    event.left = prev.left + prev.width >= 100 ? 0 : prev.left + prev.width;
  });
  return events;
};

const renderEvents = () => {
  const eventsContainer = document.getElementById('js-events');
  eventsContainer.innerHTML = calculateIntersections(events).map(({start, duration, title, left, width, draft}, i) => {
    return `<div class="event ${duration <= 15 ? 'small' : ''} ${draft ? 'draft' : ''}" data-index="${i}" style="top: ${start + 1}px; height: ${duration}px; left: ${left}%; width: ${width}%;">${title}</div>`;
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

const renderEventModalContainer = (e) => (
  `
    <div class="container">
      <input type="text" class="title" id="title" value="${e.title}">
      <select id="start">
        ${times.map((t) => `<option value="${t.value}" ${t.value === e.start ? 'selected' : ''}>${t.label}</option>`).join('')}
      </select>
      <select id="duration">
        ${durations.map((d) => `<option value="${d.value}" ${d.value === e.duration ? 'selected' : ''}>${d.label}</option>`).join('')}
      </select>
    </div>
  `
);

const renderCreateEventModal = (e) => {
  const container = document.getElementById('js-modal-container');
  container.innerHTML = `
    <div class="overlay"></div>
    <div class="modal-content">
        ${renderEventModalContainer(e)}
        <div class="footer">
            <button class="create">Save</button>
        </div>
     </div>
  `;
};

const renderEditEventModal = (e, i) => {
  const container = document.getElementById('js-modal-container');
  container.innerHTML = `
    <div class="overlay"></div>
    <div class="modal-content">
        ${renderEventModalContainer(e)}
        <div class="footer">
          <button class="save" data-index="${i}">Save</button>
          <button class="del" data-index="${i}">Delete</button>
        </div>
     </div>
  `;
};

const getEventDetails = () => {
  const title = document.getElementById('title').value;
  const start = +document.getElementById('start').value;
  const duration = +document.getElementById('duration').value;
  return {
    title,
    start,
    duration,
  };
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
      const i = events.findIndex((e) => e.draft);
      events[i] = getEventDetails();
      modalContainer.innerHTML = '';
      renderEvents();
    }
    if (e.target.classList.contains('del')) {
      events.splice(e.target.dataset.index, 1);
      modalContainer.innerHTML = '';
      renderEvents();
    }
    if (e.target.classList.contains('save')) {
      events[e.target.dataset.index] = getEventDetails();
      modalContainer.innerHTML = '';
      renderEvents();
    }
  });
};

window.addEventListener('load', init);