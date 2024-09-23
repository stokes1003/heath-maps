import { SignInButton, UserButton, useUser } from '@clerk/nextjs';

const Header = () => {
  const { user } = useUser();
  return (
    <div className="mx-4 float-end my-1">
      <UserButton />
      {!user && (
        <button className="text-white text-lg self-center bg-orange-500 h-8 w-20 shadow-lg drop-shadow-sm shadow-inherit rounded">
          <SignInButton />
        </button>
      )}
    </div>
  );
};
export default Header;
