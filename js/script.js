// ============================================================
// script.js: interaktivitet för sidan "Nästa steg i livet"
//
// Så här fungerar det, steg för steg:
// 1. Webbläsaren bygger sidan av HTML-filen. Det kallas DOM.
// 2. Längst ner i filen säger vi: "När någon klickar på X, kör
//    funktion Y". Det görs med addEventListener.
// 3. Funktionen hittar element på sidan och ändrar text, klasser
//    eller om något syns (hidden).
// ============================================================

// ---------- 1. Data om rollerna ----------
// Ändra texten här, inte i funktionerna.
const roles = {
  support: {
    title: "IT-support",
    description: "Du hjälper användare med dator, nätverk och program. Ett bra sätt att komma in i branschen.",
    time: "8–12 månaders utbildning",
    family: "Ofta fasta arbetstider och möjlighet till distans",
    start: "En grundkurs i datorer och nätverk",
    image: "bilder/support.jpg",
    imageAlt: "Man med glasögon och grön huvtröja framför flera skärmar med kod i ett mörkt serverrum"
  },
  web: {
    title: "Webbutvecklare",
    description: "Du bygger webbplatser och appar med HTML, CSS och JavaScript.",
    time: "1–2 års studier",
    family: "Ofta flexibelt och många jobbar på distans",
    start: "Bygg en egen liten webbsida",
    image: "bilder/web.jpg",
    imageAlt: "Kvinna med glasögon som tittar på två skärmar med programkod"
  },
  test: {
    title: "Testare",
    description: "Du letar efter fel i program innan användarna gör det. Passar den som är noggrann.",
    time: "8–12 månaders utbildning",
    family: "Ofta regelbundna tider och bra för dig med erfarenhet från en annan bransch",
    start: "En introduktion till testning",
    image: "bilder/test.jpg",
    imageAlt: "Två kollegor tittar tillsammans på en bärbar dator med färgglada klistermärken"
  },
  data: {
    title: "Dataanalytiker",
    description: "Du samlar in och tolkar data så att företag kan fatta bättre beslut.",
    time: "1–2 års studier",
    family: "Ofta kontorsarbete med viss flexibilitet",
    start: "Lär dig grunderna i Excel och SQL",
    image: "bilder/data.jpg",
    imageAlt: "Man vid ett skrivbord med en kaffekopp framför en skärm med diagram"
  }
};

// ---------- 2. Hämta element från sidan ----------
// querySelector hämtar ETT element. querySelectorAll hämtar en LISTA.
// Vi gör det en gång här uppe, inte varje gång någon klickar.
const roleButtons = document.querySelectorAll(".role-button");
const roleImage = document.querySelector("#role-image");
const roleIntro = document.querySelector("#role-intro");
const roleDetails = document.querySelector("#role-details");
const roleTitle = document.querySelector("#role-title");
const roleDescription = document.querySelector("#role-description");
const roleTime = document.querySelector("#role-time");
const roleFamily = document.querySelector("#role-family");
const roleStart = document.querySelector("#role-start");
const roleClose = document.querySelector("#role-close");
const exploreSection = document.querySelector("#explore");

const factButtons = document.querySelectorAll(".fact");
const factPanel = document.querySelector("#fact-panel");
const factDetails = document.querySelectorAll(".fact-detail");

const faqQuestions = document.querySelectorAll(".faq-question");

const scaleItems = document.querySelectorAll(".scale-item");
const checkResult = document.querySelector("#check-result");
const showResultButton = document.querySelector("#show-result");
const suggestionText = document.querySelector("#check-suggestion-text");
const suggestionButtons = document.querySelector("#check-suggestion-buttons");

// ---------- 3. Inställningar ----------
// const = värdet ändras aldrig. let = värdet får ändras längre ner.
const MIN_ANSWERS = 3;
const defaultSuggestionText = "Svara på minst " + MIN_ANSWERS + " påståenden och klicka på knappen så får du en idé om vilken IT-riktning som kan passa.";

