
import { SessionData } from './types';

export const SAMPLE_DATA: SessionData[] = [
  {
    session_id: "SESS-001",
    timestamp: "2024-05-20T08:30:00Z",
    items_checked: [
      { name: "지갑", checked: true },
      { name: "스마트키", checked: true },
      { name: "이어폰", checked: true },
      { name: "보조배터리", checked: true }
    ],
    departure_delay: 0,
    llm_coaching_msg: "완벽한 준비였습니다! 여유로운 아침 공기와 함께 기분 좋게 출발하셨네요. 오늘의 긍정적인 표정이 하루의 운을 끌어올릴 것입니다.",
    face_score: 95
  },
  {
    session_id: "SESS-002",
    timestamp: "2024-05-19T08:45:00Z",
    items_checked: [
      { name: "지갑", checked: true },
      { name: "스마트키", checked: false },
      { name: "이어폰", checked: true },
      { name: "우산", checked: true }
    ],
    departure_delay: 5,
    llm_coaching_msg: "스마트키를 한 번 더 체크해보세요. 비 오는 날이라 우산 챙기신 건 훌륭하지만, 소지품 확인 단계에서 5분 정도 지체되었습니다. 내일은 3분만 더 일찍 준비를 마쳐볼까요?",
    face_score: 72
  },
  {
    session_id: "SESS-003",
    timestamp: "2024-05-18T09:15:00Z",
    items_checked: [
      { name: "지갑", checked: true },
      { name: "스마트키", checked: true },
      { name: "에어팟", checked: true },
      { name: "노트북", checked: false }
    ],
    departure_delay: 20,
    llm_coaching_msg: "지각의 위험이 감지되었습니다! 평소보다 20분 늦게 출발하셨고 표정에도 조급함이 묻어있네요. 업무 시작 전 짧은 명상으로 마음을 가다듬어 보세요.",
    face_score: 45
  }
];
