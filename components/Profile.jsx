import { useSession } from 'next-auth/react';
import PromptCard from './PromptCard';

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>
      <div className='mt-10 prompt_layout'>
        {!data.length &&
          ['', '', ''].map((index) => (
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
        {data.length &&
          data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
      </div>
    </section>
  );
};

export default Profile;
