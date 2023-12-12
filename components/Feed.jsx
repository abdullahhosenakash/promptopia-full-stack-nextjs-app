'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import PromptCardList from './PromptCardList';

const Feed = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  console.log(providers);

  const handleSearchChange = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setDataLoading(true);
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
      setDataLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form
        className='relative flex-center w-full'
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        dataLoading={dataLoading}
        data={posts}
        handleTagClick={() => {}}
        providers={providers}
      />
    </section>
  );
};

export default Feed;
