import type { Team } from "../types/types";

export const teamDictionary: Record<string, { name: string; flagUrl: string }> =
  {
    MEX: { name: "MÉXICO", flagUrl: "🇲🇽" },
    RSA: { name: "SUDÁFRICA", flagUrl: "🇿🇦" },
    KOR: { name: "COREA DEL SUR", flagUrl: "🇰🇷" },
    CZE: { name: "REPÚBLICA CHECA", flagUrl: "🇨🇿" },

    CAN: { name: "CANADÁ", flagUrl: "🇨🇦" },
    BIH: { name: "BOSNIA Y HERZEGOVINA", flagUrl: "🇧🇦" },
    QAT: { name: "CATAR", flagUrl: "🇶🇦" },
    SUI: { name: "SUIZA", flagUrl: "🇨🇭" },

    BRA: { name: "BRASIL", flagUrl: "🇧🇷" },
    MAR: { name: "MARRUECOS", flagUrl: "🇲🇦" },
    HAI: { name: "HAITÍ", flagUrl: "🇭🇹" },
    SCO: { name: "ESCOCIA", flagUrl: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },

    USA: { name: "ESTADOS UNIDOS", flagUrl: "🇺🇸" },
    PAR: { name: "PARAGUAY", flagUrl: "🇵🇾" },
    AUS: { name: "AUSTRALIA", flagUrl: "🇦🇺" },
    TUR: { name: "TURQUÍA", flagUrl: "🇹🇷" },

    GER: { name: "ALEMANIA", flagUrl: "🇩🇪" },
    CUW: { name: "CURAZAO", flagUrl: "🇨🇼" },
    CIV: { name: "COSTA DE MARFIL", flagUrl: "🇨🇮" },
    ECU: { name: "ECUADOR", flagUrl: "🇪🇨" },

    NED: { name: "PAÍSES BAJOS", flagUrl: "🇳🇱" },
    JPN: { name: "JAPÓN", flagUrl: "🇯🇵" },
    SWE: { name: "SUECIA", flagUrl: "🇸🇪" },
    TUN: { name: "TÚNEZ", flagUrl: "🇹🇳" },

    BEL: { name: "BÉLGICA", flagUrl: "🇧🇪" },
    EGY: { name: "EGIPTO", flagUrl: "🇪🇬" },
    IRN: { name: "IRÁN", flagUrl: "🇮🇷" },
    NZL: { name: "NUEVA ZELANDA", flagUrl: "🇳🇿" },

    ESP: { name: "ESPAÑA", flagUrl: "🇪🇸" },
    CPV: { name: "CABO VERDE", flagUrl: "🇨🇻" },
    KSA: { name: "ARABIA SAUDITA", flagUrl: "🇸🇦" },
    URU: { name: "URUGUAY", flagUrl: "🇺🇾" },

    FRA: { name: "FRANCIA", flagUrl: "🇫🇷" },
    SEN: { name: "SENEGAL", flagUrl: "🇸🇳" },
    IRQ: { name: "IRAK", flagUrl: "🇮🇶" },
    NOR: { name: "NORUEGA", flagUrl: "🇳🇴" },

    ARG: { name: "ARGENTINA", flagUrl: "🇦🇷" },
    DZA: { name: "ARGELIA", flagUrl: "🇩🇿" },
    AUT: { name: "AUSTRIA", flagUrl: "🇦🇹" },
    JOR: { name: "JORDANIA", flagUrl: "🇯🇴" },

    POR: { name: "PORTUGAL", flagUrl: "🇵🇹" },
    COD: { name: "RD CONGO", flagUrl: "🇨🇩" },
    UZB: { name: "UZBEKISTÁN", flagUrl: "🇺🇿" },
    COL: { name: "COLOMBIA", flagUrl: "🇨🇴" },

    ENG: { name: "INGLATERRA", flagUrl: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    CRO: { name: "CROACIA", flagUrl: "🇭🇷" },
    GHA: { name: "GHANA", flagUrl: "🇬🇭" },
    PAN: { name: "PANAMÁ", flagUrl: "🇵🇦" },
  };

export const inflateTeam = (code: string): Team => {
  const meta = teamDictionary[code] || { name: code, flagUrl: "🏳️" };
  return {
    id: `t-${code.toLowerCase()}`,
    code,
    name: meta.name,
    flagUrl: meta.flagUrl,
  };
};
