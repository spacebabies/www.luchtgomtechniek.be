# TODO

Van boven naar beneden implementeren.

**Belangrijk**: hou de Content Strategie uit `readme.md` altijd in gedachten. Tevens is deze website een **Single Page Application (SPA)**, gegenereerd met Hugo. De content staat op één pagina; alle wijzigingen moeten dus passen binnen het single-page format (uitgezonderd `single.html` die dient om Hugo warnings te onderdrukken).

Als een item uit deze lijst is geïmplementeerd of definitief niet zal worden gedaan, verplaats het dan naar de sectie 'Completed' onderaan dit bestand.

## Must Haves (Direct Implementeren)

### 2. Copywriting: Authenticiteit en Vakjargon ('Stieltaal')
- **Doel**: De teksten moeten klinken als een vakman, niet als een gladde marketeer.
- **Actie**:
  - Zoek naar en vervang overdreven commerciële termen zoals "state-of-the-art", "hoogontwikkeld", en "prachtige eindafwerking" door nuchtere, technische beschrijvingen van het proces en resultaat.
  - Controleer de markdown bestanden in `content/`.

### 3. Copywriting: Absolute Claims Temperen (Juridisch/Retorisch)
- **Doel**: Voorkom onrealistische of juridisch kwetsbare beloftes.
- **Actie**:
  - Pas absolute claims aan. Verander bijvoorbeeld "we garanderen dat er geen vervorming plaatsvindt" naar "het proces is ontworpen om vervorming te minimaliseren" of "uitermate veilig voor kwetsbare ondergronden".
  - Pas dit aan in de betreffende `content/` bestanden.

### 5. Vertaling: Kwaliteit van de Franstalige Versie Verbeteren
- **Doel**: Een professionele en foutloze ervaring voor Franstalige leads.
- **Actie**:
  - Review alle bestanden eindigend op `.fr.md` (in `content/`) en de vertaalsleutels in `i18n/fr.yaml`.
  - Herschrijf stroeve, letterlijke vertalingen en grammaticale fouten naar natuurlijk en professioneel Waals vakjargon.

### 6. SEO: Structured Data (Schema.org) Toevoegen
- **Doel**: Beter lokaal en diensten-gerelateerd zoekresultaat in Google (Rich Snippets).
- **Actie**:
  - Analyseer en verbeter JSON-LD structured data.
  - Gebruik het type `Organization` of `LocalBusiness`.
  - Definieer minimaal: Adres, telefoonnummer, BTW-nummer, servicegebied (België/Nederland), en een `sameAs` link naar Instagram.
  - Definieer een `OfferCatalog` of soortgelijke structuur in de hoofd-JSON-LD, in plaats van aparte Service-pagina's, passend bij een SPA.

### 7. SEO: Sitemap Configuratie Controleren & Optimaliseren
- **Doel**: Efficiënte crawling door zoekmachines garanderen voor de taalkanalen.
- **Actie**:
  - Controleer of `sitemap.xml` correct wordt gegenereerd voor de hoofd-URL en taalswitches, en niet onnodig lege subpagina's bevat die door Hugo gegenereerd worden.
  - Zorg dat de locatie van de sitemap expliciet wordt vermeld in `static/robots.txt` (voeg toe: `Sitemap: https://www.luchtgomtechniek.be/sitemap.xml`).

### 8. SEO & UX: Correcte `<title>` tags en Meta structuren
- **Doel**: Zorgen dat de SPA per taal de meest optimale, pakkende paginatitel heeft, aangezien dit dé index-titel is voor de hele site in die taal.
- **Actie**:
  - Optimaliseer `layouts/partials/head.html` en `config`-bestanden om zeker te zijn dat de indexpagina's per taal een sterke, beschrijvende titel bevatten in plaats van enkel de merknaam.

### 9. Performance & A11Y: Image lazy loading en dimensies
- **Doel**: Voorkomen van Cumulative Layout Shift (CLS) en verbeteren van de laadsnelheid.
- **Actie**:
  - Controleer de image templates (zoals `layouts/shortcodes/picture.html` en `layouts/shortcodes/figure.html`).
  - Voeg het attribuut `loading="lazy"` toe aan `<img>` tags onder de vouw.
  - Zorg ervoor dat `width` en `height` attributen (indien de aspect ratio bekend is) worden meegegeven om ruimte te reserveren tijdens het laden.

