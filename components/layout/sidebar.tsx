import { TabName } from 'lib/types/ui';
import { useRouter } from 'next/router';
import { FaLayerGroup } from 'react-icons/fa';
import { TbHome2, TbSettings, TbUser, TbUsers } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'state/redux/store';
import { setCurrentTab } from 'state/redux/userSlice';

export default function SideBar() {
  const user = useSelector((state: RootState) => state.user_store.user);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="flex flex-col py-5 space-y-5">
      {/* logo */}
      <div
        className="flex flex-row items-center font-semibold
    text-blue-700 text-2xl cursor-pointer p-1"
      >
        <FaLayerGroup size={32} />
        <div className="hidden md:block">kollab</div>
      </div>
      {/* home */}
      <div
        onClick={() => {
          handleActiveTab(TabName.HOME);
        }}
        className={`${
          user.currentTab == TabName.HOME
            ? 'text-white font-light'
            : 'text-gray-400 font-extralight'
        } flex flex-row items-center text-lg cursor-pointer p-1 hover:text-white  rounded-3xl hover:bg-stone-800`}
      >
        <TbHome2 size={32} strokeWidth={'1'} />
        <div className="hidden md:block">{TabName.HOME}</div>
      </div>
      {/* user */}
      {true && (
        <div
          onClick={() => {
            handleActiveTab(TabName.OWN);
          }}
          className={`${
            user.currentTab == TabName.OWN
              ? 'text-white font-light'
              : 'text-gray-400 font-extralight'
          } flex flex-row items-center text-lg cursor-pointer p-1 hover:text-white  rounded-3xl hover:bg-stone-800`}
        >
          <TbUser size={32} strokeWidth={'1'} />
          <div className="hidden md:block">{TabName.OWN}</div>
        </div>
      )}
      <div
        onClick={() => {
          handleActiveTab(TabName.LISTS);
        }}
        className={`${
          user.currentTab == TabName.LISTS
            ? 'text-white font-light'
            : 'text-gray-400 font-extralight'
        } flex flex-row items-center text-lg cursor-pointer p-1 hover:text-white  rounded-3xl hover:bg-stone-800`}
      >
        <TbUsers size={32} strokeWidth={'1'} />
        <div className="hidden md:block">{TabName.LISTS}</div>
      </div>
      {false && (
        <div
          onClick={() => {
            handleActiveTab(TabName.SETTINGS);
          }}
          className={`${
            user.currentTab == TabName.SETTINGS
              ? 'text-white font-light'
              : 'text-gray-400 font-extralight'
          } flex flex-row items-center text-lg cursor-pointer p-1 hover:text-white  rounded-3xl hover:bg-stone-800`}
        >
          <TbSettings size={32} strokeWidth={'1'} />
          <div className="hidden md:block">{TabName.SETTINGS}</div>
        </div>
      )}
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
