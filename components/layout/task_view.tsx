import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  dateToDayName,
  dateToMonthName,
  dateToYYYYMMDD,
} from 'utils/dateUtils';
import styles from './task_view.module.css';
import ModalPopup from './modal';
import { Category, ItemSafe } from 'lib/types/item';
import { useDispatch } from 'react-redux';
import { setCurrentOwnItem } from 'state/redux/ownSlice';
import { animated, useSpring } from '@react-spring/web';
import NewItem from 'components/item/create_item';
import { setCurrentListItem } from 'state/redux/listSlice';
import { BiCalendarStar } from 'react-icons/bi';
import { TbClock } from 'react-icons/tb';
import { MdDateRange } from 'react-icons/md';
import axios from 'axios';
import { ItemApiRoutes, ListApiRoutes } from 'lib/api/api_routes';

interface TaskViewProps {
  dayLayout: number;
  days: Date[];
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  category?: Category;
  itemsTimeSensitiveTasks: ItemSafe[];
  itemsTimeInsensitiveTasks: ItemSafe[];
  itemsTimeSensitiveEvents: ItemSafe[];
  itemsTimeInsensitiveEvents: ItemSafe[];
  setViewItemMode: Dispatch<SetStateAction<boolean>>;
}

export default function TaskView(props: TaskViewProps) {
  const dispatch = useDispatch();
  const currentDateString = new Date().toDateString();
  const [createNewItemMode, setCreateNewItemMode] = useState(false);

  const ItemsTimeInsensitiveTaskView = (day: Date, items: ItemSafe[]) => {
    const dayInYYYYMMDD = dateToYYYYMMDD(day);
    return items
      .filter((itemA) => {
        if (
          itemA.date_tz_insensitive &&
          !itemA.date_range_flag &&
          itemA.date_tz_insensitive == dayInYYYYMMDD
        ) {
          return true;
        } else {
          return false;
        }
      })
      .map((itemB) => {
        return (
          <div
            key={itemB.id}
            onClick={() => handleItemClick(itemB)}
            className={`flex flex-row items-center space-x-0.5 rounded-md
            justify-start text-black ${itemTypeStyling(
              itemB.item_type
            )} cursor-pointer ${styles.mobilePadding}`}
          >
            <BiCalendarStar className={`${styles.iconStyle}`}></BiCalendarStar>
            <span
              className={`text-xs truncate ${
                !itemB.active ? 'line-through' : ''
              }`}
            >
              {itemB.name}
            </span>
          </div>
        );
      });
  };

  const ItemsTimeInsensitiveEventView = (day: Date, items: ItemSafe[]) => {
    const dayInYYYYMMDD = dateToYYYYMMDD(day);
    return items
      .filter((itemA) => {
        if (
          itemA.date_tz_insensitive &&
          itemA.date_range_flag &&
          itemA.date_tz_insensitive == dayInYYYYMMDD
        ) {
          return true;
        } else {
          return false;
        }
      })
      .map((itemB) => {
        return (
          <div
            key={itemB.id}
            onClick={() => handleItemClick(itemB)}
            className={`flex flex-row items-center space-x-0.5 rounded-md
            justify-start text-black ${itemTypeStyling(
              itemB.item_type
            )} cursor-pointer ${styles.mobilePadding}`}
          >
            <MdDateRange className={`${styles.iconStyle}`}></MdDateRange>
            <span
              className={`text-xs truncate ${
                !itemB.active ? 'line-through' : ''
              }`}
            >
              {itemB.name}
            </span>
          </div>
        );
      });
  };

  const ItemsTimeSensitiveTaskView = (day: Date, items: ItemSafe[]) => {
    const dayInYYYYMMDD = dateToYYYYMMDD(day);
    return items
      .filter((itemA) => {
        if (
          itemA.date_tz_sensitive &&
          !itemA.date_range_flag &&
          dateToYYYYMMDD(itemA.date_tz_sensitive) == dayInYYYYMMDD
        ) {
          return true;
        } else {
          return false;
        }
      })
      .map((itemB) => {
        return (
          <div
            key={itemB.id}
            onClick={() => handleItemClick(itemB)}
            className={`flex flex-row items-center space-x-0.5 rounded-md
            justify-start text-black ${itemTypeStyling(
              itemB.item_type
            )} cursor-pointer ${styles.mobilePadding}`}
          >
            <span className="flex flex-row">
              <BiCalendarStar
                className={`${styles.iconStyle}`}
              ></BiCalendarStar>
              <TbClock className={`${styles.iconStyle}`}></TbClock>
            </span>
            <span
              className={`text-xs truncate ${
                !itemB.active ? 'line-through' : ''
              }`}
            >
              {itemB.name}
            </span>
          </div>
        );
      });
  };

  const ItemsTimeSensitiveEventView = (day: Date, items: ItemSafe[]) => {
    const dayInYYYYMMDD = dateToYYYYMMDD(day);
    return items
      .filter((itemA) => {
        if (
          itemA.date_tz_sensitive &&
          itemA.date_range_flag &&
          dateToYYYYMMDD(itemA.date_tz_sensitive) == dayInYYYYMMDD
        ) {
          return true;
        } else {
          return false;
        }
      })
      .map((itemB) => {
        return (
          <div
            key={itemB.id}
            onClick={() => handleItemClick(itemB)}
            className={`flex flex-row items-center space-x-0.5 rounded-md
            justify-start text-black ${itemTypeStyling(
              itemB.item_type
            )} cursor-pointer ${styles.mobilePadding}`}
          >
            <span className="flex flex-row">
              <MdDateRange
                className={`${styles.iconStyle} pb-0.5`}
              ></MdDateRange>
              <TbClock className={`${styles.iconStyle}`}></TbClock>
            </span>
            <span
              className={`text-xs truncate ${
                !itemB.active ? 'line-through' : ''
              }`}
            >
              {itemB.name}
            </span>
          </div>
        );
      });
  };

  const taskViewSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  return (
    <animated.div style={taskViewSpring}>
      <div className="flex flex-row flex-wrap break-words">
        {props.days.map((day, index) => {
          return (
            <div
              key={index}
              id="day-container-id"
              className={`pb-1 space-y-1 px-1 ${styles['day-container']}`}
            >
              <div
                onClick={() => {
                  props.setSelectedDate(day);
                  setCreateNewItemMode(true);
                }}
                className={`flex flex-row cursor-pointer justify-center items-center bg-stone-800 hover:bg-stone-700 text-center text-sm rounded-lg ${
                  currentDateString == day.toDateString() ? 'underline' : ''
                } ${styles.mobilePadding}`}
              >
                <div>
                  {dateToDayName(day)} {dateToMonthName(day)} {day.getDate()}
                </div>
              </div>
              {ItemsTimeInsensitiveEventView(
                day,
                props.itemsTimeInsensitiveEvents
              )}
              {ItemsTimeInsensitiveTaskView(
                day,
                props.itemsTimeInsensitiveTasks
              )}
              {ItemsTimeSensitiveEventView(day, props.itemsTimeSensitiveEvents)}
              {ItemsTimeSensitiveTaskView(day, props.itemsTimeSensitiveTasks)}
            </div>
          );
        })}
      </div>
      {createNewItemMode && (
        <ModalPopup
          modalId="create_item_modal"
          modalOpen={setCreateNewItemMode}
        >
          <NewItem
            selectedDate={props.selectedDate}
            itemCategory={props.category}
            setCreateNewItemMode={setCreateNewItemMode}
          />
        </ModalPopup>
      )}
    </animated.div>
  );

  async function handleItemClick(item: ItemSafe) {
    if (props.category) {
      switch (props.category) {
        case Category.LIST:
          const itemRefreshed = await getItem(item);
          dispatch(setCurrentListItem(itemRefreshed));
          break;
      }
    } else {
      const itemRefreshed = await getItem(item);
      dispatch(setCurrentOwnItem(itemRefreshed));
    }
    props.setViewItemMode(true);
  }

  async function getItem(item: ItemSafe) {
    try {
      return axios({
        method: 'GET',
        url: ItemApiRoutes.GET_ITEM,
        params: {
          item_id: item.id,
        },
      }).then((res) => {
        return res.data;
      });
    } catch (error) {
      console.log(error);
    }
  }

  function itemTypeStyling(itemType: string) {
    switch (itemType) {
      case 'ASSIGNMENT':
        return 'bg-emerald-400 hover:bg-emerald-300';
      case 'NOTE':
        return 'bg-cyan-400 hover:bg-cyan-300';
      case 'PROJECT':
        return 'bg-purple-400 hover:bg-purple-300';
      case 'REMINDER':
        return 'bg-indigo-400 hover:bg-indigo-300';
      case 'MEETING':
        return 'bg-rose-400 hover:bg-rose-300';
      case 'TEST':
        return 'bg-blue-400 hover:bg-blue-300';
      default:
        return 'bg-stone-100 hover:bg-white';
    }
  }
}
