import { getCollection, type CollectionEntry } from 'astro:content';
import { boards, getBoard } from '../config/boards';

export type Post = CollectionEntry<'blog'>;

// Astro 블로그 템플릿에 원래 들어 있던 예시 글만 목록에서 제외합니다.
// 예시 글의 제목을 수정하면 새 글로 간주해 목록에 표시됩니다.
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

export function isUncategorized(post: Post) {
  return !boards.some((board) => board.id === post.data.category);
}
