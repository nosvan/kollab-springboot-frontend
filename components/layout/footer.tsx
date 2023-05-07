import { TabName } from 'lib/types/ui';
import { useRouter } from 'next/router';
import { FaLayerGroup } from 'react-icons/fa';
import { TbHome2, TbUser, TbUsers } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { RootState } from 'state/redux/store';

export default function Footer() {
  const user = useSelector((state: RootState) => state.user_store.user);
  const router = useRouter();
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
      if (tab == TabName.HOME) router.push('/');
      else router.push('/' + tab.toLowerCase());
    }
  }
}
