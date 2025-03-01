import { fetchPostById } from '@/lib/actions/PostActions';
import Image from 'next/image';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

const PostPage = async ({ params }: Props) => {
  const postId = Number(params.id);
  const post = await fetchPostById(postId);

  if (!post) {
    return (
      <main className="flex items-center justify-center h-screen text-gray-600">
        <p className="text-lg font-semibold">Post not found.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-6 py-12 mt-16 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
      <p className="text-sm text-gray-500 mt-2">
        By <span className="font-medium text-gray-700">{post.author.name}</span>{' '}
        | {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <div className="mt-6 relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
        <Image
          src={post.thumbnail || '/no-image.png'}
          alt={post.title}
          layout="fill"
          className="object-cover"
        />
      </div>

      <div className="mt-6 text-lg text-gray-800 leading-relaxed">
        {post.content}
      </div>
    </main>
  );
};

export default PostPage;
