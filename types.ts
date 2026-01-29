
export interface ItemCheck {
  name: string;
  checked: boolean;
}

export interface SessionData {
  session_id: string;
  timestamp: string;
  items_checked: ItemCheck[];
  departure_delay: number; // minutes
  llm_coaching_msg: string;
  face_score: number; // 0-100
}
