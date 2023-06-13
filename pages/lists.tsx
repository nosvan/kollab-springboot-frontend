import { Layout } from 'components/layout/layout';
import { UserSliceState } from 'lib/types/user';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTab } from 'state/redux/userSlice';
import axios from 'axios';
import { RootState } from 'state/redux/store';
import { useRouter } from 'next/router';
import TaskView from 'components/layout/task_view';
import {
  dateToLongMonthName,
  decrementDate,
  getDays,
  incrementDate,
} from 'utils/dateUtils';
import { Category, ItemSafe } from 'lib/types/item';
import { TbArrowBigLeft, TbArrowBigRight, TbSettings } from 'react-icons/tb';
import Item from 'components/item/item';
import ModalPopup from 'components/layout/modal';
import { animated, useSpring } from '@react-spring/web';
import {
  setCurrentList,
  setCurrentListAndLists,
  setListItems,
} from 'state/redux/listSlice';
import { ListSafe, ListSliceState } from 'lib/types/list';
import NewList from 'components/list/create_list';
import EditList from 'components/layout/edit_list_ui';
import { SpringListApiRoutes } from 'lib/api/spring_api_routes';
import { TabName } from 'lib/types/ui';

export default function Lists() {
  const dispatch = useDispatch();
  const router = useRouter();
  const listState: ListSliceState = useSelector(
    (state: RootState) => state.list_store
  );
  const userState: UserSliceState = useSelector(
    (state: RootState) => state.user_store
  );
  useEffect(() => {
    if (!true) {
      router.push('/');
      return;
    }
    dispatch(setCurrentTab(TabName.LISTS));
    async function getUserLists() {
      await axios({
        method: 'get',
        url: SpringListApiRoutes.LIST_GET_LISTS,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }).then((res) => {
        dispatch(setCurrentListAndLists(res.data));
      });
    }
    getUserLists();
  }, [dispatch, router, userState.user]);

  useEffect(() => {
    async function getListItems() {
      await axios({
        method: 'get',
        url: SpringListApiRoutes.LIST_GET_ITEMS,
        params: {
          category: Category.LIST,
          categoryId: listState.list.id,
        },
        withCredentials: true,
      }).then((res) => {
        dispatch(setListItems(res.data));
      });
    }
    if (listState.list.id !== -999) getListItems();
  }, [dispatch, listState.list]);

  const [timeInsensitiveItemsTask, setTimeInsensitiveItemsTask] = useState<
    ItemSafe[]
  >([]);
  const [timeSensitiveItemsTask, setTimeSensitiveItemsTask] = useState<
    ItemSafe[]
  >([]);
  const [timeInsensitiveItemsEvent, setTimeInsensitiveItemsEvent] = useState<
    ItemSafe[]
  >([]);
  const [timeSensitiveItemsEvent, setTimeSensitiveItemsEvent] = useState<
    ItemSafe[]
  >([]);

  useEffect(() => {
    setTimeInsensitiveItemsTask(
      listState.items.filter(
        (item) => !item.timeSensitiveFlag && !item.dateRangeFlag
      )
    );
    setTimeInsensitiveItemsEvent(
      listState.items.filter(
        (item) => !item.timeSensitiveFlag && item.dateRangeFlag
      )
    );
    setTimeSensitiveItemsTask(
      listState.items.filter(
        (item) => item.timeSensitiveFlag && !item.dateRangeFlag
      )
    );
    setTimeSensitiveItemsEvent(
      listState.items.filter(
        (item) => item.timeSensitiveFlag && item.dateRangeFlag
      )
    );
  }, [listState.items]);

  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [dayLayout, setDayLayout] = useState(30);
  const [days, setDays] = useState(() => getDays(dayLayout, selectedDate));
  const [viewItemMode, setViewItemMode] = useState(false);
  const [editListMode, setEditListMode] = useState(false);

  useEffect(() => {
    setDays(getDays(dayLayout, selectedDate));
  }, [dayLayout, selectedDate]);

  const [createNewTypeMode, setCreateNewTypeMode] = useState(false);

  const listSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  return (
    <Layout>
      <animated.div
        style={listSpring}
        className="bg-black rounded-3xl p-5 text-white mt-2"
      >
        {listState.lists.length == 0 && (
          <div className="flex flex-row">
            <span
              onClick={() => setCreateNewTypeMode(true)}
              className="flex flex-row items-center space-x-1 text-sm bg-stone-900 hover:bg-stone-800 rounded-2xl p-2 cursor-pointer"
            >
              <span>Create/Join a List</span>
              <TbArrowBigRight></TbArrowBigRight>
            </span>
          </div>
        )}
        {listState.lists && listState.lists.length > 0 && (
          <div className="mb-1">
            <span className="items-center text-xl mx-1 pl-1">
              {dateToLongMonthName(selectedDate)} {selectedDate.getFullYear()}
            </span>
            <div className="flex flex-row flex-wrap items-center justify-between text-sm">
              <div className="flex flex-row items-center text-sm">
                <select
                  value={listState.list.id}
                  onChange={handleDropdownSelect}
                  name="lists"
                  id="lists-select"
                  className="flex flex-col rounded-lg items-center text-white bg-stone-800 hover:bg-stone-700 cursor-pointer p-1 text-sm m-1"
                >
                  {listState.lists.map((list: ListSafe) => (
                    <option key={list.id} value={list.id}>
                      {list.name} (#{list.id})
                    </option>
                  ))}
                </select>
                <span>
                  <div
                    className="rounded-lg text-white bg-stone-800 hover:bg-stone-700 cursor-pointer p-1"
                    onClick={() => setEditListMode(true)}
                  >
                    <TbSettings></TbSettings>
                  </div>
                </span>
              </div>
              <span className="flex flex-row items-center space-x-1 mx-1">
                <div
                  onClick={() => setSelectedDate(new Date())}
                  className="bg-stone-800 hover:bg-stone-700 p-1 rounded-lg cursor-pointer"
                >
                  Today
                </div>
                <div className="flex flex-row items-center space-x-2 p-1 bg-stone-800 rounded-lg">
                  <div
                    onClick={() => handleDecrementDate()}
                    className={`hover:bg-stone-700 cursor-pointer px-1 rounded-lg`}
                  >
                    <TbArrowBigLeft></TbArrowBigLeft>
                  </div>
                  <div
                    onClick={() => handleSetDayLayout(1)}
                    className={`hover:bg-stone-700 cursor-pointer px-1 rounded-lg ${
                      dayLayout === 1 ? 'bg-stone-700' : ''
                    }`}
                  >
                    Day
                  </div>
                  <div
                    onClick={() => handleSetDayLayout(7)}
                    className={`hover:bg-stone-700 cursor-pointer px-1 rounded-lg ${
                      dayLayout === 7 ? 'bg-stone-700' : ''
                    }`}
                  >
                    Week
                  </div>
                  <div
                    onClick={() => handleSetDayLayout(30)}
                    className={`hover:bg-stone-700 cursor-pointer px-1 rounded-lg ${
                      dayLayout === 30 ? 'bg-stone-700' : ''
                    }`}
                  >
                    Month
                  </div>
                  <div
                    onClick={() => handleIncrementDate()}
                    className={`hover:bg-stone-700 cursor-pointer px-1 rounded-lg`}
                  >
                    <TbArrowBigRight></TbArrowBigRight>
                  </div>
                </div>
              </span>
            </div>
          </div>
        )}
        {listState.lists.length > 0 && (
          <TaskView
            dayLayout={dayLayout}
            days={days}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            category={Category.LIST}
            itemsTimeInsensitiveEvents={timeInsensitiveItemsEvent}
            itemsTimeSensitiveEvents={timeSensitiveItemsEvent}
            itemsTimeInsensitiveTasks={timeInsensitiveItemsTask}
            itemsTimeSensitiveTasks={timeSensitiveItemsTask}
            setViewItemMode={setViewItemMode}
          />
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
        {viewItemMode && (
          <ModalPopup
            modalId="view_list_item_modal"
            modalOpen={setViewItemMode}
          >
            <Item item={listState.item} modalOpen={setViewItemMode}></Item>
          </ModalPopup>
        )}
        {editListMode && (
          <ModalPopup
            modalId="create_join_list_modal"
            modalOpen={setEditListMode}
          >
            <EditList listId={listState.list.id}></EditList>
          </ModalPopup>
        )}
      </animated.div>
    </Layout>
  );

  function handleIncrementDate() {
    setSelectedDate(incrementDate(selectedDate, dayLayout));
  }
  function handleDecrementDate() {
    setSelectedDate(decrementDate(selectedDate, dayLayout));
  }
  function handleSetDayLayout(newDayLayout: number) {
    setDayLayout(newDayLayout);
  }
  function handleDropdownSelect(event: {
    preventDefault: () => void;
    currentTarget: { value: any };
  }) {
    event.preventDefault();
    const listId = event.currentTarget.value;
    const list = listState.lists.find((list: ListSafe) => list.id == listId);
    dispatch(setCurrentList(list));
  }
}
