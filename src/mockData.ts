export interface ScheduleItem {
  time: string;
  artist: string;
  stage: string;
}

export interface ProgramDay {
  id: number;
  date: string;
  dayName: string;
  dayNumber: string;
  month: string;
  image: string;
  artists: string[];
  schedule: ScheduleItem[];
}

export const mainStage: ProgramDay[] = [
  {
    id: 1,
    date: "14.JUN",
    dayName: "SAB",
    dayNumber: "14",
    month: "JUN",
    image: "/assets/programacao/14-06-2024.jpeg",
    artists: ["GERALDO AZEVEDO", "PRISCILA SENNA", "DESEJO DE MENINA"],
    schedule: [
      { time: "20:00", artist: "GERALDO AZEVEDO", stage: "Palco Principal" },
      { time: "21:30", artist: "PRISCILA SENNA", stage: "Palco Principal" },
      { time: "23:00", artist: "DESEJO DE MENINA", stage: "Palco Principal" }
    ]
  },
  {
    id: 2,
    date: "15.JUN",
    dayName: "DOM",
    dayNumber: "15",
    month: "JUN",
    image: "/assets/programacao/15-06-2024.jpeg",
    artists: ["FLÁVIO JOSÉ", "DORGIVAL DANTAS", "CIRO SANTOS"],
    schedule: [
      { time: "20:00", artist: "FLÁVIO JOSÉ", stage: "Palco Principal" },
      { time: "21:30", artist: "DORGIVAL DANTAS", stage: "Palco Principal" },
      { time: "23:00", artist: "CIRO SANTOS", stage: "Palco Principal" }
    ]
  },
  {
    id: 3,
    date: "16.JUN",
    dayName: "SEG",
    dayNumber: "16",
    month: "JUN",
    image: "/assets/programacao/16-06-2024.jpeg",
    artists: ["FESTIVAL DAS QUADRILHAS JUNINAS"],
    schedule: [
      { time: "19:00", artist: "QUADRILHA MATUTA", stage: "Arena das Quadrilhas" },
      { time: "20:30", artist: "QUADRILHA JUNINA ARRETADA", stage: "Arena das Quadrilhas" },
      { time: "22:00", artist: "QUADRILHA TRADIÇÃO", stage: "Arena das Quadrilhas" }
    ]
  },
  {
    id: 4,
    date: "17.JUN",
    dayName: "TER",
    dayNumber: "17",
    month: "JUN",
    image: "/assets/programacao/17-06-2024.jpeg",
    artists: ["LÉO FOGUETE", "JONAS ESTICADO", "JOÃO VAQUEIRO"],
    schedule: [
      { time: "20:00", artist: "LÉO FOGUETE", stage: "Palco Principal" },
      { time: "21:30", artist: "JONAS ESTICADO", stage: "Palco Principal" },
      { time: "23:00", artist: "JOÃO VAQUEIRO", stage: "Palco Principal" }
    ]
  },
  {
    id: 5,
    date: "18.JUN",
    dayName: "QUA",
    dayNumber: "18",
    month: "JUN",
    image: "/assets/programacao/18-06-2024.jpeg",
    artists: ["XAND AVIÃO", "PABLO", "FORROZÃO CHACAL"],
    schedule: [
      { time: "20:00", artist: "XAND AVIÃO", stage: "Palco Principal" },
      { time: "21:30", artist: "PABLO", stage: "Palco Principal" },
      { time: "23:00", artist: "FORROZÃO CHACAL", stage: "Palco Principal" }
    ]
  },
  {
    id: 6,
    date: "19.JUN",
    dayName: "QUI",
    dayNumber: "19",
    month: "JUN",
    image: "/assets/programacao/19-06-2024.jpeg",
    artists: ["ZÉ VAQUEIRO", "MANIM VAQUEIRO", "BIA VILLA-CHAN"],
    schedule: [
      { time: "20:00", artist: "ZÉ VAQUEIRO", stage: "Palco Principal" },
      { time: "21:30", artist: "MANIM VAQUEIRO", stage: "Palco Principal" },
      { time: "23:00", artist: "BIA VILLA-CHAN", stage: "Palco Principal" }
    ]
  },
  {
    id: 7,
    date: "20.JUN",
    dayName: "SEX",
    dayNumber: "20",
    month: "JUN",
    image: "/assets/programacao/20-06-2024.jpeg",
    artists: ["REY VAQUEIRO", "BRASAS DO FORRÓ", "YCARO E VITÓRIO"],
    schedule: [
      { time: "20:00", artist: "REY VAQUEIRO", stage: "Palco Principal" },
      { time: "21:30", artist: "BRASAS DO FORRÓ", stage: "Palco Principal" },
      { time: "23:00", artist: "YCARO E VITÓRIO", stage: "Palco Principal" }
    ]
  },
  {
    id: 8,
    date: "21.JUN",
    dayName: "SAB",
    dayNumber: "21",
    month: "JUN",
    image: "/assets/programacao/21-06-2024.jpeg",
    artists: ["NODA DE CAJU", "FABINHO TESTADO"],
    schedule: [
      { time: "20:00", artist: "NODA DE CAJU", stage: "Palco Principal" },
      { time: "21:30", artist: "FABINHO TESTADO", stage: "Palco Principal" }
    ]
  },
  {
    id: 9,
    date: "22.JUN",
    dayName: "DOM",
    dayNumber: "22",
    month: "JUN",
    image: "/assets/programacao/22-06-2024.jpeg",
    artists: ["GERALDINHO LINS", "NANDO CORDEL", "SAMBA DE COCO RAÍZES DE ARCOVERDE", "SILVIA REGINA"],
    schedule: [
      { time: "20:00", artist: "GERALDINHO LINS", stage: "Palco Principal" },
      { time: "21:30", artist: "NANDO CORDEL", stage: "Palco Principal" },
      { time: "23:00", artist: "SAMBA DE COCO RAÍZES DE ARCOVERDE", stage: "Palco Principal" },
      { time: "00:30", artist: "SILVIA REGINA", stage: "Palco Principal" }
    ]
  },
  {
    id: 10,
    date: "24.JUN",
    dayName: "TER",
    dayNumber: "24",
    month: "JUN",
    image: "/assets/programacao/24-06-2024.jpeg",
    artists: ["SEU DESEJO", "JORGE DE ALTINHO", "GEORGE SILVA"],
    schedule: [
      { time: "20:00", artist: "SEU DESEJO", stage: "Palco Principal" },
      { time: "21:30", artist: "JORGE DE ALTINHO", stage: "Palco Principal" },
      { time: "23:00", artist: "GEORGE SILVA", stage: "Palco Principal" }
    ]
  },
  {
    id: 11,
    date: "25.JUN",
    dayName: "QUA",
    dayNumber: "25",
    month: "JUN",
    image: "/assets/programacao/25-06-2024.jpeg",
    artists: ["FELIPE AMORIM", "ÉRIC LAND", "ÁVINE VINNY"],
    schedule: [
      { time: "20:00", artist: "FELIPE AMORIM", stage: "Palco Principal" },
      { time: "21:30", artist: "ÉRIC LAND", stage: "Palco Principal" },
      { time: "23:00", artist: "ÁVINE VINNY", stage: "Palco Principal" }
    ]
  },
  {
    id: 12,
    date: "26.JUN",
    dayName: "QUI",
    dayNumber: "26",
    month: "JUN",
    image: "/assets/programacao/26-06-2024.jpeg",
    artists: ["WESLEY SAFADÃO", "TARCÍSIO DO ACORDEON"],
    schedule: [
      { time: "20:00", artist: "WESLEY SAFADÃO", stage: "Palco Principal" },
      { time: "21:30", artist: "TARCÍSIO DO ACORDEON", stage: "Palco Principal" }
    ]
  },
  {
    id: 13,
    date: "27.JUN",
    dayName: "SEX",
    dayNumber: "27",
    month: "JUN",
    image: "/assets/programacao/27-06-2024.jpeg",
    artists: ["RAPHAELA SANTOS", "WALKYRIA SANTOS", "NÁGYLLA FERREIRA"],
    schedule: [
      { time: "20:00", artist: "RAPHAELA SANTOS", stage: "Palco Principal" },
      { time: "21:30", artist: "WALKYRIA SANTOS", stage: "Palco Principal" },
      { time: "23:00", artist: "NÁGYLLA FERREIRA", stage: "Palco Principal" }
    ]
  },
  {
    id: 14,
    date: "28.JUN",
    dayName: "SAB",
    dayNumber: "28",
    month: "JUN",
    image: "/assets/programacao/28-06-2024.jpeg",
    artists: ["TATY GIRL", "ZÉ CANTOR", "CARLOS E FÁBIO", "MACIEL KURE"],
    schedule: [
      { time: "20:00", artist: "TATY GIRL", stage: "Palco Principal" },
      { time: "21:30", artist: "ZÉ CANTOR", stage: "Palco Principal" },
      { time: "23:00", artist: "CARLOS E FÁBIO", stage: "Palco Principal" },
      { time: "00:30", artist: "MACIEL KURE", stage: "Palco Principal" }
    ]
  }
]; 