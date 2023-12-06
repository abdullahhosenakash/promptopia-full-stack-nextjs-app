'use client';
import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';
import { useSession } from 'next-auth/react';

const PromptCardList = ({ dataLoading, data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {!dataLoading
        ? data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
            />
          ))
        : ['', '', ''].map((index) => (
            <div className='prompt_card animate-pulse' key={index}>
              <div className='flex justify-between items-start gap-5'>
                <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
                  <svg
                    className='skeleton_image'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z' />
                  </svg>
                  <div className='flex flex-col gap-1'>
                    <div className='skeleton_head' />
                    <div className='skeleton_email' />
                  </div>
                </div>
                <div className='skeleton_copy' />
              </div>

              <div className='skeleton_text mt-4' />
              <div className='skeleton_text mt-1.5' />
              <div className='skeleton_text mt-1.5' />
              <div className='skeleton_text mt-1.5' />
              <div className='skeleton_text mt-1.5 w-8' />
              <div className='flex'>
                <div className='skeleton_tag mt-4' />{' '}
                <div className='skeleton_tag mt-4' />
              </div>
            </div>
          ))}
    </div>
  );
};

const Feed = () => {
  const { data: session } = useSession();
  const [dataLoading, setDataLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

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
      <form className='relative flex-center w-full'>
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
      />
    </section>
  );
};

export default Feed;
