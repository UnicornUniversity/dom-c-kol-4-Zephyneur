// Domácí úkol 4
// Generátor zaměstnanců a výpočet statistik
// Naváže na úkol 3 - vygeneruje seznam osob a následně z něj
// vypočítá souhrnné statistiky (počty, věk, úvazky).

const MALE_NAMES = [
  "Jan", "Petr", "Jakub", "Tomáš", "Martin", "Pavel", "Jiří", "Lukáš",
  "David", "Michal", "Vojtěch", "Matěj", "Adam", "Filip", "Ondřej",
  "Daniel", "Josef", "František", "Karel", "Václav", "Vratislav",
  "Radek", "Zdeněk", "Miroslav", "Roman",
];

const FEMALE_NAMES = [
  "Jana", "Marie", "Eva", "Hana", "Anna", "Lucie", "Kateřina", "Tereza",
  "Petra", "Lenka", "Veronika", "Martina", "Michaela", "Monika", "Pavla",
  "Alena", "Zuzana", "Eliška", "Nikola", "Klára", "Jiřina", "Barbora",
  "Simona", "Denisa", "Adéla",
];

const MALE_SURNAMES = [
  "Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera",
  "Veselý", "Horák", "Němec", "Pokorný", "Pospíšil", "Hájek", "Jelínek",
  "Král", "Růžička", "Beneš", "Fiala", "Sedláček", "Doležal", "Zeman",
  "Kolář", "Navrátil", "Čermák", "Urban", "Vaněk", "Blažek", "Kříž",
  "Kratochvíl", "Bartoš", "Polák", "Vlček", "Konečný", "Malý", "Holub",
  "Staněk", "Štěpánek", "Sýkora", "Moravec", "Kovář", "Soukup", "Dušek",
  "Tichý", "Kadlec", "Štěrba", "Michalík", "Adamec", "Mareš", "Brož", "Mach",
];

const FEMALE_SURNAMES = [
  "Nováková", "Svobodová", "Novotná", "Dvořáková", "Černá", "Procházková",
  "Kučerová", "Veselá", "Horáková", "Němcová", "Pokorná", "Pospíšilová",
  "Hájková", "Jelínková", "Králová", "Růžičková", "Benešová", "Fialová",
  "Sedláčková", "Doležalová", "Zemanová", "Kolářová", "Navrátilová",
  "Čermáková", "Urbanová", "Vaňková", "Blažková", "Křížová", "Kratochvílová",
  "Bartošová", "Poláková", "Vlčková", "Konečná", "Malá", "Holubová",
  "Staňková", "Štěpánková", "Sýkorová", "Moravcová", "Kovářová", "Soukupová",
  "Dušková", "Tichá", "Kadlecová", "Štěrbová", "Michalíková", "Adamcová",
  "Marešová", "Brožová", "Machová",
];

const WORKLOADS = [10, 20, 30, 40];

// Průměrná délka roku v milisekundách
const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

/**
 * Vrátí náhodný prvek z předaného pole.
 * @param {Array} array - Pole prvků, ze kterého se vybírá.
 * @returns {*} Náhodně vybraný prvek pole.
 */
function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Náhodně zvolí pohlaví se stejnou pravděpodobností.
 * @returns {string} Řetězec "male" nebo "female".
 */
function randomGender() {
  return Math.random() < 0.5 ? "male" : "female";
}

/**
 * Vybere náhodné křestní jméno odpovídající zadanému pohlaví.
 * @param {string} gender - Pohlaví "male" nebo "female".
 * @returns {string} Náhodně vybrané křestní jméno.
 */
function randomName(gender) {
  return gender === "male"
    ? randomItem(MALE_NAMES)
    : randomItem(FEMALE_NAMES);
}

/**
 * Vybere náhodné příjmení odpovídající zadanému pohlaví.
 * @param {string} gender - Pohlaví "male" nebo "female".
 * @returns {string} Náhodně vybrané příjmení.
 */
function randomSurname(gender) {
  return gender === "male"
    ? randomItem(MALE_SURNAMES)
    : randomItem(FEMALE_SURNAMES);
}

/**
 * Vrátí náhodný pracovní úvazek.
 * @returns {number} Hodnota úvazku v hodinách za týden.
 */
function randomWorkload() {
  return randomItem(WORKLOADS);
}

/**
 * Vygeneruje ISO datum narození tak, aby věk osoby ležel
 * v uzavřeném intervalu od minAge do maxAge.
 * @param {number} minAge - Minimální věk v letech.
 * @param {number} maxAge - Maximální věk v letech.
 * @returns {string} Datum narození ve formátu ISO Date-Time.
 */
function randomBirthdate(minAge, maxAge) {
  const now = Date.now();
  const earliestMs = now - maxAge * MS_PER_YEAR;
  const latestMs = now - minAge * MS_PER_YEAR;
  const birthdateMs = earliestMs + Math.random() * (latestMs - earliestMs);
  return new Date(birthdateMs).toISOString();
}

/**
 * Vygeneruje jeden objekt zaměstnance s náhodnými údaji.
 * @param {object} age - Věkový interval.
 * @param {number} age.min - Minimální věk v letech.
 * @param {number} age.max - Maximální věk v letech.
 * @returns {object} Objekt zaměstnance.
 */
