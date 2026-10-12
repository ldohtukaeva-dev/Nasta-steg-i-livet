# Nästa steg i livet

## Om sidan

Jag har gjort en webbplats för vuxna som funderar på att börja jobba inom IT. Det kan kännas svårt att veta var man ska börja, särskilt om man har familj eller jobbar samtidigt. Därför har jag samlat information om några olika IT-yrken, studietid, kostnader och vilket stöd man kan få. Berättelsen om Anna är påhittad och används bara som ett exempel.

## Skiss

Jag gjorde en enkel wireframe i gråskala i Figma med hjälp av Figmas AI-funktion. Den visar hur sidan skulle se ut både på dator och mobil. Skissen finns här: [skiss/skiss.png](skiss/skiss.png).

![Skiss, desktop och mobil](skiss/skiss.png)

Jag utgick från skissen när jag byggde sidan, men ändrade några saker under arbetets gång:

- **Sidhuvudet:** I skissen är det enkelt med en logga och en meny. På den färdiga sidan valde jag svart bakgrund och en gul detalj vid loggan.
- **Första sektionen (hero):** I skissen ligger texten i en ruta ovanpå bilden. På den färdiga sidan ligger texten direkt på bilden, som jag gjorde mörkare så att texten syns bättre.
- **Snabbfakta:** I stället för rader med plustecken gjorde jag fyra kort med en kort förklaring. När man klickar på ett kort visas mer information under korten.
- **Passar det här dig?:** Jag ändrade från tre till fem påståenden. Jag lade också skalan under varje påstående, eftersom det blir tydligare på en mobil. Knappen för att visa förslaget ligger under frågorna.
- **Så kommer du igång:** I skissen står siffrorna i små rutor. På den färdiga sidan använde jag en vanlig numrerad lista.
- **Vanliga frågor och sidfot:** De var inte med i skissen, men jag lade till dem när jag byggde sidan.
- **Mobil och större skärmar:** På mobilen visas innehållet i en kolumn. På större skärmar använder jag en media query (`min-width: 700px`) för att placera vissa kort, bilder och texter bredvid varandra.
- **Färger och bilder:** Skissen är i gråskala. Jag valde svart och gult som färger och lade till bilder när jag gjorde den färdiga sidan.

## Funktionalitet

Jag ville att sidan skulle vara mer än bara text. Besökaren kan klicka, välja olika alternativ och få information beroende på vad hen gör. JavaScript-koden finns i `js/script.js`.

- **Snabbfakta:** Man kan klicka på ett kort för att läsa mer om att byta yrke som vuxen, flexibilitet, kostnader och stöd. Klickar man på samma kort igen stängs informationen. Jag använder funktionerna `handleFactClick` och `closeFacts`.
- **Välja IT-yrke:** Man kan välja IT-support, webbutvecklare, testare eller dataanalytiker och läsa om yrket, ungefärlig studietid, flexibilitet och ett första steg. Informationen finns i objektet `roles`. Funktionerna `handleRoleClick`, `showRole`, `hideRole`, `markActiveButton` och `clearActiveButtons` hanterar valet.
- **Vanliga frågor:** Man kan öppna och stänga svar. För att sidan inte ska bli för lång är bara ett svar öppet åt gången. Det sköts av `toggleAnswer` och `setAnswerState`.
- **Frågor om vad som passar:** Besökaren svarar på fem påståenden på en skala från 1 till 5 och får ett förslag på IT-inriktning. Här använder jag bland annat `handleScaleChange`, `countAnswered`, `getSuggestedRoles` och `showSuggestion`.

Filerna är uppdelade så här: `index.html` innehåller strukturen, `css/style.css` utseendet och den responsiva designen, och `js/script.js` interaktiviteten.

## AI-användning

Jag använde AI som hjälp under arbetet, men jag gick igenom förslagen och ändrade sådant som behövde anpassas till min sida.

### Exempel 1: klickbara snabbfakta

- **Vad bad jag om?** Jag ville att korten med snabbfakta skulle gå att klicka på så att mer information visas. Informationen skulle handla om att byta yrke som vuxen, familjeliv, studietid och stöd från Arbetsförmedlingen och CSN.
- **Vad fick jag?** Ett förslag på HTML för knappar och en informationspanel, CSS för utseendet och JavaScript för att öppna och stänga panelen.
- **Vad gjorde jag med det?** Jag ändrade rubriker och korttexter, lade till ett kort om kostnader och tog bort text som upprepade rubriken. Jag testade också att informationen visas, byts och stängs när man klickar.

### Exempel 2: information om kostnader och stöd

- **Vad bad jag om?** Jag ville förklara att det finns utbildningar som inte kostar någon kursavgift.
- **Vad fick jag?** Ett förslag på text om yrkeshögskola, komvux och folkhögskola, plus information om att privata kurser kan kosta pengar.
- **Vad gjorde jag med det?** Jag behöll inte påståendet att alla kurser är gratis, eftersom det inte stämmer. Jag lade till länkar till CSN och Arbetsförmedlingen och skrev att regler och villkor kan ändras. Jag ändrade också formuleringen om vem som finansierar utbildningarna.

### Exempel 3: kontroll mot uppgiftens krav

