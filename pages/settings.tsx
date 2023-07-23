import { animated, useSpring } from '@react-spring/web';
import axios from 'axios';
import { Layout } from 'components/layout/layout';
import { SpringApiRoutes } from 'lib/api/spring_api_routes';
import { TabName } from 'lib/types/ui';
import { UserSafe } from 'lib/types/user';
import { getCurrentUser } from 'pages';
import { useEffect } from 'react';
import { TbArrowBigRight } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'state/redux/store';
import { setCurrentTab, setUserState } from 'state/redux/userSlice';

export default function Settings({ user }: { user: UserSafe }) {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user_store);
  dispatch(setCurrentTab(TabName.SETTINGS));

  useEffect(() => {
    async function getCurrentUser() {
      try {
        await axios({
          method: 'GET',
          url: SpringApiRoutes.CURRENT_USER,
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }).then((res) => {
          dispatch(
            setUserState({
              ...res.data,
              isLoggedIn: true,
              currentTab: TabName.SETTINGS,
            })
          );
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (!userState.user.isLoggedIn) {
      getCurrentUser();
    }
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
