
# DVD Rental Dashboard

## Tech Stack

### Frontend
React, TypeScript, React Router (Client-Side Routing), Tailwind CSS

### Backend
Express (Node.js REST API), PostgreSQL (Sakila-basiertes Datenmodell: Filme, Kunden, Filialen, Ausleihen, Inventar)

### Tooling
Docker (Containerisierung von App & DB), Postman (API-Testing & Dokumentation)

### Hosting
TODO – z. B. Render / Railway / eigener VPS (Backend) + Vercel (Frontend)

## Kernfeatures

**Filme** – Durchsuchbarer Filmkatalog mit Titel-/Jahr-Suche, Sortierung und Detailansicht (Kategorie, Laufzeit, Rating, Sprache, Schauspieler)

**Verfügbarkeit** – Live-Suche nach Filmen mit filialübergreifender Bestandsanzeige (verfügbare Kopien pro Store, Status "Verfügbar" / "Wenig Bestand")

**Kunden** – Kundenverwaltung mit Kontaktdaten, Adresse und Filialzuordnung, inkl. Paginierung (600+ Datensätze)

**Ausleihen** – Verwaltung laufender und abgeschlossener Verleihvorgänge

**Reports & Dashboard** – Auswertungen über:
- Filialen, Mitarbeiter & aktive Mitarbeiter pro Standort
- Inventar pro Filiale
- Top 10 meistverliehene Filme
- Verteilung der Alterseinstufungen (Ratings)
- Neue Kunden pro Monat
- Kunden nach Land (Top 6, Donut-Chart)
- Top-Kunden nach Anzahl Ausleihen
- Kennzahlen: Ø Miete, Ø Filmlänge, Gesamtanzahl Kopien & Filme

**Mehrfilialen-Unterstützung** – Daten (Mitarbeiter, Inventar, Bestand) werden pro Filiale (z. B. Lethbridge, Woodridge, Sasebo) ausgewertet und dargestellt

## Screens
![Reports](./public/readme/reports.png)
![Verfügbarkeit](./public/readme/rental.png)
![Filme](./public/readme/films1.png)
![Filme](./public/readme/films2.png)
![Kunden](./public/readme/customers1.png)
![Kunden](./public/readme/customers2.png)

## Live-Demo
TODO 
