export type Attraction = {
  name: string;
  artist?: string;
  time: string;
  pole: string;
};

type ScheduleDay = {
  dayName: string;
  date: string;
  fullDate: string;
  color: string;
  attractions: Attraction[];
};

// Expanded schedule data with more detailed information
export const allDays: ScheduleDay[] = [
  {
    dayName: "SÁB",
    date: "14.JUN",
    fullDate: "14 DE JUNHO",
    color: "blue",
    attractions: [
      {
        name: "TRIO PÉ DE SERRA",
        artist: "",
        time: "15:00",
        pole: "Palco Principal",
      },
      {
        name: "FORRÓ RAIZ",
        artist: "",
        time: "17:30",
        pole: "Palco Principal",
      },
      {
        name: "GERALDO AZEVEDO",
        artist: "",
        time: "19:00",
        pole: "Palco Principal",
      },
      {
        name: "PRISCILA SENNA",
        artist: "",
        time: "21:30",
        pole: "Palco Principal",
      },
      {
        name: "DESEJO DE MENINA",
        artist: "",
        time: "23:45",
        pole: "Palco Principal",
      },
      {
        name: "QUADRILHAS JUNINAS",
        artist: "",
        time: "16:00",
        pole: "Palco Junino",
      },
      {
        name: "ZABUMBA DA SERRA",
        artist: "",
        time: "18:30",
        pole: "Palco Junino",
      },
      {
        name: "TRIO NORDESTINO",
        artist: "",
        time: "20:15",
        pole: "Palco Junino",
      },
      { name: "FLÁVIO JOSÉ", artist: "", time: "22:00", pole: "Palco Junino" },
      {
        name: "DJ MARLON",
        artist: "",
        time: "20:00",
        pole: "Arena Eletrônica",
      },
      {
        name: "XAND AVIÃO",
        artist: "",
        time: "22:30",
        pole: "Arena Eletrônica",
      },
      { name: "DJ IVIS", artist: "", time: "00:30", pole: "Arena Eletrônica" },
    ],
  },
  {
    dayName: "DOM",
    date: "15.JUN",
    fullDate: "15 DE JUNHO",
    color: "green",
    attractions: [
      {
        name: "TRIO FORRÓ MAIOR",
        artist: "",
        time: "15:00",
        pole: "Palco Principal",
      },
      {
        name: "LIMÃO COM MEL",
        artist: "",
        time: "17:30",
        pole: "Palco Principal",
      },
      {
        name: "FLÁVIO JOSÉ",
        artist: "",
        time: "20:00",
        pole: "Palco Principal",
      },
      {
        name: "DORGIVAL DANTAS",
        artist: "",
        time: "22:30",
        pole: "Palco Principal",
      },
      {
        name: "CIRO SANTOS",
        artist: "",
        time: "00:30",
        pole: "Palco Principal",
      },
      {
        name: "QUADRILHA MATUTA",
        artist: "",
        time: "16:00",
        pole: "Palco Junino",
      },
      {
        name: "ZABUMBA NOSSA SENHORA",
        artist: "",
        time: "18:30",
        pole: "Palco Junino",
      },
      {
        name: "TRIO VIRGULINO",
        artist: "",
        time: "20:15",
        pole: "Palco Junino",
      },
      {
        name: "SANTANNA O CANTADOR",
        artist: "",
        time: "22:00",
        pole: "Palco Junino",
      },
      {
        name: "DJ LUCAS BEAT",
        artist: "",
        time: "20:00",
        pole: "Arena Eletrônica",
      },
      {
        name: "PEDRO SAMPAIO",
        artist: "",
        time: "22:30",
        pole: "Arena Eletrônica",
      },
      { name: "DJ GUUGA", artist: "", time: "00:30", pole: "Arena Eletrônica" },
    ],
  },
  {
    dayName: "SEG",
    date: "16.JUN",
    fullDate: "16 DE JUNHO",
    color: "yellow",
    attractions: [
      {
        name: "TRIO NORDESTINO",
        artist: "",
        time: "15:00",
        pole: "Palco Principal",
      },
      {
        name: "FESTIVAL DAS",
        artist: "QUADRILHAS",
        time: "19:00",
        pole: "Palco Principal",
      },
      { name: "JUNINAS", artist: "", time: "20:00", pole: "Palco Principal" },
      {
        name: "QUADRILHA MATUTA",
        artist: "",
        time: "15:00",
        pole: "Palco Junino",
      },
      {
        name: "QUADRILHA JUNINA ARRETADA",
        artist: "",
        time: "16:30",
        pole: "Palco Junino",
      },
      {
        name: "QUADRILHA TRADIÇÃO",
        artist: "",
        time: "18:00",
        pole: "Palco Junino",
      },
      {
        name: "QUADRILHA RAIO DE SOL",
        artist: "",
        time: "19:30",
        pole: "Palco Junino",
      },
      {
        name: "QUADRILHA LUMIAR",
        artist: "",
        time: "21:00",
        pole: "Palco Junino",
      },
      { name: "DJ KEVIN", artist: "", time: "20:00", pole: "Arena Eletrônica" },
      { name: "ALOK", artist: "", time: "22:30", pole: "Arena Eletrônica" },
      {
        name: "DJ RENNAN DA PENHA",
        artist: "",
        time: "00:30",
        pole: "Arena Eletrônica",
      },
    ],
  },
  {
    dayName: "TER",
    date: "17.JUN",
    fullDate: "17 DE JUNHO",
    color: "red",
    attractions: [
      {
        name: "TRIO FORRÓ SERTÃO",
        artist: "",
        time: "15:00",
        pole: "Palco Principal",
      },
      {
        name: "BANDA MAGNÍFICOS",
        artist: "",
        time: "17:30",
        pole: "Palco Principal",
      },
      {
        name: "LEO FOGUETE",
        artist: "",
        time: "20:00",
        pole: "Palco Principal",
      },
      {
        name: "JONAS ESTICADO",
        artist: "",
        time: "22:30",
        pole: "Palco Principal",
      },
      {
        name: "JOÃO VAQUEIRO",
        artist: "",
        time: "00:30",
        pole: "Palco Principal",
      },
      {
        name: "CANTORES GOSPEL",
        artist: "",
        time: "16:00",
        pole: "Palco Junino",
      },
      {
        name: "CORAL MUNICIPAL",
        artist: "",
        time: "18:00",
        pole: "Palco Junino",
      },
      {
        name: "BANDA GOSPEL ADORADORES",
        artist: "",
        time: "20:00",
        pole: "Palco Junino",
      },
      {
        name: "MINISTÉRIO ADORAÇÃO E VIDA",
        artist: "",
        time: "22:00",
        pole: "Palco Junino",
      },
      {
        name: "DJ MARLBORO",
        artist: "",
        time: "20:00",
        pole: "Arena Eletrônica",
      },
      {
        name: "DENNIS DJ",
        artist: "",
        time: "22:30",
        pole: "Arena Eletrônica",
      },
      { name: "DJ ZULLU", artist: "", time: "00:30", pole: "Arena Eletrônica" },
    ],
  },
  {
    dayName: "QUA",
    date: "18.JUN",
    fullDate: "18 DE JUNHO",
    color: "purple",
    attractions: [
      {
        name: "TRIO FORRÓ REAL",
        artist: "",
        time: "15:00",
        pole: "Palco Principal",
      },
      {
        name: "CAVALEIROS DO FORRÓ",
        artist: "",
        time: "17:30",
        pole: "Palco Principal",
      },
      {
        name: "XAND AVIÃO",
        artist: "",
        time: "20:00",
        pole: "Palco Principal",
      },
      { name: "PABLO", artist: "", time: "22:30", pole: "Palco Principal" },
      {
        name: "FORROZÃO CHACAL",
        artist: "",
        time: "00:30",
        pole: "Palco Principal",
      },
      {
        name: "FEIRA DE ARTESANATO",
        artist: "",
        time: "15:00",
        pole: "Palco Junino",
      },
      {
        name: "TRIO PÉ DE SERRA",
        artist: "",
        time: "16:00",
        pole: "Palco Junino",
      },
      {
        name: "ZABUMBA NORDESTINA",
        artist: "",
        time: "18:00",
        pole: "Palco Junino",
      },
      {
        name: "TRIO FORRÓ SAUDADE",
        artist: "",
        time: "20:00",
        pole: "Palco Junino",
      },
      {
        name: "BANDA FORRÓ TRADICIONAL",
        artist: "",
        time: "22:00",
        pole: "Palco Junino",
      },
      {
        name: "DJ WESLEY SAFADÃO",
        artist: "",
        time: "20:00",
        pole: "Arena Eletrônica",
      },
      { name: "NATTAN", artist: "", time: "22:30", pole: "Arena Eletrônica" },
      {
        name: "DJ VINTAGE CULTURE",
        artist: "",
        time: "00:30",
        pole: "Arena Eletrônica",
      },
    ],
  },
];