function generateEmployee(age) {
  const gender = randomGender();
  return {
    gender,
    birthdate: randomBirthdate(age.min, age.max),
    name: randomName(gender),
    surname: randomSurname(gender),
    workload: randomWorkload(),
  };
}

/**
 * Vygeneruje seznam zaměstnanců podle zadaných vstupních parametrů.
 * @param {object} dtoIn - Vstupní data pro generátor.
 * @param {number} dtoIn.count - Počet zaměstnanců k vygenerování.
 * @param {object} dtoIn.age - Věkový interval generovaných osob.
 * @param {number} dtoIn.age.min - Minimální věk.
 * @param {number} dtoIn.age.max - Maximální věk.
 * @returns {object[]} Pole objektů zaměstnanců.
 */
export function generateEmployeeData(dtoIn) {
  const employees = [];
  for (let i = 0; i < dtoIn.count; i++) {
    employees.push(generateEmployee(dtoIn.age));
  }
  return employees;
}

/**
 * Vypočítá přesný věk osoby v letech z ISO data narození.
 * @param {string} birthdate - Datum narození ve formátu ISO Date-Time.
 * @returns {number} Věk osoby v letech jako desetinné číslo.
 */
function calculateAge(birthdate) {
  return (Date.now() - new Date(birthdate).getTime()) / MS_PER_YEAR;
}

/**
 * Vrátí medián hodnot z předaného pole čísel.
 * Pro liché délky vrací prostřední prvek, pro sudé průměr dvou prostředních.
 * @param {number[]} values - Pole číselných hodnot.
 * @returns {number} Medián jako desetinné číslo.
 */
function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
}

/**
 * Vrátí průměr hodnot z předaného pole čísel.
 * @param {number[]} values - Pole číselných hodnot.
 * @returns {number} Průměr jako desetinné číslo.
 */
function average(values) {
  const sum = values.reduce((acc, v) => acc + v, 0);
  return sum / values.length;
}

/**
 * Spočítá počet zaměstnanců s daným úvazkem.
 * @param {object[]} employees - Pole zaměstnanců.
 * @param {number} workload - Hodnota úvazku.
 * @returns {number} Počet zaměstnanců s daným úvazkem.
 */
function countByWorkload(employees, workload) {
  return employees.filter((e) => e.workload === workload).length;
}

/**
 * Vrátí pole přesných věků zaměstnanců v letech.
 * @param {object[]} employees - Pole zaměstnanců.
 * @returns {number[]} Pole věků jako desetinných čísel.
 */
function getAges(employees) {
  return employees.map((e) => calculateAge(e.birthdate));
}

/**
 * Vrátí pole úvazků zaměstnankyň ženského pohlaví.
 * @param {object[]} employees - Pole zaměstnanců.
 * @returns {number[]} Pole úvazků žen.
 */
function getWomenWorkloads(employees) {
  return employees
    .filter((e) => e.gender === "female")
    .map((e) => e.workload);
}

/**
 * Vrátí kopii pole zaměstnanců setříděnou vzestupně podle úvazku.
 * @param {object[]} employees - Pole zaměstnanců.
 * @returns {object[]} Setříděné pole zaměstnanců.
 */
function sortByWorkload(employees) {
  return [...employees].sort((a, b) => a.workload - b.workload);
}

/**
 * Vypočítá souhrnné statistiky nad předaným seznamem zaměstnanců.
 * @param {object[]} employees - Pole zaměstnanců.
 * @returns {object} Objekt se statistikami a setříděným seznamem.
 */
export function getEmployeeStatistics(employees) {
  // Krok 1: Příprava pomocných polí pro výpočty
  const ages = getAges(employees);
  const workloads = employees.map((e) => e.workload);
  const womenWorkloads = getWomenWorkloads(employees);

  // Krok 2: Sestavení výstupního objektu se statistikami
  return {
    total: employees.length,
    workload10: countByWorkload(employees, 10),
    workload20: countByWorkload(employees, 20),
    workload30: countByWorkload(employees, 30),
    workload40: countByWorkload(employees, 40),
    averageAge: Math.round(average(ages) * 10) / 10,
    minAge: Math.floor(Math.min(...ages)),
    maxAge: Math.floor(Math.max(...ages)),
    medianAge: Math.floor(median(ages)),
    medianWorkload: median(workloads),
    averageWomenWorkload: Math.round(average(womenWorkloads) * 10) / 10,
    sortedByWorkload: sortByWorkload(employees),
  };
}

/**
 * Vygeneruje seznam zaměstnanců a vrátí nad ním souhrnné statistiky.
 * @param {object} dtoIn - Vstupní data pro generátor.
 * @param {number} dtoIn.count - Počet zaměstnanců k vygenerování.
 * @param {object} dtoIn.age - Věkový interval generovaných osob.
 * @param {number} dtoIn.age.min - Minimální věk.
 * @param {number} dtoIn.age.max - Maximální věk.
 * @returns {object} Objekt se statistikami a setříděným seznamem.
 */
export function main(dtoIn) {
  // Krok 1: Vygenerování seznamu zaměstnanců
  const employees = generateEmployeeData(dtoIn);

  // Krok 2: Výpočet statistik nad vygenerovaným seznamem
  const dtoOut = getEmployeeStatistics(employees);

  return dtoOut;
}