### 10. SEO: Meta Descriptions
- **Doel**: De indexpagina van de SPA moet een converterende, wervende meta description hebben.
- **Actie**:
  - Controleer `layouts/partials/meta.html` en de `config`- of `_index.md`-bestanden.
  - Zorg ervoor dat er een sterke description per taal is geconfigureerd en geïmplementeerd in de HTML output.


## To Be Determined (Architectuur & Strategie - Nog niet direct uitvoeren)

*Voer deze items pas uit na expliciete goedkeuring door de gebruiker.*

### 11. Architectuur: Modals of Uitklapbare Secties voor Specifieke Niches
- **Doel**: Hogere relevantie en conversie voor specifieke, winstgevende opdrachten realiseren, zonder de SPA-flow te verbreken.
- **Actie**:
  - Ontwerp en bouw diepgaande subsecties (bijv. als openklappende details of modals) in plaats van losse "satellietpagina's".
  - Focus op specifieke toepassingen: Trappen en interieurhout, blauwsteen en natuursteen, hout-nabehandeling, brandschade/roet, industrieel inox en glasparelstralen, poedercoaten van hekwerk/metalen.

### 12. Architectuur: Uitgebreide Pre-kwalificatie Sectie
- **Doel**: Efficiënt leads filteren en ongeschikte aanvragen voorkomen door transparantie en voorlichting op de hoofdpagina.
- **Actie**:
  - Creëer een speciale sectie (bijv. "Is mijn project geschikt?" of "Voorbereiding") direct op de SPA, bijvoorbeeld verwerkt in een accordion of tabs om niet te veel verticale ruimte in te nemen.
  - Behandel onderwerpen zoals: risico's per materiaal, stofontwikkeling, noodzakelijke voorbereiding door de klant, temperatuurvereisten, asbestrisico's, en realistische verwachtingen.

### 13. Architectuur: B2B Partner Hub ("Voor Professionals" Modal/Sectie)
- **Doel**: Structurele instroom van professionele, terugkerende klanten (B2B) faciliteren en professionaliteit uitstralen.
- **Actie**:
  - Bouw een gerichte sectie, tab, of verborgen overlay op de single page, specifiek voor architecten, aannemers, interieurbouwers, horeca-uitbaters en erfgoedbeheerders.
  - Documenteer specifieke B2B informatie: werk-toleranties, procesvoorbereiding, projectplanning, logistiek en transport, mogelijkheden voor nabehandeling, BTW-constructies/kaders, en proefstukken.

### 4. UX: Verwachtingsmanagement & Kwalificatie vóór de Offerte
- **Doel**: Bezoekers informeren over technieken, risico's en voorwaarden voordat ze het offerteformulier bereiken op de single page.
- **Actie**:
  - Analyseer cruciale informatie uit de Algemene Voorwaarden en voeg ze als lopende en begrijpelijke tekst toe aan de juiste diensten-secties op de hoofdpagina.
  - Verduidelijk vóór het contactmoment (bijv. in een infoblok boven het formulier of als aparte sectie): het verschil tussen luchtgommen en fijnstralen, ongeschikte materialen, materiaalspecifieke risico's, benodigde voorbereiding door de klant, en het verschil tussen werk op locatie vs. in het atelier.

## Completed

Uitgevoerd of wontfix:

### 1. Afbeeldingen: Bestandsnamen, Alt-teksten en Titels (SEO)
- **Doel**: Zorg dat zoekmachines en schermlezers de context van alle afbeeldingen begrijpen.
- **Actie**:
  - Hernoem onduidelijke bestandsnamen (zoals `luchtgommen/20221002_131529.jpg` of `sand/grit4.jpg`) naar beschrijvende namen (bijv. `luchtgommen-houten-trap-voor-na.jpg`). Let op dat je ook de referenties in de code update!
  - Voeg betekenisvolle `alt` attributen en eventueel `title` attributen toe aan alle afbeeldingsverwijzingen in markdown bestanden (in `content/`) en templates (in `layouts/`).
