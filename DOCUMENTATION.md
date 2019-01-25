# Dokumentace kódu

## Celkové pojetí
Celkově je aplikace pojata jako tzv. SPA, to jest single page application. Ve stručnosti to znamená, že při přejití na jakýkoli odkaz na stránce se nemusí celá stránka "reloadovat", nýbrž se pouze pošle dotaz na server (popř. se využije klientské cache) a donačtou se pouze potřebná data.

Dalším důležitým rysem je využití GraphQL, což je protokol pro komunikaci mezi klientskou a serverovou částí aplikace. Tento protokol je postaven na myšlence vytvoření jakési šablony (schema), podle které se na serveru implementují tzv. resolvery a která zároveň slouží jako dokumentace pro klient.

Odpadá tak nutnost ručně psát složité dokumentace (jako to bývá u RESTových api) a používat nástroje jako swagger nebo apiary.

## Backend
Backend je napsán v PHP. Pro snadnější práci jsem využil frameworku Laravel. 

Dosti jsem bojoval s tím, jak v Laravelu implementovat GraphQL api. 

Předtím jsem měl (co se serverového GraphQL týče) zkušenost pouze s Node.js, kde je GraphQL ekosystém výrazně bohatší.

Nakonec jsem našel knihovnu "lighthouse", která sice nemá na GitHubu nejvíce hvězdiček, avšak je aktivně vyvíjena a byla mi sympatická.

Co se autentizace týče, tak využívím JWT tokenu, který se posílá v cookie. Hesla jsou samozřejmě zahashovaná se spoustou soli.

Automaticka dokumentace GraphQL api je dostupná na https://litinter-backend.herokuapp.com/graphql-playground

### Struktura
Ústřední částí je pravděpodobně soubor `backend/schema.graphql`. Zde jsou popsány typy (User, Intership atd.), queries a mutations.

Laravel má svůj vlastní ORM, který docela dobře zapadá do GraphQL. Vztahy mezi jednotlivými modely jsou popsány v souborech v adresářích `backend/app/User.php` atd.

Databázové migrace (v mém případě se jedná jen o tvorbu tabulek) jsou v souborech `backend/database/migrations/...`.

Konfigurace projektu je ve složce `backend/config/...`. Za zmínku stojí např. soubor `jwt.php` který konfiguruje autentizaci pomocí JWT tokenů a soubor `lighthouse.php` kde je konfiguruje k lighthouse - knihovně pro GraphQL.

Jádro aplikace je ve složce `backend/app/http/GraphQL`, kde jsou resolvery pro mutace a queries. Pro vysvětlení queries a mutations bychom mohli použít parelelu z jazyka SQL. Queries jsou "něco jako příkazy SELECT", mutations jsou "něco jako příkazy INSERT". Je to ovšem parelela velmi nepřesná, např. mutation může za následek side-effect v podobě nastavení cookie; nemusí jít vždy o "vložení něčeho do databáze".

Databáze je "obyčejná" MySql. Avšak by se dala použít i jiná, jelikož s ní pracuji výhradne před ORM vrstvu (Eloquent).

## Frontend
Na frontendu je zvolena populární kombinace SPA knihovny React a TypeScriptu, což je jazyk, který se kompiluje do JavaScriptu a sám o sobě je de facto JavaScript obohacená o statické typování.

S TypeScriptem jsem nebyl úplně zvyklý pracovat, avšak měl jsem nějaké zkušenosti s konkurenčím Flow (na které jsem ale v poslední době četl dost "hejtů" na Twitter, tak jsem zkusil TypeScript). A co se DX týče, tak super, integrace s VsCode je parádní. Co mě jen mrzelo je, že nástroje, které jsem zkoušel pro převedení `backend/schema.graphql` do TypeScriptových typů si nevěděly rady s custom directives, které tam knihovna Lighthouse zaváděla. Jelikož jsem nechtěl trávit hodiny tím, než bych napsal nějaký skript, který by tyto direktivy odstraňoval, byl jsem bohužel o tento benefit připraven.

Pro data management jsem použil knihovnu Apollo. A samozřejmě jsem si nemohl nechat ujít příležitost nasadit alpha verzi Reactu, ve které jsou tzv. hooky, které dosti zjednodušují práci s komponenty a reuse logiky uvnitř reactích komponent.

### Struktura projektu
Jelikož využívám framework / boilerplate Next.js, tak struktura projektu je de facto dána. 

Ve složce `frontend/pages` jsou jednotlivé stránky. Struktura složky odpovídá jednotlivým urls; není tedy třeba užívat routeru, který by se o routing staral.

Menší celky jsou pak ve složce `frontend/components/...`. Jeden by se mohl divit, že v projektu není žádného souboru s koncovkou `.css`. A je jednak pro to, že využívám kontroverzní způsob stylování - css-in-js, v kombinaci se styled-components a UI kitem Grommet (knihovna mě bohužel zradila Select komponentou, která neprojde html validátorem).

GraphQL queries jsou definovány ve složce `frontend/models/...`.

A pár konfiguračních souborů je k naleznutí v root adresáři `frontend`.
