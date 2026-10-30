// 게시판 추가/삭제는 이 파일에서만 하면 됩니다.
// id: 영문 소문자/숫자/하이픈을 권장 (게시판 주소 및 글 category에 사용)
// name: 화면에 표시되는 게시판 이름
// group: 'study'(전공 공부) 또는 'journal'(일상)
export type BoardGroup = 'study' | 'etc.';
export type Board = { id: string; name: string; group: BoardGroup };

export const boards: Board[] = [
  { id: 'physics', name: 'Physics', group: 'study' },
  { id: 'cs', name: 'Computer Science', group: 'study' },
  { id: 'etc', name: '기타', group: 'etc.' },
];

export const getBoard = (id?: string) => boards.find((board) => board.id === id);
export const boardLink = (id: string) => `/board/${id}/`;
