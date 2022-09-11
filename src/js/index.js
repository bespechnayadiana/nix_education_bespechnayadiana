const init = () => {
  renderEvents();
};

const calculateIntersections = (events) => {
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
  eventsContainer.innerHTML = calculateIntersections(events).map(({start, duration, title, int}) => {
    return `<div class="event ${duration <= 15 ? 'small' : ''}" style="top: ${start + 1}px; height: ${duration}px; left: ${int * 200}px;">${title}</div>`;
  }).join('');
};

window.addEventListener('load', init);
