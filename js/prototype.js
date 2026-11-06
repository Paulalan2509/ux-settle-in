/* Settle In: clickable prototype
   Screens are plain HTML sections. This script only shows one at a time,
   keeps a back history and updates the progress when a task is marked done. */

const screens = [...document.querySelectorAll('[data-screen]')];
const history = ['welcome'];
const BASE_DONE = 2;          // tasks finished before the first one on the list
const TOTAL = 12;
const done = new Set(['office']);

const toast = document.querySelector('.toast');
const live = document.getElementById('live');
let toastTimer;

function show(name, { remember = true } = {}) {
  const target = screens.find(s => s.dataset.screen === name);
  if (!target) return;
  screens.forEach(s => { s.hidden = s !== target; });
  if (remember && history[history.length - 1] !== name) history.push(name);
  const heading = target.querySelector('[data-focus]');
  if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
  const body = target.querySelector('.sbody');
  if (body) body.scrollTop = 0;
  if (live) live.textContent = heading ? heading.textContent : '';
}

function back() {
  if (history.length > 1) history.pop();
  show(history[history.length - 1], { remember: false });
}

function update() {
  const count = BASE_DONE + done.size;
  document.querySelectorAll('[data-done-count]').forEach(el => { el.textContent = count; });
  document.querySelectorAll('[data-bar]').forEach(el => { el.style.width = Math.round(count / TOTAL * 100) + '%'; });
  document.querySelectorAll('[data-bar-wrap]').forEach(el => el.setAttribute('aria-valuenow', count));
  document.querySelectorAll('.task[data-task]').forEach(el => {
    const isDone = done.has(el.dataset.task);
    el.classList.toggle('done', isDone);
    const small = el.querySelector('small');
    if (small) small.textContent = isDone ? 'Done' : small.dataset.pending;
  });
  document.querySelectorAll('[data-done]').forEach(btn => {
    const isDone = done.has(btn.dataset.done);
    btn.classList.toggle('done-state', isDone);
    btn.setAttribute('aria-pressed', String(isDone));
    btn.textContent = isDone ? 'Done. Tap to undo' : 'Mark as done';
  });
  document.querySelectorAll('[data-status]').forEach(el => {
    const isDone = done.has(el.dataset.status);
    el.classList.toggle('ok', isDone);
    el.textContent = isDone ? 'Done' : 'To do';
  });
}

function say(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

document.addEventListener('click', e => {
  const go = e.target.closest('[data-go]');
  if (go) { show(go.dataset.go); return; }
  if (e.target.closest('[data-back]')) { back(); return; }
  const mark = e.target.closest('[data-done]');
  if (mark) {
    const key = mark.dataset.done;
    if (done.has(key)) done.delete(key); else done.add(key);
    update();
    say(done.has(key) ? 'Nice. Task marked as done.' : 'Task moved back to your list.');
    return;
  }
  if (e.target.closest('[data-demo]')) say('This is a prototype, so this button is not connected.');
  if (e.target.closest('[data-restart]')) {
    done.clear(); done.add('office'); history.length = 0; history.push('welcome');
    update(); show('welcome', { remember: false });
  }
});

update();
show('welcome', { remember: false });
