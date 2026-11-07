(function () {
  var KEY = 'excel-checklist-v1';
  var boxes = Array.prototype.slice.call(document.querySelectorAll('.task input[type="checkbox"]'));
  var fill = document.getElementById('pbFill');
  var count = document.getElementById('pbCount');
  var resetBtn = document.getElementById('resetBtn');

  function load() {
    try {
      var raw = window.localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function save(state) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      /* 本地文件或隐私模式下可能不可用，忽略即可 */
    }
  }

  function currentState() {
    var state = {};
    boxes.forEach(function (b) {
      if (b.checked) state[b.id] = 1;
    });
    return state;
  }

  function updateProgress() {
    if (!boxes.length) return;
    var done = boxes.filter(function (b) { return b.checked; }).length;
    var pct = Math.round((done / boxes.length) * 100);
    if (fill) fill.style.width = pct + '%';
    if (count) count.textContent = done + ' / ' + boxes.length;
  }

  var saved = load();
  boxes.forEach(function (b) {
    if (saved[b.id]) b.checked = true;
  });

  boxes.forEach(function (b) {
    b.addEventListener('change', function () {
      save(currentState());
      updateProgress();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      if (!window.confirm('确定清空所有勾选记录吗？此操作不可撤销。')) return;
      boxes.forEach(function (b) { b.checked = false; });
      save({});
      updateProgress();
    });
  }

  updateProgress();
})();
