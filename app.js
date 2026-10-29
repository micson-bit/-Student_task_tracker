(() => {
  const STORAGE_KEY = "studyflow.tasks.v1";
  const form = document.querySelector("#task-form");
  const input = document.querySelector("#task-input");
  const list = document.querySelector("#task-list");
  const message = document.querySelector("#form-message");
  const clearButton = document.querySelector("#clear-completed");
  const dateLabel = document.querySelector("#today-label");
  let tasks = loadTasks();

  function loadTasks() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(saved) ? saved.filter((task) => task && typeof task.id === "string" && typeof task.title === "string" && typeof task.completed === "boolean") : [];
    } catch {
      return [];
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      return true;
    } catch {
      message.textContent = "Your browser couldn't save this change. Check your storage settings.";
      return false;
    }
  }

  function makeIcon(name) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("aria-hidden", "true");
    if (name === "check") {
      const path = document.createElementNS(svg.namespaceURI, "path");
      path.setAttribute("d", "m5 12.5 4.2 4.2L19 7");
      path.setAttribute("stroke", "currentColor");
      path.setAttribute("stroke-width", "3");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("stroke-linejoin", "round");
      svg.append(path);
    } else {
      const path = document.createElementNS(svg.namespaceURI, "path");
      path.setAttribute("d", "M4 7h16M10 11v6m4-6v6M5 7l1 13h12l1-13M9 7V4h6v3");
      path.setAttribute("stroke", "currentColor");
      path.setAttribute("stroke-width", "1.8");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("stroke-linejoin", "round");
      svg.append(path);
    }
    return svg;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return Number.isNaN(date.getTime()) ? "Added to your planner" : `Added ${new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(date)}`;
  }

  function render() {
    list.replaceChildren();
    const completed = tasks.filter((task) => task.completed).length;
    const percent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
    document.querySelector("#total-count").textContent = String(tasks.length);
    document.querySelector("#completed-count").textContent = String(completed);
    document.querySelector("#heading-count").textContent = String(tasks.length);
    document.querySelector("#progress-percent").textContent = `${percent}%`;
    document.querySelector("#progress-fill").style.width = `${percent}%`;
    document.querySelector("#progress-bar").setAttribute("aria-valuenow", String(percent));
    clearButton.hidden = completed === 0;

    if (!tasks.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      const art = document.createElement("div");
      art.className = "empty-illustration";
      art.setAttribute("aria-hidden", "true");
      art.textContent = "✳";
      const title = document.createElement("h3");
      title.textContent = "A fresh start.";
      const copy = document.createElement("p");
      copy.textContent = "Your study list is clear. Add an assignment or goal above and take it one step at a time.";
      empty.append(art, title, copy);
      list.append(empty);
      return;
    }

    tasks.forEach((task) => {
      const row = document.createElement("article");
      row.className = `task-row${task.completed ? " completed" : ""}`;
      const check = document.createElement("button");
      check.className = "task-check";
      check.type = "button";
      check.setAttribute("aria-label", `${task.completed ? "Mark incomplete" : "Mark complete"}: ${task.title}`);
      check.setAttribute("aria-pressed", String(task.completed));
      check.append(makeIcon("check"));
      check.addEventListener("click", () => {
        task.completed = !task.completed;
        saveTasks();
        render();
      });

      const copy = document.createElement("div");
      copy.className = "task-copy";
      const title = document.createElement("div");
      title.className = "task-title";
      title.textContent = task.title;
      const date = document.createElement("span");
      date.className = "task-date";
      date.textContent = formatDate(task.createdAt);
      copy.append(title, date);

      const actions = document.createElement("div");
      actions.className = "task-actions";
      const tag = document.createElement("span");
      tag.className = "task-tag";
      tag.textContent = task.completed ? "Done" : "Study task";
      const remove = document.createElement("button");
      remove.className = "delete-button";
      remove.type = "button";
      remove.setAttribute("aria-label", `Remove task: ${task.title}`);
      remove.append(makeIcon("trash"));
      remove.addEventListener("click", () => {
        tasks = tasks.filter((item) => item.id !== task.id);
        saveTasks();
        render();
      });
      actions.append(tag, remove);
      row.append(check, copy, actions);
      list.append(row);
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = input.value.trim();
    if (!title) {
      message.textContent = "Add a task title first — even a short one is a good start.";
      input.setAttribute("aria-invalid", "true");
      input.focus();
      return;
    }
    message.textContent = "";
    input.removeAttribute("aria-invalid");
    tasks.unshift({ id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, title, completed: false, createdAt: new Date().toISOString() });
    saveTasks();
    render();
    input.value = "";
    input.focus();
  });

  input.addEventListener("input", () => {
    if (input.value.trim()) {
      message.textContent = "";
      input.removeAttribute("aria-invalid");
    }
  });

  clearButton.addEventListener("click", () => {
    tasks = tasks.filter((task) => !task.completed);
    saveTasks();
    render();
  });

  dateLabel.textContent = new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" }).format(new Date());
  render();
})();