// ---------- 4. Snabbfakta: klickbara kort ----------

// Stänger panelen och nollställer alla kort
function closeFacts() {
  factPanel.hidden = true;
  for (const detail of factDetails) {
    detail.hidden = true;
  }
  for (const button of factButtons) {
    button.setAttribute("aria-expanded", "false");
    button.classList.remove("is-active");
  }
}

// Visar vald information, eller stänger den om samma kort klickas igen
function handleFactClick(event) {
  // currentTarget är knappen som vi la lyssnaren på
  const button = event.currentTarget;
  const wasOpen = button.getAttribute("aria-expanded") === "true";

  closeFacts();

  if (wasOpen) {
    return; // kortet var öppet, så det ska bara stängas
  }

  button.setAttribute("aria-expanded", "true");
  button.classList.add("is-active");

  // Visa den detalj som har samma data-fact som knappen
  const wantedFact = button.getAttribute("data-fact");
  for (const detail of factDetails) {
    if (detail.getAttribute("data-fact") === wantedFact) {
      detail.hidden = false;
    } else {
      detail.hidden = true;
    }
  }
  factPanel.hidden = false;
}

// ---------- 5. Rollväljare ----------

// Tar bort markeringen från alla rollknappar
function clearActiveButtons() {
  for (const button of roleButtons) {
    button.classList.remove("is-active");
  }
}

// Markerar vald knapp och avmarkerar de andra
function markActiveButton(activeButton) {
  clearActiveButtons();
  activeButton.classList.add("is-active");
}

