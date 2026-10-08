// Data om rollerna. Ändra texten här, inte i funktionerna.
const roles = {
  support: {
    title: "IT-support",
    description: "Du hjälper användare med dator, nätverk och program. Ett bra sätt att komma in i branschen.",
    time: "8–12 månaders utbildning",
    family: "Ofta fasta arbetstider och möjlighet till distans",
    start: "En grundkurs i datorer och nätverk",
    image: "bilder/support.jpg",
    imageAlt: "Person som hjälper en kollega med datorn på ett kontor"
  },
  web: {
    title: "Webbutvecklare",
    description: "Du bygger webbplatser och appar med HTML, CSS och JavaScript.",
    time: "1–2 års studier",
    family: "Ofta flexibelt och många jobbar på distans",
    start: "Bygg en egen liten webbsida",
    image: "bilder/webb.jpg",
    imageAlt: "Kod på en skärm i en kodeditor"
  },
  test: {
    title: "Testare",
    description: "Du letar efter fel i program innan användarna gör det. Passar den som är noggrann.",
    time: "8–12 månaders utbildning",
    family: "Ofta regelbundna tider och bra för dig med erfarenhet från en annan bransch",
    start: "En introduktion till testning",
    image: "bilder/test.jpg",
    imageAlt: "Person som testar en app på en mobiltelefon"
  },
  data: {
    title: "Dataanalytiker",
    description: "Du samlar in och tolkar data så att företag kan fatta bättre beslut.",
    time: "1–2 års studier",
    family: "Ofta kontorsarbete med viss flexibilitet",
    start: "Lär dig grunderna i Excel och SQL",
    image: "bilder/data.jpg",
    imageAlt: "Diagram och siffror på en datorskärm"
  }
};

// Element som koden använder
const roleButtons = document.querySelectorAll(".role-button");
const roleImage = document.querySelector("#role-image");
const roleIntro = document.querySelector("#role-intro");
const roleDetails = document.querySelector("#role-details");
const factButtons = document.querySelectorAll(".fact");
const factPanel = document.querySelector("#fact-panel");
const factDetails = document.querySelectorAll(".fact-detail");
const faqQuestions = document.querySelectorAll(".faq-question");
const scaleItems = document.querySelectorAll(".scale-item");
const showResultButton = document.querySelector("#show-result");

const MIN_ANSWERS = 3;
const defaultSuggestionText = "Svara på minst 3 påståenden och klicka på knappen så får du en idé om vilken IT-riktning som kan passa.";

// ---------- Snabbfakta: klickbara kort ----------

// Stänger panelen och nollställer alla kort
function closeFacts() {
  factPanel.hidden = true;
  factDetails.forEach(function (detail) {
    detail.hidden = true;
  });
  factButtons.forEach(function (button) {
    button.setAttribute("aria-expanded", "false");
    button.classList.remove("is-active");
  });
}

// Visar vald information, eller stänger den om samma kort klickas igen
function handleFactClick(event) {
  const button = event.currentTarget;
  const wasOpen = button.getAttribute("aria-expanded") === "true";
  closeFacts();
  if (wasOpen) {
    return;
  }
  button.setAttribute("aria-expanded", "true");
  button.classList.add("is-active");
  factDetails.forEach(function (detail) {
    detail.hidden = detail.dataset.fact !== button.dataset.fact;
  });
  factPanel.hidden = false;
}

// ---------- Rollväljare ----------

// Avmarkerar alla rollknappar
function clearActiveButtons() {
  roleButtons.forEach(function (button) {
    button.classList.remove("is-active");
  });
}

// Markerar vald knapp och avmarkerar övriga
function markActiveButton(activeButton) {
  clearActiveButtons();
  activeButton.classList.add("is-active");
}

// Skriver in en rolls information i panelen
function showRole(roleKey) {
  const role = roles[roleKey];
  document.querySelector("#role-title").textContent = role.title;
  document.querySelector("#role-description").textContent = role.description;
  document.querySelector("#role-time").textContent = role.time;
  document.querySelector("#role-family").textContent = role.family;
  document.querySelector("#role-start").textContent = role.start;
  roleImage.src = role.image;
  roleImage.alt = role.imageAlt;
  roleImage.hidden = false;
  roleIntro.hidden = true;
  roleDetails.hidden = false;
}

// Stänger rollpanelen och visar översikten igen
function hideRole() {
  roleDetails.hidden = true;
  roleIntro.hidden = false;
  roleImage.hidden = true;
  clearActiveButtons();
}

