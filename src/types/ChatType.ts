// 1:1 채팅을 위한 타입

// 사용자 정보
export interface ChatUser {
  id: string; //  사용자 고유 식별자 (uuid)
  email: string; // 사용자 이메일 주소
  nickname: string; // 표시용 닉네임
  avatar_url?: string; //  프로필 이미지 URL(선택)
}

//채팅 정보
export interface Chat {
  id: string; // 채팅방 고유 식별자
  name: string; //  채팅방 이름
  type: 'direct'; // 채팅방 타입 (direct | group): 현재는 1:1만 지원
  created_by: string; //  채팅방 생성한 유저의 ID
  created_at: string; // 생성시간
  updated_at: string; // 마지막 업데이트 시간
}

// 메세지 타입
export interface Message {
  id: string; // 메세지 고유 식별자
  chat_id: string; // 채팅방 아이디
  sender_id: string; // 발신자 사용자 아이디
  content: string; // 메세지 내용
  created_at: string; //  전송시간
  updated_at: string; // 수정시간(편집 시)
}

// 메세지의 상세 추가 확장 정보
export interface MessageDetail extends Message {
  sender: ChatUser;
}

// 채팅 목록
export interface ChatListItem {
  id: string; //채팅방 ID
  name: string; //채팅방 이름
  type: 'direct'; // 채팅방 타입
  last_message?: {
    //마지막 메세지 정보(선택사항)
    content: string; // 내용
    create_at: string; // 작성 시간
    sender_nickname: string; // 보낸사람닉네임
  };
  other_user: ChatUser; // 상대방 사용자 정보
  unread_count: number; // 읽지 않은 메세지 수
  update_at: string; // 마지막 업데이트 시간
}
