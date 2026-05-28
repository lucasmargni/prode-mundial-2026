import { prisma } from "../src/lib/prisma.ts";

async function main() {
  // Limpiar datos de partidos y predicciones
  await prisma.prediction.deleteMany();
  await prisma.match.deleteMany();
  
  // Crea datos de prueba - Fase de Grupos
  await prisma.match.createMany({
    data: [
      // === GRUPO A (MEX, ZAF, KOR, CZE) ===
      { id: "mex-zaf", stage: "GRUPOS", localTeamCode: "MEX", awayTeamCode: "ZAF", date: new Date('2026-06-11T16:00:00Z') },
      { id: "kor-cze", stage: "GRUPOS", localTeamCode: "KOR", awayTeamCode: "CZE", date: new Date('2026-06-11T23:00:00Z') },
      { id: "mex-kor", stage: "GRUPOS", localTeamCode: "MEX", awayTeamCode: "KOR", date: new Date('2026-06-18T22:00:00Z') },
      { id: "cze-zaf", stage: "GRUPOS", localTeamCode: "CZE", awayTeamCode: "ZAF", date: new Date('2026-06-18T13:00:00Z') },
      { id: "cze-mex", stage: "GRUPOS", localTeamCode: "CZE", awayTeamCode: "MEX", date: new Date('2026-06-24T22:00:00Z') },
      { id: "zaf-kor", stage: "GRUPOS", localTeamCode: "ZAF", awayTeamCode: "KOR", date: new Date('2026-06-24T22:00:00Z') },

      // === GRUPO B (CAN, BIH, QAT, SUI) ===
      { id: "can-bih", stage: "GRUPOS", localTeamCode: "CAN", awayTeamCode: "BIH", date: new Date('2026-06-12T16:00:00Z') },
      { id: "qat-sui", stage: "GRUPOS", localTeamCode: "QAT", awayTeamCode: "SUI", date: new Date('2026-06-13T16:00:00Z') },
      { id: "can-qat", stage: "GRUPOS", localTeamCode: "CAN", awayTeamCode: "QAT", date: new Date('2026-06-18T19:00:00Z') },
      { id: "sui-bih", stage: "GRUPOS", localTeamCode: "SUI", awayTeamCode: "BIH", date: new Date('2026-06-18T16:00:00Z') },
      { id: "sui-can", stage: "GRUPOS", localTeamCode: "SUI", awayTeamCode: "CAN", date: new Date('2026-06-24T16:00:00Z') },
      { id: "bih-qat", stage: "GRUPOS", localTeamCode: "BIH", awayTeamCode: "QAT", date: new Date('2026-06-24T16:00:00Z') },

      // === GRUPO C (BRA, MAR, HAI, SCO) ===
      { id: "bra-mar", stage: "GRUPOS", localTeamCode: "BRA", awayTeamCode: "MAR", date: new Date('2026-06-13T19:00:00Z') },
      { id: "hai-sco", stage: "GRUPOS", localTeamCode: "HAI", awayTeamCode: "SCO", date: new Date('2026-06-13T22:00:00Z') },
      { id: "bra-hai", stage: "GRUPOS", localTeamCode: "BRA", awayTeamCode: "HAI", date: new Date('2026-06-19T21:30:00Z') },
      { id: "sco-mar", stage: "GRUPOS", localTeamCode: "SCO", awayTeamCode: "MAR", date: new Date('2026-06-19T19:00:00Z') },
      { id: "sco-bra", stage: "GRUPOS", localTeamCode: "SCO", awayTeamCode: "BRA", date: new Date('2026-06-24T19:00:00Z') },
      { id: "mar-hai", stage: "GRUPOS", localTeamCode: "MAR", awayTeamCode: "HAI", date: new Date('2026-06-24T19:00:00Z') },

      // === GRUPO D (USA, PAR, AUS, TUR) ===
      { id: "usa-par", stage: "GRUPOS", localTeamCode: "USA", awayTeamCode: "PAR", date: new Date('2026-06-12T22:00:00Z') },
      { id: "aus-tur", stage: "GRUPOS", localTeamCode: "AUS", awayTeamCode: "TUR", date: new Date('2026-06-14T01:00:00Z') },
      { id: "usa-aus", stage: "GRUPOS", localTeamCode: "USA", awayTeamCode: "AUS", date: new Date('2026-06-19T16:00:00Z') },
      { id: "tur-par", stage: "GRUPOS", localTeamCode: "TUR", awayTeamCode: "PAR", date: new Date('2026-06-20T00:00:00Z') },
      { id: "tur-usa", stage: "GRUPOS", localTeamCode: "TUR", awayTeamCode: "USA", date: new Date('2026-06-25T23:00:00Z') },
      { id: "par-aus", stage: "GRUPOS", localTeamCode: "PAR", awayTeamCode: "AUS", date: new Date('2026-06-25T23:00:00Z') },

      // === GRUPO E (GER, CUW, CIV, ECU) ===
      { id: "ger-cuw", stage: "GRUPOS", localTeamCode: "GER", awayTeamCode: "CUW", date: new Date('2026-06-14T14:00:00Z') },
      { id: "civ-ecu", stage: "GRUPOS", localTeamCode: "CIV", awayTeamCode: "ECU", date: new Date('2026-06-14T20:00:00Z') },
      { id: "ger-civ", stage: "GRUPOS", localTeamCode: "GER", awayTeamCode: "CIV", date: new Date('2026-06-20T17:00:00Z') },
      { id: "ecu-cuw", stage: "GRUPOS", localTeamCode: "ECU", awayTeamCode: "CUW", date: new Date('2026-06-20T21:00:00Z') },
      { id: "ecu-ger", stage: "GRUPOS", localTeamCode: "ECU", awayTeamCode: "GER", date: new Date('2026-06-25T17:00:00Z') },
      { id: "cuw-civ", stage: "GRUPOS", localTeamCode: "CUW", awayTeamCode: "CIV", date: new Date('2026-06-25T17:00:00Z') },

      // === GRUPO F (NED, JPN, SWE, TUN) ===
      { id: "ned-jpn", stage: "GRUPOS", localTeamCode: "NED", awayTeamCode: "JPN", date: new Date('2026-06-14T17:00:00Z') },
      { id: "swe-tun", stage: "GRUPOS", localTeamCode: "SWE", awayTeamCode: "TUN", date: new Date('2026-06-14T23:00:00Z') },
      { id: "ned-swe", stage: "GRUPOS", localTeamCode: "NED", awayTeamCode: "SWE", date: new Date('2026-06-20T14:00:00Z') },
      { id: "tun-jpn", stage: "GRUPOS", localTeamCode: "TUN", awayTeamCode: "JPN", date: new Date('2026-06-21T01:00:00Z') },
      { id: "tun-ned", stage: "GRUPOS", localTeamCode: "TUN", awayTeamCode: "NED", date: new Date('2026-06-25T20:00:00Z') },
      { id: "jpn-swe", stage: "GRUPOS", localTeamCode: "JPN", awayTeamCode: "SWE", date: new Date('2026-06-25T20:00:00Z') },

      // === GRUPO G (BEL, EGY, IRN, NZL) ===
      { id: "bel-egy", stage: "GRUPOS", localTeamCode: "BEL", awayTeamCode: "EGY", date: new Date('2026-06-15T16:00:00Z') },
      { id: "irn-nzl", stage: "GRUPOS", localTeamCode: "IRN", awayTeamCode: "NZL", date: new Date('2026-06-15T22:00:00Z') },
      { id: "bel-irn", stage: "GRUPOS", localTeamCode: "BEL", awayTeamCode: "IRN", date: new Date('2026-06-21T16:00:00Z') },
      { id: "nzl-egy", stage: "GRUPOS", localTeamCode: "NZL", awayTeamCode: "EGY", date: new Date('2026-06-21T22:00:00Z') },
      { id: "nzl-bel", stage: "GRUPOS", localTeamCode: "NZL", awayTeamCode: "BEL", date: new Date('2026-06-27T00:00:00Z') },
      { id: "egy-irn", stage: "GRUPOS", localTeamCode: "EGY", awayTeamCode: "IRN", date: new Date('2026-06-27T00:00:00Z') },

      // === GRUPO H (ESP, CPV, KSA, URU) ===
      { id: "esp-cpv", stage: "GRUPOS", localTeamCode: "ESP", awayTeamCode: "CPV", date: new Date('2026-06-15T13:00:00Z') },
      { id: "ksa-uru", stage: "GRUPOS", localTeamCode: "KSA", awayTeamCode: "URU", date: new Date('2026-06-15T19:00:00Z') },
      { id: "esp-ksa", stage: "GRUPOS", localTeamCode: "ESP", awayTeamCode: "KSA", date: new Date('2026-06-21T13:00:00Z') },
      { id: "uru-cpv", stage: "GRUPOS", localTeamCode: "URU", awayTeamCode: "CPV", date: new Date('2026-06-21T19:00:00Z') },
      { id: "uru-esp", stage: "GRUPOS", localTeamCode: "URU", awayTeamCode: "ESP", date: new Date('2026-06-26T21:00:00Z') },
      { id: "cpv-ksa", stage: "GRUPOS", localTeamCode: "CPV", awayTeamCode: "KSA", date: new Date('2026-06-26T21:00:00Z') },

      // === GRUPO I (FRA, SEN, IRQ, NOR) ===
      { id: "fra-sen", stage: "GRUPOS", localTeamCode: "FRA", awayTeamCode: "SEN", date: new Date('2026-06-16T16:00:00Z') },
      { id: "irq-nor", stage: "GRUPOS", localTeamCode: "IRQ", awayTeamCode: "NOR", date: new Date('2026-06-16T19:00:00Z') },
      { id: "fra-irq", stage: "GRUPOS", localTeamCode: "FRA", awayTeamCode: "IRQ", date: new Date('2026-06-22T18:00:00Z') },
      { id: "nor-sen", stage: "GRUPOS", localTeamCode: "NOR", awayTeamCode: "SEN", date: new Date('2026-06-22T21:00:00Z') },
      { id: "nor-fra", stage: "GRUPOS", localTeamCode: "NOR", awayTeamCode: "FRA", date: new Date('2026-06-26T16:00:00Z') },
      { id: "sen-irq", stage: "GRUPOS", localTeamCode: "SEN", awayTeamCode: "IRQ", date: new Date('2026-06-26T16:00:00Z') },

      // === GRUPO J (ARG, DZA, AUT, JOR) ===
      { id: "arg-dza", stage: "GRUPOS", localTeamCode: "ARG", awayTeamCode: "DZA", date: new Date('2026-06-16T22:00:00Z') },
      { id: "aut-jor", stage: "GRUPOS", localTeamCode: "AUT", awayTeamCode: "JOR", date: new Date('2026-06-17T01:00:00Z') },
      { id: "arg-aut", stage: "GRUPOS", localTeamCode: "ARG", awayTeamCode: "AUT", date: new Date('2026-06-22T14:00:00Z') },
      { id: "jor-dza", stage: "GRUPOS", localTeamCode: "JOR", awayTeamCode: "DZA", date: new Date('2026-06-23T00:00:00Z') },
      { id: "jor-arg", stage: "GRUPOS", localTeamCode: "JOR", awayTeamCode: "ARG", date: new Date('2026-06-27T23:00:00Z') },
      { id: "dza-aut", stage: "GRUPOS", localTeamCode: "DZA", awayTeamCode: "AUT", date: new Date('2026-06-27T23:00:00Z') },

      // === GRUPO K (POR, COD, UZB, COL) ===
      { id: "por-cod", stage: "GRUPOS", localTeamCode: "POR", awayTeamCode: "COD", date: new Date('2026-06-17T14:00:00Z') },
      { id: "uzb-col", stage: "GRUPOS", localTeamCode: "UZB", awayTeamCode: "COL", date: new Date('2026-06-17T23:00:00Z') },
      { id: "por-uzb", stage: "GRUPOS", localTeamCode: "POR", awayTeamCode: "UZB", date: new Date('2026-06-23T14:00:00Z') },
      { id: "col-cod", stage: "GRUPOS", localTeamCode: "COL", awayTeamCode: "COD", date: new Date('2026-06-23T23:00:00Z') },
      { id: "col-por", stage: "GRUPOS", localTeamCode: "COL", awayTeamCode: "POR", date: new Date('2026-06-27T20:30:00Z') },
      { id: "cod-uzb", stage: "GRUPOS", localTeamCode: "COD", awayTeamCode: "UZB", date: new Date('2026-06-27T20:30:00Z') },

      // === GRUPO L (ENG, CRO, GHA, PAN) ===
      { id: "eng-cro", stage: "GRUPOS", localTeamCode: "ENG", awayTeamCode: "CRO", date: new Date('2026-06-17T17:00:00Z') },
      { id: "gha-pan", stage: "GRUPOS", localTeamCode: "GHA", awayTeamCode: "PAN", date: new Date('2026-06-17T20:00:00Z') },
      { id: "eng-gha", stage: "GRUPOS", localTeamCode: "ENG", awayTeamCode: "GHA", date: new Date('2026-06-23T17:00:00Z') },
      { id: "pan-cro", stage: "GRUPOS", localTeamCode: "PAN", awayTeamCode: "CRO", date: new Date('2026-06-23T20:00:00Z') },
      { id: "pan-eng", stage: "GRUPOS", localTeamCode: "PAN", awayTeamCode: "ENG", date: new Date('2026-06-27T18:00:00Z') },
      { id: "cro-gha", stage: "GRUPOS", localTeamCode: "CRO", awayTeamCode: "GHA", date: new Date('2026-06-27T18:00:00Z') },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });