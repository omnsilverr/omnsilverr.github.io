// 게시판 추가·삭제 및 이름 변경은 이 파일에서 관리합니다.
// id: 글의 category에 사용하는 값이며 URL 주소에도 사용됩니다.
// parentId: 상위 게시판의 id. 생략하면 최상위 게시판입니다.
export type BoardGroup = 'study' | 'etc.';
export type Board = {
  id: string;
  name: string;
  group: BoardGroup;
  parentId?: string;
};

export const boards: Board[] = [
  { id: 'physics', name: 'Physics', group: 'study' },
  { id: 'electromagnetism', name: '전자기학', group: 'study', parentId: 'physics' },
  // 새로운 물리학 과목을 추가할 때 여기에 한 줄 추가하면 됩니다.
  // { id: 'quantum', name: '양자역학', group: 'study', parentId: 'physics' },

  { id: 'cs', name: 'Computer Science', group: 'study' },
  { id: 'data-structures', name: '자료구조', group: 'study', parentId: 'cs' },
  { id: 'digital-circuits', name: '디지털 회로', group: 'study', parentId: 'cs' },
  { id: 'java', name: 'JAVA 언어', group: 'study', parentId: 'cs' },

  { id: 'etc', name: 'etc.', group: 'etc.' },
];

export const getBoard = (id?: string) => boards.find((board) => board.id === id);
export const getChildren = (id: string) => boards.filter((board) => board.parentId === id);
export const boardLink = (id: string) => `/board/${id}/`;
