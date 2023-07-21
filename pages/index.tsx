import { Layout } from 'components/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setUserState } from 'state/redux/userSlice';
import { UserSafe } from 'lib/types/user';
import { useRouter } from 'next/router';
import { TabName } from 'lib/types/ui';
import { animated, useSpring } from '@react-spring/web';
import { TbArrowBigRight } from 'react-icons/tb';
import ModalPopup from 'components/layout/modal';
import NewItem from 'components/item/create_item';
import NewList from 'components/list/create_list';
import { RootState } from 'state/redux/store';
import axios from 'axios';
import { SpringApiRoutes } from 'lib/api/spring_api_routes';

export async function getCurrentUser() {
  try {
    await axios({
      method: 'GET',
      url: SpringApiRoutes.CURRENT_USER,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
}

export default function Index({ user }: { user: UserSafe }) {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user_store);

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
              currentTab: TabName.HOME,
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

  const [createNewTypeMode, setCreateNewTypeMode] = useState(false);
  const [createNewItemMode, setCreateNewItemMode] = useState(false);

  const indexSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  return (
    <Layout>
      <animated.div
        style={indexSpring}
        className="bg-black rounded-3xl p-5 text-white mt-2"
      >
        <div className="flex flex-col space-y-2">
          <div className="flex">
            <span className="bg-blue-700 rounded-2xl px-2 py-1">
              Quick Actions
            </span>
          </div>
          <div>
            <div className="flex flex-row">
              <span
                onClick={() => setCreateNewItemMode(true)}
                className="flex flex-row items-center space-x-1 text-sm bg-stone-900 hover:bg-stone-800 rounded-2xl p-2 cursor-pointer"
              >
                <span>Add to Own List</span>
                <TbArrowBigRight></TbArrowBigRight>
              </span>
            </div>
          </div>
          <div className="flex flex-row">
            <span
              onClick={() => setCreateNewTypeMode(true)}
              className="flex flex-row items-center space-x-1 text-sm bg-stone-900 hover:bg-stone-800 rounded-2xl p-2 cursor-pointer"
            >
              <span>Create or Join a List</span>
              <TbArrowBigRight></TbArrowBigRight>
            </span>
          </div>
        </div>
      </animated.div>
      {createNewItemMode && (
        <ModalPopup
          modalId="create_personal_item_modal"
          modalOpen={setCreateNewItemMode}
        >
          {createNewItemMode && (
            <NewItem setCreateNewItemMode={setCreateNewItemMode}></NewItem>
          )}
        </ModalPopup>
      )}
      {createNewTypeMode && (
        <ModalPopup
          modalId="create_join_list_modal"
          modalOpen={setCreateNewTypeMode}
        >
          {createNewTypeMode && (
            <NewList setCreateNewTypeMode={setCreateNewTypeMode}></NewList>
          )}
        </ModalPopup>
      )}
    </Layout>
  );
}
