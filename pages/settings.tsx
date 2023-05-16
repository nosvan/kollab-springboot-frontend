import { animated, useSpring } from '@react-spring/web';
import { Layout } from 'components/layout/layout';
import { UserSafe } from 'lib/types/user';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { TbArrowBigRight } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { setUserState } from 'state/redux/userSlice';

export default function Settings({ user }: { user: UserSafe }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!true) {
      router.push('/');
      return;
    }
    dispatch(setUserState({ ...user, currentTab: 'settings' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settingsSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  return (
    <Layout>
      <animated.div style={settingsSpring}>
        <div className="bg-black rounded-3xl p-5 text-white mt-2">
          <div className="flex flex-col space-y-1 p-1">
            <div className="flex flex-row">
              <div className="flex flex-row items-center space-x-1 px-1 rounded-lg bg-stone-800 hover:bg-stone-700 cursor-pointer">
                <div>To Do: Manage Account</div>
                <TbArrowBigRight></TbArrowBigRight>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="flex flex-row items-center space-x-1 px-1 rounded-lg bg-stone-800 hover:bg-stone-700 cursor-pointer">
                <div>To Do: Manage Lists</div>
                <TbArrowBigRight></TbArrowBigRight>
              </div>
            </div>
          </div>
        </div>
      </animated.div>
    </Layout>
  );
}
