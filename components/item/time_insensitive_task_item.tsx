import { Category, ItemSafe } from 'lib/types/item';
import styles from './time_insensitive_task_item.module.css';
import { BiCalendarStar } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { setCurrentOwnItem } from 'state/redux/ownSlice';
import { setCurrentListItem } from 'state/redux/listSlice';
import { Dispatch, SetStateAction } from 'react';
import { itemTypeStyling, getItem } from 'components/layout/task_view';

interface TaskInsensitiveTaskItemProps {
  item: ItemSafe;
  setViewItemMode: Dispatch<SetStateAction<boolean>>;
  category?: Category;
}

export default function TimeInsensitiveTaskItem(
  props: TaskInsensitiveTaskItemProps
) {
  const dispatch = useDispatch();
  const { item, setViewItemMode, category } = props;
  return (
    <div
      key={item.id}
      onClick={() => handleItemClick(item)}
      className={`flex flex-row items-center space-x-0.5 rounded-md
    justify-start text-black ${itemTypeStyling(item.itemType)} cursor-pointer ${
        styles.mobilePadding
      }`}
    >
      <BiCalendarStar className={`${styles.iconStyle}`}></BiCalendarStar>
      <span
        className={`text-xs truncate ${!item.active ? 'line-through' : ''}`}
      >
        {item.name}
      </span>
    </div>
  );

  async function handleItemClick(item: ItemSafe) {
    if (category) {
      switch (category) {
        case Category.LIST:
          const itemRefreshed = await getItem(item);
          dispatch(setCurrentListItem(itemRefreshed));
          break;
      }
    } else {
      const itemRefreshed = await getItem(item);
      dispatch(setCurrentOwnItem(itemRefreshed));
    }
    setViewItemMode(true);
  }
}
