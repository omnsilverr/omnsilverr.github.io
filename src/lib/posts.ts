import { getCollection, type CollectionEntry } from 'astro:content';
import { boards, getBoard, type Board, type BoardGroup } from '../config/boards';

export type Post = CollectionEntry<'blog'>;

// Astro 기본 예시 글을 게시판 목록에서 제외합니다.
const starterPosts: Record<string, string> = {
  'first-post': 'First post',
  'second-post': 'Second post',
  'third-post': 'Third post',
  'markdown-style-guide': 'Markdown Style Guide',
  'using-mdx': 'Using MDX',
};

export function isStarterPost(post: Post) {
  return starterPosts[post.id] === post.data.title;
}

export async function getPosts(): Promise<Post[]> {
  return (await getCollection('blog'))
    .filter((post) => !isStarterPost(post))
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
