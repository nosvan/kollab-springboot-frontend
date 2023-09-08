import { TabName } from 'lib/types/ui';
import { useRouter } from 'next/router';
import { FaLayerGroup } from 'react-icons/fa';
import { TbHome2, TbUser, TbUsers } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'state/redux/store';
import { setCurrentTab } from 'state/redux/userSlice';

export default function Footer() {
  const user = useSelector((state: RootState) => state.user_store.user);
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div
      className="flex flex-row justify-between fixed bottom-0
  px-20 w-full sm:hidden text-white bg-black py-2"
    >
      <FaLayerGroup
        onClick={() => {
          handleActiveTab(TabName.HOME);
        }}
        className="text-blue-700"
        size={32}
      />

      <TbHome2
        onClick={() => {
          handleActiveTab(TabName.HOME);
        }}
        size={32}
        strokeWidth={1}
        className={
          user.currentTab == TabName.HOME
            ? 'text-white font-light'
            : 'text-gray-400 font-extralight'
        }
      />
      <TbUser
        onClick={() => {
          handleActiveTab(TabName.OWN);
        }}
        size={32}
        strokeWidth={1}
        className={
          user.currentTab == TabName.OWN
            ? 'text-white font-light'
            : 'text-gray-400 font-extralight'
        }
      />
      <TbUsers
        onClick={() => {
          handleActiveTab(TabName.LISTS);
        }}
        size={32}
        strokeWidth={1}
        className={
          user.currentTab == TabName.LISTS
            ? 'text-white font-light'
            : 'text-gray-400 font-extralight'
        }
      />
    </div>
  );

  function handleActiveTab(tab: string) {
    if (user.currentTab.toLowerCase() != tab.toLowerCase()) {
      switch (tab) {
        case TabName.HOME:
          dispatch(setCurrentTab(tab));
          router.push('/');
          break;
        case TabName.OWN:
          dispatch(setCurrentTab(tab));
          router.push(TabName.OWN);
          break;
        case TabName.LISTS:
          dispatch(setCurrentTab(tab));
          router.push(TabName.LISTS);
          break;
        case TabName.SETTINGS:
          dispatch(setCurrentTab(tab));
          router.push(TabName.SETTINGS);
          break;
        default:
          router.push('/');
          break;
      }
    }
  }
}
