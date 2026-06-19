/* ============================================================
   LÓGICA DE LA APLICACIÓN
   ============================================================ */

const state = {
  name: "",
  answers: {},        // id -> texto escrito por el estudiante
  submitted: false
};

/* ---------- Utilidades ---------- */

// Normaliza para comparar (verbos y oraciones cortas)
function norm(str) {
  return (str || "")
    .toLowerCase()
    .replace(/[’‘`]/g, "'")          // apóstrofes raros -> '
    .replace(/[.,;:!?"]/g, " ")       // quita puntuación
    .replace(/-/g, " ")               // un-deployed -> un deployed
    .replace(/\s+/g, " ")             // espacios múltiples
    .trim();
}

// Para verbos cortos sí conservamos el apóstrofe (don't, 'll) porque distingue formas
function normVerb(str) {
  return (str || "")
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[.,;:!?"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isCorrectBlank(value, accept) {
  const v = normVerb(value);
  return accept.some(a => normVerb(a) === v);
}

function isCorrectSentence(value, accept) {
  const v = norm(value);
  return accept.some(a => norm(a) === v);
}

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

/* ============================================================
   VISTA 1 -> 2 : Registro
   ============================================================ */
document.getElementById("register-form").addEventListener("submit", function (ev) {
  ev.preventDefault();
  const name = document.getElementById("fullname").value.trim();
  if (!name) return;
  state.name = name;
  document.getElementById("student-name-banner").textContent = name;
  buildExam();
  showView("view-exam");
  window.scrollTo(0, 0);
});

function showView(id) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* ============================================================
   CONSTRUIR EL EXAMEN
   ============================================================ */
function buildExam() {
  buildSection1();
  buildSection2A();
  buildSection2B();
  buildSection3();
}

function sectionHeader(container, sec) {
  container.innerHTML = "";
  container.appendChild(el("h2", null, sec.title));
  container.appendChild(el("p", "section-intro", sec.instructions));
}

/* ---- Sección 1: completar verbos ---- */
function buildSection1() {
  const sec = EXAM.section1;
  const c = document.getElementById("section1");
  sectionHeader(c, sec);

  sec.items.forEach(item => {
    const row = el("div", "q-item");
    row.appendChild(el("span", "q-num", item.n));
    item.parts.forEach(p => {
      if (p.t) {
        row.appendChild(document.createTextNode(p.t));
      } else {
        const inp = el("input", "blank" + (p.wide ? " wide" : ""));
        inp.type = "text";
        inp.id = p.id;
        inp.setAttribute("autocomplete", "off");
        inp.setAttribute("autocapitalize", "off");
        row.appendChild(inp);
        row.appendChild(el("span", "verb-hint", " (" + p.verb + ")"));
      }
    });
    row.appendChild(el("span", "q-tag", item.tag));
    c.appendChild(row);
  });

  addSectionChecker(c, sec.id, () => checkBlanksSection(sec));
}

/* ---- Sección 2A: corregir el error ---- */
function buildSection2A() {
  const sec = EXAM.section2a;
  const c = document.getElementById("section2a");
  sectionHeader(c, sec);

  sec.items.forEach(item => {
    const row = el("div", "q-item");
    row.appendChild(el("span", "q-num", item.n));
    row.appendChild(el("span", "sentence-prompt", " " + item.prompt));
    const inp = el("textarea", "full-input");
    inp.id = item.id;
    inp.rows = 2;
    inp.placeholder = "Escribe la oración corregida...";
    row.appendChild(inp);
    c.appendChild(row);
  });

  addSectionChecker(c, sec.id, () => checkSentenceSection(sec));
}

/* ---- Sección 2B: ordenar ---- */
function buildSection2B() {
  const sec = EXAM.section2b;
  const c = document.getElementById("section2b");
  sectionHeader(c, sec);

  sec.items.forEach(item => {
    const row = el("div", "q-item");
    row.appendChild(el("span", "q-num", item.n));
    row.appendChild(el("div", "scrambled-words", item.scrambled));
    const inp = el("textarea", "full-input");
    inp.id = item.id;
    inp.rows = 2;
    inp.placeholder = "Escribe la oración ordenada...";
    row.appendChild(inp);
    c.appendChild(row);
  });

  addSectionChecker(c, sec.id, () => checkSentenceSection(sec));
}

/* ---- Sección 3: lectura abierta ---- */
function buildSection3() {
  const sec = EXAM.section3;
  const c = document.getElementById("section3");
  sectionHeader(c, sec);

  const caseBox = el("div", "card");
  caseBox.style.background = "#f7faf6";
  caseBox.style.boxShadow = "none";
  caseBox.appendChild(el("h3", null, sec.caseTitle));
  sec.caseText.forEach(p => caseBox.appendChild(el("p", null, p)));
  c.appendChild(caseBox);

  sec.items.forEach(item => {
    const row = el("div", "q-item");
    row.appendChild(el("span", "q-num", item.n));
    row.appendChild(el("span", null, " " + item.q));
    const inp = el("textarea", "open-input");
    inp.id = item.id;
    inp.rows = 2;
    inp.placeholder = "Escribe tu respuesta...";
    row.appendChild(document.createElement("br"));
    row.appendChild(inp);
    c.appendChild(row);
  });

  // La sección 3 no se autocalifica: solo confirma guardado
  const actions = el("div", "section-actions");
  const btn = el("button", "btn btn-check", "Guardar esta sección");
  const status = el("span", "section-score");
  btn.addEventListener("click", () => {
    captureAnswers();
    status.className = "section-score saved-note";
    status.textContent = "✓ Respuestas guardadas. Se revisarán en grupo con la instructora.";
  });
  actions.appendChild(btn);
  actions.appendChild(status);
  c.appendChild(actions);
}

/* ---- Verificador genérico por sección ---- */
function addSectionChecker(container, secId, checkFn) {
  const actions = el("div", "section-actions");
  const btn = el("button", "btn btn-check", "Verificar esta sección");
  const score = el("span", "section-score");
  btn.addEventListener("click", () => {
    const res = checkFn();
    score.className = "section-score " + (res.correct === res.total ? "good" : "partial");
    score.textContent = `Correctas: ${res.correct} de ${res.total}`;
  });
  actions.appendChild(btn);
  actions.appendChild(score);
  container.appendChild(actions);
}

/* ---- Calificar blanks (sección 1) ---- */
function checkBlanksSection(sec) {
  let correct = 0, total = 0;
  sec.items.forEach(item => {
    item.parts.forEach(p => {
      if (p.id) {
        total++;
        const inp = document.getElementById(p.id);
        const ok = isCorrectBlank(inp.value, p.accept);
        inp.classList.remove("ok", "bad");
        inp.classList.add(ok ? "ok" : "bad");
        if (ok) correct++;
      }
    });
  });
  captureAnswers();
  return { correct, total };
}

/* ---- Calificar oraciones (2A y 2B) ---- */
function checkSentenceSection(sec) {
  let correct = 0, total = 0;
  sec.items.forEach(item => {
    total++;
    const inp = document.getElementById(item.id);
    const ok = isCorrectSentence(inp.value, item.accept);
    inp.classList.remove("ok", "bad");
    inp.classList.add(ok ? "ok" : "bad");
    if (ok) correct++;
  });
  captureAnswers();
  return { correct, total };
}

/* ---- Guardar lo escrito en el estado ---- */
function captureAnswers() {
  document.querySelectorAll(".blank, .full-input, .open-input").forEach(inp => {
    state.answers[inp.id] = inp.value.trim();
  });
}

/* ============================================================
   FINALIZAR Y ENVIAR
   ============================================================ */
document.getElementById("btn-finish").addEventListener("click", async function () {
  captureAnswers();
  const status = document.getElementById("finish-status");
  this.disabled = true;
  status.className = "finish-status";
  status.textContent = "Enviando respuestas...";

  const payload = buildPayload();

  try {
    if (CONFIG.SHEET_ENDPOINT) {
      await fetch(CONFIG.SHEET_ENDPOINT, {
        method: "POST",
        mode: "no-cors", // Apps Script no devuelve CORS; se envía igual
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
    } else {
      downloadBackup(payload); // respaldo local si no hay endpoint
    }
    state.submitted = true;
    buildResults();
    showView("view-results");
    window.scrollTo(0, 0);
  } catch (e) {
    status.className = "finish-status err";
    status.textContent = "No se pudo enviar. Revisa tu conexión e inténtalo de nuevo.";
    this.disabled = false;
  }
});

/* Arma un objeto plano: nombre + cada respuesta + puntaje auto-calificable */
function buildPayload() {
  const auto = autoScore();
  const flat = {
    nombre: state.name,
    fecha: new Date().toLocaleString("es-CO"),
    puntaje_auto: `${auto.correct}/${auto.total}`
  };
  // todas las respuestas con su id
  Object.keys(state.answers).forEach(id => { flat[id] = state.answers[id]; });
  return flat;
}

/* Puntaje automático de S1 + S2A + S2B (la S3 no se autocalifica) */
function autoScore() {
  let correct = 0, total = 0;
  EXAM.section1.items.forEach(it => it.parts.forEach(p => {
    if (p.id) { total++; if (isCorrectBlank(state.answers[p.id], p.accept)) correct++; }
  }));
  [EXAM.section2a, EXAM.section2b].forEach(sec => sec.items.forEach(it => {
    total++; if (isCorrectSentence(state.answers[it.id], it.accept)) correct++;
  }));
  return { correct, total };
}

function downloadBackup(payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "respuestas_" + state.name.replace(/\s+/g, "_") + ".json";
  document.body.appendChild(a); a.click(); a.remove();
}

/* ============================================================
   VISTA 3: RESULTADOS (solo lectura)
   ============================================================ */
function buildResults() {
  document.getElementById("results-name").textContent = "Aprendiz: " + state.name;
  const root = document.getElementById("results-content");
  root.innerHTML = "";

  root.appendChild(resultSection1());
  root.appendChild(resultSentenceSection(EXAM.section2a));
  root.appendChild(resultSentenceSection(EXAM.section2b));
  root.appendChild(resultOpenSection(EXAM.section3));
}

/* Sección 1: muestra la oración con el verbo correcto subrayado + lo que puso */
function resultSection1() {
  const sec = EXAM.section1;
  const box = el("div", "card result-section");
  box.appendChild(el("h2", null, sec.title));

  sec.items.forEach(item => {
    const it = el("div", "result-item");

    // Línea correcta (verbo correcto subrayado)
    const correctLine = el("div", "correct-line");
    correctLine.appendChild(el("span", "q-num", item.n));
    item.parts.forEach(p => {
      if (p.t) correctLine.appendChild(document.createTextNode(p.t));
      else {
        const u = el("u", null, p.accept[0]);
        correctLine.appendChild(u);
        correctLine.appendChild(document.createTextNode(" (" + p.verb + ")"));
      }
    });
    it.appendChild(correctLine);

    // Línea del estudiante
    const yourLine = el("div", "your-line");
    yourLine.appendChild(document.createTextNode("Tú escribiste: "));
    let allOk = true;
    item.parts.forEach(p => {
      if (p.id) {
        const val = state.answers[p.id] || "";
        const ok = isCorrectBlank(val, p.accept);
        if (!ok) allOk = false;
        const span = el("span", ok ? "" : "miss", (val || "—") + " ");
        yourLine.appendChild(span);
      }
    });
    const badge = el("span", "badge " + (allOk ? "ok" : "bad"), allOk ? "Correcto" : "Revisar");
    yourLine.appendChild(badge);
    it.appendChild(yourLine);

    box.appendChild(it);
  });
  return box;
}

/* Secciones 2A / 2B: muestra modelo correcto + lo que puso */
function resultSentenceSection(sec) {
  const box = el("div", "card result-section");
  box.appendChild(el("h2", null, sec.title));

  sec.items.forEach(item => {
    const it = el("div", "result-item");
    const val = state.answers[item.id] || "";
    const ok = isCorrectSentence(val, item.accept);

    const correctLine = el("div", "correct-line");
    correctLine.appendChild(el("span", "q-num", item.n));
    correctLine.appendChild(el("u", null, item.model));
    it.appendChild(correctLine);

    const yourLine = el("div", "your-line");
    yourLine.innerHTML = "Tú escribiste: <span class='" + (ok ? "" : "miss") + "'>" + (val || "—") + "</span>";
    yourLine.appendChild(el("span", "badge " + (ok ? "ok" : "bad"), ok ? "Correcto" : "Revisar"));
    it.appendChild(yourLine);

    box.appendChild(it);
  });
  return box;
}

/* Sección 3: abierta -> muestra modelo de referencia + lo que puso (sin nota) */
function resultOpenSection(sec) {
  const box = el("div", "card result-section");
  box.appendChild(el("h2", null, sec.title));
  box.appendChild(el("p", "section-intro", "Esta sección se revisa en grupo. Abajo tienes una respuesta de referencia y lo que tú escribiste."));

  sec.items.forEach(item => {
    const it = el("div", "result-item");
    const val = state.answers[item.id] || "";

    const ref = el("div", "correct-line");
    ref.appendChild(el("span", "q-num", item.n));
    ref.appendChild(el("u", null, item.model));
    it.appendChild(ref);

    const yourLine = el("div", "your-line");
    yourLine.innerHTML = "Tú escribiste: " + (val || "—");
    yourLine.appendChild(el("span", "badge open", "Revisión grupal"));
    it.appendChild(yourLine);

    box.appendChild(it);
  });
  return box;
}
