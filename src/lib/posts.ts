import { getCollection, type CollectionEntry } from 'astro:content';
import { boards, getBoard, type Board, type BoardGroup } from '../config/boards';

export type Post = CollectionEntry<'blog'>;

export async function getPosts(): Promise<Post[]> {
  return (await getCollection('blog'))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function getPostBoard(post: Post) {
  return getBoard(post.data.category);
}

// 상위 과목을 선택하면 그 과목 아래 게시판에 있는 글도 함께 보여줍니다.
export function isInBoard(post: Post, board: Board): boolean {
  let current = getBoard(post.data.category);
  const visited = new Set<string>();
  while (current && !visited.has(current.id)) {
    if (current.id === board.id) return true;
    visited.add(current.id);
    current = getBoard(current.parentId);
  }
  return false;
}

export function isInGroup(post: Post, group: BoardGroup): boolean {
  return getPostBoard(post)?.group === group;
}

export function isUncategorized(post: Post) {
  return !boards.some((board) => board.id === post.data.category);
}