function handleRoleClick(event) {
  const button = event.currentTarget;
  showRole(button.dataset.role);
  markActiveButton(button);
}

// ---------- Vanliga frågor ----------

// Öppnar eller stänger en fråga
function setAnswerState(question, isOpen) {
  question.setAttribute("aria-expanded", String(isOpen));
  question.nextElementSibling.hidden = !isOpen;
}

// Öppnar den klickade frågan och stänger alla andra
function toggleAnswer(event) {
  const question = event.currentTarget;
  const wasOpen = question.getAttribute("aria-expanded") === "true";
  faqQuestions.forEach(function (item) {
    setAnswerState(item, false);
  });
  setAnswerState(question, !wasOpen);
}

// ---------- Passar det här dig? ----------

// Antal besvarade påståenden
function countAnswered() {
  return document.querySelectorAll(".scale-item input:checked").length;
}

// Ger poäng till varje roll. "Stämmer ganska bra" (4) ger 1 poäng, "Stämmer helt" (5) ger 2.
// Returnerar de bästa rollerna, eller en tom lista om inget stämde.
function getSuggestedRoles() {
  const scores = {};
  Object.keys(roles).forEach(function (key) {
    scores[key] = 0;
  });
  scaleItems.forEach(function (item) {
    const chosen = item.querySelector("input:checked");
    if (!chosen) {
      return;
    }
    const points = Math.max(0, Number(chosen.value) - 3);
    item.dataset.roles.split(" ").forEach(function (key) {
      scores[key] += points;
    });
  });
  const best = Math.max(...Object.values(scores));
  if (best === 0) {
    return [];
  }
  return Object.keys(scores).filter(function (key) {
    return scores[key] === best;
  });
}

// Skriver "A, B eller C"
function joinWithEller(names) {
  if (names.length === 1) {
    return names[0];
  }
  return names.slice(0, -1).join(", ") + " eller " + names[names.length - 1];
}

// Klick på ett förslag: visa rollen och scrolla till rollväljaren
function handleSuggestionClick(event) {
  const roleKey = event.currentTarget.dataset.role;
  const matchingButton = document.querySelector('.role-button[data-role="' + roleKey + '"]');
  showRole(roleKey);
  markActiveButton(matchingButton);
  document.querySelector("#explore").scrollIntoView({ behavior: "smooth" });
}

// Nollställer förslaget (när svaren ändras vet vi inte längre om det stämmer)
function resetSuggestion() {
  document.querySelector("#check-suggestion-text").textContent = defaultSuggestionText;
  document.querySelector("#check-suggestion-buttons").replaceChildren();
}

// Visar förslag på riktning. Körs bara när man klickar på knappen
function showSuggestion() {
  const text = document.querySelector("#check-suggestion-text");
  const buttons = document.querySelector("#check-suggestion-buttons");
  buttons.replaceChildren();

  const keys = getSuggestedRoles();

  if (keys.length === 0) {
    text.textContent = "Inget av påståendena stämde särskilt bra, och det är helt okej. Utforska rollerna ovan i lugn och ro, eller ändra dina svar och försök igen.";
    return;
  }

  const names = keys.map(function (key) {
    return roles[key].title;
  });
  text.textContent = "Utifrån dina svar kan du passa som " + joinWithEller(names) + ". Klicka för att läsa mer.";

  keys.forEach(function (key) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "suggestion-button";
    button.dataset.role = key;
    button.textContent = roles[key].title;
    button.addEventListener("click", handleSuggestionClick);
    buttons.appendChild(button);
  });
}

// Uppdaterar räknaren och knappen när man svarar
function handleScaleChange() {
  const answered = countAnswered();
  document.querySelector("#check-result").textContent =
    "Du har svarat på " + answered + " av " + scaleItems.length + ".";
  showResultButton.disabled = answered < MIN_ANSWERS;
  resetSuggestion();
}

// ---------- Eventlyssnare ----------

factButtons.forEach(function (button) {
  button.addEventListener("click", handleFactClick);
});

roleButtons.forEach(function (button) {
  button.addEventListener("click", handleRoleClick);
});

document.querySelector("#role-close").addEventListener("click", hideRole);

faqQuestions.forEach(function (question) {
  question.addEventListener("click", toggleAnswer);
});

scaleItems.forEach(function (item) {
  item.addEventListener("change", handleScaleChange);
});

showResultButton.addEventListener("click", showSuggestion);

// Synkar status om webbläsaren minns svar vid omladdning
handleScaleChange();