- **Vad bad jag om?** Jag bad om hjälp att kontrollera om projektet följde kraven i uppgiften.
- **Vad fick jag?** Förslag på saker att rätta i HTML och förbättringar i CSS och JavaScript. I arbetet identifierades bland annat problem med placeringen av `figcaption` och en rubriknivå.
- **Vad gjorde jag med det?** Jag gick igenom förslagen och rättade de fel som hittades. Jag behöver kontrollera den slutliga versionen med validatorerna innan jag lämnar in den.

### Exempel 4: skissen

- **Vad bad jag om?** Jag bad Figmas AI att skapa en wireframe i gråskala med sidans olika sektioner och både dator- och mobilvy.
- **Vad fick jag?** Ett förslag på layout med grå rutor i stället för riktiga bilder och texter.
- **Vad gjorde jag med det?** Jag sparade skissen som PNG i mappen `skiss/` och använde den som utgångspunkt. När jag byggde sidan lade jag bland annat till vanliga frågor och en sidfot. Jag beskriver fler skillnader i avsnittet Skiss.

## Bildkällor

Här har jag samlat länkarna till bilderna som används på sidan:

- **`hero.jpg`:** Jag skapade bilden med ChatGPT.
- **`web.jpg`:** [ER10.kz – Vibe coding hjälper små startups att lyckas](https://er10.kz/read/it-novosti/vibe-coding-pomogaet-nebolshim-startapam-uspeha/).
- **`test.jpg`:** [IECA – Introducing the AXS Companion to Common App](https://www.iecaonline.com/blog/introducing-the-axs-companion-to-common-app/).
- **`support.jpg`:** [DKNews.kz – artikel om kvinnor inom IT i Kazakstan](https://dknews.kz/ru/dk-it/319092-zhenshchiny-v-it-v-kazahstane-situaciya-luchshe-chem).
- **`story.jpg`:** [Coursera – bild via bildproxy](https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/0d/1f72a872ec4bef995ec1c867f5e8b9/1200x1200_247177471.jpg?auto=format%2C%20compress%2C%20enhance&dpr=3&w=265&h=216&fit=crop&q=50).
- **`data.jpg`:** [Clootrack – Customer-centric product development](https://www.clootrack.com/blogs/customer-centric-product-development-harnessing-feedback-for-better-strategy).

## Tekniska val (VG)

- **Informationen om yrken i ett objekt:** Jag samlade texterna om de olika yrkena i `roles` i `js/script.js`. Då kan jag ändra texten på ett ställe i stället för att ändra flera funktioner.
- **Mappar för olika filer:** HTML ligger i roten och CSS, JavaScript, bilder och skiss ligger i separata mappar. Det gör det enklare att hitta rätt fil.
- **Knappar för interaktiva delar:** Jag använder `<button>` för sådant som går att klicka på. Det fungerar även med tangentbord. Attributet `aria-expanded` hjälper till att visa om en panel är öppen.
- **`hidden` för att visa och dölja innehåll:** Jag använder `hidden` i stället för att ändra inline-stilar med JavaScript.
- **`data-*`-attribut:** Med till exempel `data-fact` och `data-role` kan knapparna kopplas till rätt information. Då kan samma funktion användas för flera knappar.
- **Namngivning:** Jag använder små bokstäver och bindestreck i filnamn, klasser och id:n, till exempel `fact-panel` och `role-button`. Det gör namnen lättare att läsa och håller stilen konsekvent.
- **CSS-variabler:** Jag samlade färger, rundning och gradienter som variabler. Då kan jag ändra utseendet på ett ställe.
- **Mobil först:** Jag började med regler som fungerar på små skärmar och lade sedan till `@media (min-width: 700px)` för större skärmar.
- **Flexbox:** Jag använder Flexbox för att placera och ordna flera delar av sidan, till exempel menyn och korten.

## Bedömning av AI-innehåll (VG)

### Hur avgjorde jag om förslagen var bra nog?

Jag jämförde förslagen med kraven i uppgiften och funderade på om informationen verkade rimlig. När det gällde kostnader och stöd använde jag information från CSN och Arbetsförmedlingen, eftersom reglerna kan ändras och inte gäller på samma sätt för alla. Jag behöver också kontrollera den slutliga HTML- och CSS-versionen med validatorerna innan inlämning.

### Vad behöll jag?

- Att dela upp JavaScript i funktioner som har olika uppgifter.
- Att använda knappar för de klickbara korten och `aria-expanded` för deras status.
- CSS-variablerna för färger och andra återkommande värden.

### Vad ändrade jag, och varför?

- **Texten om kostnader:** Jag ändrade formuleringen så att det inte står att alla utbildningar är gratis. Privata kurser kan kosta pengar.
- **Informationen om stöd:** Jag lade till en hänvisning till CSN och Arbetsförmedlingen och försökte vara tydlig med att olika stöd har olika villkor.
- **Studietiderna:** Jag använder ungefärliga tider och skriver att de kan skilja sig mellan utbildningar.
- **Upprepningar i text och kod:** Jag tog bort sådant som upprepades och försökte göra koden lättare att följa.
- **Berättelsen om Anna:** Eftersom berättelsen är påhittad skrev jag ut det på sidan. Bildkällan finns i avsnittet Bildkällor.