// Skriver in en rolls information i panelen
function showRole(roleKey) {
  const role = roles[roleKey]; // t.ex. roles["web"]
  roleTitle.textContent = role.title;
  roleDescription.textContent = role.description;
  roleTime.textContent = role.time;
  roleFamily.textContent = role.family;
  roleStart.textContent = role.start;
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

// Körs när man klickar på en rollknapp
function handleRoleClick(event) {
  const button = event.currentTarget;
  const roleKey = button.getAttribute("data-role"); // t.ex. "web"
  showRole(roleKey);
  markActiveButton(button);
}

// ---------- 6. Vanliga frågor ----------

// Öppnar eller stänger en fråga
function setAnswerState(question, isOpen) {
  if (isOpen) {
    question.setAttribute("aria-expanded", "true");
  } else {
    question.setAttribute("aria-expanded", "false");
  }
  // Svaret ligger direkt efter knappen i HTML
  const answer = question.nextElementSibling;
  answer.hidden = !isOpen; // ! betyder "tvärtom"
}

// Öppnar den klickade frågan och stänger alla andra
function toggleAnswer(event) {
  const question = event.currentTarget;
  const wasOpen = question.getAttribute("aria-expanded") === "true";

  for (const item of faqQuestions) {
    setAnswerState(item, false);
  }
  setAnswerState(question, !wasOpen); // var den öppen blir den stängd, och tvärtom
}

// ---------- 7. Passar det här dig? ----------

// Antal besvarade påståenden
function countAnswered() {
  return document.querySelectorAll(".scale-item input:checked").length;
}

// Ger poäng till varje roll och returnerar de roller som fick mest.
// Svar 4 ("Stämmer ganska bra") ger 1 poäng, svar 5 ("Stämmer helt") ger 2.
// Kopplingen mellan påstående och roll står i data-roles i HTML.
// Den är förenklad: resultatet är en idé, inget test.
function getSuggestedRoles() {
  // Steg 1: alla roller börjar med 0 poäng
  const scores = {};
  for (const key in roles) {
    scores[key] = 0;
  }

  // Steg 2: gå igenom varje påstående och dela ut poäng
  for (const item of scaleItems) {
    const chosen = item.querySelector("input:checked");
    if (chosen === null) {
      continue; // inget svar på det här påståendet, gå vidare till nästa
    }

    const answer = Number(chosen.value); // värdet är text, Number gör det till ett tal
    let points = 0;
    if (answer === 4) {
      points = 1;
    } else if (answer === 5) {
      points = 2;
    }

    // data-roles är text som "support web". split gör den till en lista.
    const roleKeys = item.getAttribute("data-roles").split(" ");
    for (const key of roleKeys) {
      scores[key] = scores[key] + points;
    }
  }

  // Steg 3: hitta högsta poängen
  let best = 0;
  for (const key in scores) {
    if (scores[key] > best) {
      best = scores[key];
    }
  }

  // Steg 4: ingen poäng alls betyder inget förslag
  if (best === 0) {
    return [];
  }

  // Steg 5: samla alla roller som har högsta poängen (det kan bli flera)
  const winners = [];
  for (const key in scores) {
    if (scores[key] === best) {
      winners.push(key);
    }
  }
  return winners;
}

// Skriver "A, B eller C"
function joinWithEller(names) {
  if (names.length === 1) {
    return names[0];
  }
  const allButLast = names.slice(0, -1); // alla utom den sista
  const last = names[names.length - 1];  // den sista
  return allButLast.join(", ") + " eller " + last;
}

// Klick på ett förslag: visa rollen och scrolla till rollväljaren
function handleSuggestionClick(event) {
  const roleKey = event.currentTarget.getAttribute("data-role");
  const matchingButton = document.querySelector('.role-button[data-role="' + roleKey + '"]');
  showRole(roleKey);
  markActiveButton(matchingButton);
  exploreSection.scrollIntoView({ behavior: "smooth" });
}

// Nollställer förslaget (när svaren ändras vet vi inte längre om det stämmer)
function resetSuggestion() {
  suggestionText.textContent = defaultSuggestionText;
  suggestionButtons.replaceChildren(); // tömmer knapparna
}

// Visar förslag på riktning. Körs bara när man klickar på knappen
function showSuggestion() {
  suggestionButtons.replaceChildren();

  const keys = getSuggestedRoles();

  if (keys.length === 0) {
    suggestionText.textContent = "Inget av påståendena stämde särskilt bra, och det är helt okej. Utforska rollerna ovan i lugn och ro, eller ändra dina svar och försök igen.";
    return;
  }

  // Gör en lista med rollernas namn, t.ex. ["IT-support", "Testare"]
  const names = [];
  for (const key of keys) {
    names.push(roles[key].title);
  }
  suggestionText.textContent = "Utifrån dina svar kan du passa som " + joinWithEller(names) + ". Klicka för att läsa mer.";

  // Skapa en knapp för varje föreslagen roll
  for (const key of keys) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "suggestion-button";
    button.setAttribute("data-role", key);
    button.textContent = roles[key].title;
    button.addEventListener("click", handleSuggestionClick);
    suggestionButtons.appendChild(button);
  }
}

// Uppdaterar räknaren och knappen när man svarar
function handleScaleChange() {
  const answered = countAnswered();
  checkResult.textContent = "Du har svarat på " + answered + " av " + scaleItems.length + ".";
  // Knappen är avstängd (disabled) tills man svarat på minst MIN_ANSWERS
  showResultButton.disabled = answered < MIN_ANSWERS;
  resetSuggestion();
}

// ---------- 8. Koppla funktionerna till händelser ----------
// addEventListener("click", funktion) betyder: "kör funktionen när någon klickar".

for (const button of factButtons) {
  button.addEventListener("click", handleFactClick);
}

for (const button of roleButtons) {
  button.addEventListener("click", handleRoleClick);
}

roleClose.addEventListener("click", hideRole);

for (const question of faqQuestions) {
  question.addEventListener("click", toggleAnswer);
}

// "change" körs när man väljer ett svar på skalan
for (const item of scaleItems) {
  item.addEventListener("change", handleScaleChange);
}

showResultButton.addEventListener("click", showSuggestion);

// Körs en gång när sidan laddas: synkar räknaren och knappen
// om webbläsaren minns svar efter en omladdning
handleScaleChange();