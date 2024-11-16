# Arhitectura Monolitica vs. Microservicii

Acest proiect este conceput pentru a analiza si compara performanta arhitecturilor monolitice si microservicii. Scopul principal este de a evalua impactul fiecarei arhitecturi asupra timpilor de raspuns, consumului de resurse si scalabilitatii aplicatiei, oferind o intelegere detaliata a avantajelor si dezavantajelor fiecarei abordari in contextul dezvoltarii software moderne.

## Structura Proiectului

### Descriere
Aceasta este o aplicație de e-commerce care permite utilizatorilor să exploreze și să cumpere produse online. Proiectul include funcționalități de bază pentru administrarea produselor și plasarea comenzilor.

### Functionalitati
- Autentificare cu email și parola.
- Gestionarea sesiunilor utilizatorilor autentificaTi.
- Adaugarea de produse noi în catalog.
- Modificarea detaliilor produselor existente.
- Stergerea produselor din catalog.
- Selectarea produselor si adaugarea acestora în coșul de cumparaturi.
- Confirmarea si plasarea unei comenzi.

### Arhitectura Monolitica
- Un singur server gestioneaza intregul flux de lucru al aplicatiei, incluzand gestionarea bazei de date, logica de business si interfata API.
- Toate componentele sunt integrate intr-un singur proces, facilitand dezvoltarea si implementarea initiala, dar potential limitand scalabilitatea si flexibilitatea.

### Microservicii
- Aplicatia este divizata in microservicii autonome, fiecare responsabil pentru o functionalitate specifica si operand independent.
- Fiecare microserviciu ruleaza intr-un container Docker separat, comunicand prin protocoale HTTP/REST. Aceasta abordare permite scalarea independenta si dezvoltarea modulara.

## Abordarea Analitica

Proiectul se concentreaza pe o analiza comparativa a performantei celor doua arhitecturi, utilizand o serie de metrici specifice pentru a evalua eficienta, scalabilitatea si consumul de resurse.

### Metrici de Performanta

1. **Timpul de Raspuns (Response Time):** Timpul total necesar pentru ca sistemul sa raspunda la o solicitare.
2. **Throughput:** Numarul de solicitari procesate de sistem pe unitatea de timp.
3. **Utilizarea Memoriei:** Cantitatea de memorie RAM utilizata de aplicatie in timpul executiei.
4. **Scalabilitate:** Capacitatea sistemului de a gestiona cresterea traficului fara a compromite performanta.
5. **Rata de Erori:** Procentul de solicitari care esueaza in comparatie cu totalul solicitarilor.
6. **Costul Resurselor:** Costurile asociate cu infrastructura necesara pentru a rula aplicatia.

## Stack Technologic

- **Backend:** NodeJs
- **Frontend:** React
- **Containerizare:** Docker (pentru arhitectura microservicii)
- **Baza de Date:** SQLite
- **Monitorizare:** Prometheus si Grafana pentru colectarea si vizualizarea metricilor in timp real

## Obiectivele Proiectului

- **Compararea Performantei:** Evaluarea timpilor de raspuns, throughput-ului si consumului de resurse intre arhitectura monolitica si cea de microservicii.
- **Evaluarea Scalabilitatii:** Determinarea capacitatii fiecarei arhitecturi de a scala eficient in functie de cresterea traficului.
- **Identificarea Avantajelor si Dezavantajelor:** Evidentierea punctelor forte si limitarilor fiecarei arhitecturi in contextul performantei si complexitatii.
- **Recomandari de Utilizare:** Formularea unor recomandari bazate pe rezultate pentru alegerea arhitecturii optime in functie de cerintele specifice ale proiectului.

## Concluzii

Rezultatele proiectului vor oferi o intelegere clara a compromisurilor dintre arhitectura monolitica si microservicii, subliniind situatiile in care fiecare arhitectura exceleaza sau intampina dificultati. Concluziile vor fi valoroase pentru decidentii tehnici care trebuie sa aleaga arhitectura potrivita pentru aplicatiile lor, in functie de cerintele de performanta, scalabilitate si complexitate.

## Echipa
- Cosmin GRIGORE SRIC-2
- Cristian-Ștefan BODOCAN SAS-2
- Valentin RADU SRIC-2
