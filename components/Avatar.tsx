import useUser from '@/hooks/useUser';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const { data: fetchedUser } = useUser(userId);
  const router = useRouter();

  const onClickHandler = useCallback(
    (event: any) => {
      /* When we click on the avatar we want to override the parent element onClick thats what event.stopPropagation does */
      event.stopPropagation();

      const url = `/users/${userId}`;

      router.push(url);
    },
    [router, userId]
  );

  return (
    <div
      className={`${hasBorder ? 'border-4 border-black' : ''} ${
        isLarge ? 'h-20' : 'h-9'
      } ${
        isLarge ? 'w-20' : 'w-9'
      } rounded-full hover:opacity-90 transition cursor-pointer relative`}
    >
      <Image
        fill
        style={{
          objectFit: 'cover',
          borderRadius: '100%',
        }}
        alt='Avatar'
        onClick={onClickHandler}
        src={fetchedUser?.profileImage || '/images/placeholder.png'}
      />
    </div>
  );
};
export default Avatar;
