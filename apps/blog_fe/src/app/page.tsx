import Hero from '@/components/hero';
import Posts from '@/components/Posts';
import { fetchPosts } from '@/lib/actions/PostActions';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  const { totalPosts, posts } = await fetchPosts({
    page: page ? +page : undefined,
  });

  return (
    <main>
      <Hero />
      <Posts
        posts={posts}
        currentPage={page ? +page : 1}
        totalPage={Math.ceil(totalPosts / DEFAULT_PAGE_SIZE)}
      />
    </main>
  );
}
