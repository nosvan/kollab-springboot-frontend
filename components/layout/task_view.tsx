import { Dispatch, SetStateAction, useState } from 'react';
import {
  dateStringYYYYMMDDtoLongDayOfWeek,
  dateToDayName,
  dateToMonthName,
  dateToYYYYMMDD,
  weekArrayIndex,
} from 'utils/dateUtils';
import styles from './task_view.module.css';
import ModalPopup from './modal';
import { Category, ItemSafe } from 'lib/types/item';
import { useDispatch } from 'react-redux';
import { setCurrentOwnItem } from 'state/redux/ownSlice';
import { animated, useSpring } from '@react-spring/web';
import NewItem from 'components/item/create_item';
import { setCurrentListItem } from 'state/redux/listSlice';
import axios from 'axios';
import { SpringItemApiRoutes } from 'lib/api/spring_api_routes';
import { getDay } from 'date-fns';
import TimeInsensitiveTaskItem from './ui_components/time_insensitive_task_item';
import TimeInsensitiveEventItem from './ui_components/time_insensitive_event_item';
import TimeSensitiveTaskItem from './ui_components/time_sensitive_task_item';
import TimeSensitiveEventItem from './ui_components/time_sensitive_event_item';

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

export function itemTypeStyling(itemType: string) {
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

export async function getItem(item: ItemSafe) {
  try {
    return axios({
      method: 'GET',
      url: SpringItemApiRoutes.ITEM_GET,
      headers: { 'Content-Type': 'application/json' },
      params: {
        itemId: item.id,
      },
      withCredentials: true,
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log(error);
  }
}

export default function TaskView(props: TaskViewProps) {
  const dispatch = useDispatch();
  const { category, setViewItemMode } = props;
  const currentDateString = new Date().toDateString();
  const [createNewItemMode, setCreateNewItemMode] = useState(false);

  const ItemsTimeInsensitiveTaskView = (day: Date, items: ItemSafe[]) => {
    const dayInYYYYMMDD = dateToYYYYMMDD(day);
    const dayInLongDayName = weekArrayIndex[getDay(day)];
    const itemPart1 = items
      .filter((item) => {
        if (
          item.dateTzInsensitive === dayInYYYYMMDD &&
          !item.reoccurringFlag &&
          item.dateTzInsensitive &&
          !item.dateRangeFlag
        ) {
          return true;
        } else return false;
      })
      .map((item) => {
        return (
          <TimeInsensitiveTaskItem
            key={item.id}
            item={item}
            setViewItemMode={setViewItemMode}
            category={category}
          ></TimeInsensitiveTaskItem>
        );
      });
    const itemPart2 = items
      .filter((item) => {
        if (!item.dateTzInsensitive) return false;
        const longDayOfWeekOfItem = dateStringYYYYMMDDtoLongDayOfWeek(
          item.dateTzInsensitive
        );
        if (
          item.reoccurringFlag &&
          longDayOfWeekOfItem === dayInLongDayName &&
          item.dateTzInsensitive &&
          !item.dateRangeFlag
        ) {
          return true;
        } else return false;
      })
      .map((item) => {
        return (
          <TimeInsensitiveTaskItem
            key={item.id}
            item={item}
            setViewItemMode={setViewItemMode}
            category={category}
          ></TimeInsensitiveTaskItem>
        );
      });
    return [...itemPart1, ...itemPart2];
  };

  const ItemsTimeInsensitiveEventView = (day: Date, items: ItemSafe[]) => {
    const dayInYYYYMMDD = dateToYYYYMMDD(day);
    const dayInLongDayName = weekArrayIndex[getDay(day)];
    const itemsPart1 = items
      .filter((item) => {
        if (
          item.dateRangeFlag &&
          item.dateTzInsensitive === dayInYYYYMMDD &&
          !item.reoccurringFlag &&
          item.dateTzInsensitive
        ) {
          return true;
        } else return false;
      })
      .map((item) => {
        return (
          <TimeInsensitiveEventItem
            key={item.id}
            item={item}
            setViewItemMode={setViewItemMode}
            category={category}
          ></TimeInsensitiveEventItem>
        );
      });
    const itemsPart2 = items
      .filter((item) => {
        if (!item.dateTzInsensitive) return false;
        const longDayOfWeekOfItem = dateStringYYYYMMDDtoLongDayOfWeek(
          item.dateTzInsensitive
        );
        if (
          item.dateRangeFlag &&
          longDayOfWeekOfItem === dayInLongDayName &&
          item.reoccurringFlag &&
          item.dateTzInsensitive
        ) {
          return true;
        } else return false;
      })
      .map((item) => {
        return (
          <TimeInsensitiveEventItem
            key={item.id}
            item={item}
            setViewItemMode={setViewItemMode}
            category={category}
          ></TimeInsensitiveEventItem>
        );
      });
    return [...itemsPart1, ...itemsPart2];
  };

  const ItemsTimeSensitiveTaskView = (day: Date, items: ItemSafe[]) => {
    const dayInYYYYMMDD = dateToYYYYMMDD(day);
    const dayInLongDayName = weekArrayIndex[getDay(day)];
    const itemsPart1 = items
      .filter((item) => {
        if (
          !item.reoccurringFlag &&
          item.dateTzSensitive &&
          !item.dateRangeFlag &&
          dateToYYYYMMDD(item.dateTzSensitive) == dayInYYYYMMDD
        ) {
          return true;
        } else return false;
      })
      .map((item) => {
        return (
          <TimeSensitiveTaskItem
            key={item.id}
            item={item}
            setViewItemMode={setViewItemMode}
            category={category}
          ></TimeSensitiveTaskItem>
        );
      });
    const itemsPart2 = items
      .filter((item) => {
        if (
          item.reoccurringFlag &&
          item.dateTzSensitive &&
          !item.dateRangeFlag &&
          dateStringYYYYMMDDtoLongDayOfWeek(
            dateToYYYYMMDD(item.dateTzSensitive)
          ) === dayInLongDayName
        ) {
          return true;
        } else return false;
      })
      .map((item) => {
        return (
          <TimeSensitiveTaskItem
            key={item.id}
            item={item}
            setViewItemMode={setViewItemMode}
            category={category}
          ></TimeSensitiveTaskItem>
        );
      });
    return [...itemsPart1, ...itemsPart2];
  };

  const ItemsTimeSensitiveEventView = (day: Date, items: ItemSafe[]) => {
    const dayInYYYYMMDD = dateToYYYYMMDD(day);
    const dayInLongDayName = weekArrayIndex[getDay(day)];
    const itemsPart1 = items
      .filter((item) => {
        if (
          !item.reoccurringFlag &&
          item.dateTzSensitive &&
          item.dateRangeFlag &&
          item.dateTzSensitiveEnd &&
          dateToYYYYMMDD(item.dateTzSensitive) == dayInYYYYMMDD
        ) {
          return true;
        } else return false;
      })
      .map((item) => {
        return (
          <TimeSensitiveEventItem
            key={item.id}
            item={item}
            setViewItemMode={setViewItemMode}
            category={category}
          ></TimeSensitiveEventItem>
        );
      });
    const itemsPart2 = items
      .filter((item) => {
        if (
          item.reoccurringFlag &&
          item.dateTzSensitive &&
          item.dateRangeFlag &&
          item.dateTzSensitiveEnd &&
          dateStringYYYYMMDDtoLongDayOfWeek(
            dateToYYYYMMDD(item.dateTzSensitive)
          ) === dayInLongDayName
        ) {
          return true;
        } else return false;
      })
      .map((item) => {
        return (
          <TimeSensitiveEventItem
            key={item.id}
            item={item}
            setViewItemMode={setViewItemMode}
            category={category}
          ></TimeSensitiveEventItem>
        );
      });
    return [...itemsPart1, ...itemsPart2];
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
}
