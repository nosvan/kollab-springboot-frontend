import { ItemSafe, ItemType } from 'lib/types/item';
import { Dispatch, SetStateAction } from 'react';
import {
  TbArrowBarToDown,
  TbCalendarEvent,
  TbClock,
  TbSelect,
} from 'react-icons/tb';
import { dateStringYYYYMMDDtoMMDDYYYYwithSlashes } from 'utils/dateUtils';
import { storage } from 'utils/firebaseConfig';
import { getDownloadURL, ref } from 'firebase/storage';

interface ItemViewProps {
  item: ItemSafe;
  itemAttachmentList?: string[];
  modalOpen: Dispatch<SetStateAction<boolean>>;
  itemTypeStyling: (itemType: ItemType) => string;
}

export default function ItemView(props: ItemViewProps) {
  const { item, itemAttachmentList, itemTypeStyling } = props;
  const date_tz_insensitive = item.date_tz_insensitive ?? undefined;
  const date_tz_insensitive_end = item.date_tz_insensitive_end ?? undefined;
  const date_tz_sensitive = item.date_tz_sensitive
    ? new Date(item.date_tz_sensitive)
    : undefined;
  const date_tz_sensitive_end = item.date_tz_sensitive_end
    ? new Date(item.date_tz_sensitive_end)
    : undefined;
  const date_tz_sensitive_month = date_tz_sensitive
    ? date_tz_sensitive.getMonth() + 1
    : undefined;
  const date_tz_sensitive_day = date_tz_sensitive
    ? date_tz_sensitive.getDate()
    : undefined;
  const date_tz_sensitive_year = date_tz_sensitive
    ? date_tz_sensitive.getFullYear()
    : undefined;
  const date_tz_sensitive_hour = date_tz_sensitive
    ? date_tz_sensitive.getHours() % 12 || 12
    : undefined;
  const date_tz_sensitive_minute = date_tz_sensitive
    ? date_tz_sensitive.getMinutes() < 10
      ? `0${date_tz_sensitive.getMinutes()}`
      : date_tz_sensitive.getMinutes()
    : undefined;
  const date_tz_sensitive_end_month = date_tz_sensitive_end
    ? date_tz_sensitive_end.getMonth() + 1
    : undefined;
  const date_tz_sensitive_end_day = date_tz_sensitive_end
    ? date_tz_sensitive_end.getDate()
    : undefined;
  const date_tz_sensitive_end_year = date_tz_sensitive_end
    ? date_tz_sensitive_end.getFullYear()
    : undefined;
  const date_tz_sensitive_end_hour = date_tz_sensitive_end
    ? date_tz_sensitive_end.getHours() % 12 || 12
    : undefined;
  const date_tz_sensitive_end_minute = date_tz_sensitive_end
    ? date_tz_sensitive_end.getMinutes() < 10
      ? `0${date_tz_sensitive_end.getMinutes()}`
      : date_tz_sensitive_end.getMinutes()
    : undefined;
  const date_time_am_pm = date_tz_sensitive
    ? date_tz_sensitive.getHours() < 12
      ? 'AM'
      : 'PM'
    : undefined;
  const date_time_end_am_pm = date_tz_sensitive_end
    ? date_tz_sensitive_end.getHours() < 12
      ? 'AM'
      : 'PM'
    : undefined;
  const date_range_flag = item.date_range_flag;
  return (
    <div>
      <div className="flex flex-col mx-1 pl-1">
        <div className="flex flex-row items-center font-bold">
          <span className="text-lg mx-1">{item.name}</span>
        </div>
        <div className="flex flex-row py-1 items-center">
          <span
            className={`${`text-black ${itemTypeStyling(item.item_type)}`}
                )} text-xs px-2 py-1 cursor-pointer rounded-xl`}
          >
            {ItemType[item.item_type as keyof typeof ItemType]}
          </span>
        </div>
        <div className="flex flex-row items-center">
          <span className="text-sm mx-1 whitespace-pre-wrap">
            {item.description}
          </span>
        </div>
        {date_tz_insensitive && (
          <span className="flex flex-row items-center space-x-2">
            <TbCalendarEvent></TbCalendarEvent>
            <span className="text-sm">
              {dateStringYYYYMMDDtoMMDDYYYYwithSlashes(date_tz_insensitive)}
            </span>
            {date_range_flag && date_tz_insensitive_end && (
              <span className="flex flex-row space-x-2">
                <span className="text-sm">to</span>
                <span className="text-sm">
                  {dateStringYYYYMMDDtoMMDDYYYYwithSlashes(
                    date_tz_insensitive_end
                  )}
                </span>
              </span>
            )}
          </span>
        )}
        {date_tz_sensitive && (
          <span className="flex flex-row space-x-2 items-center">
            <span className="flex flex-col space-y-1">
              <span className="flex flex-row items-center space-x-2">
                <TbCalendarEvent></TbCalendarEvent>
                <span className="text-sm">
                  {date_tz_sensitive_month}/{date_tz_sensitive_day}/
                  {date_tz_sensitive_year}
                </span>
              </span>
              <span className="flex flex-row items-center space-x-2">
                <TbClock></TbClock>
                <span className="text-sm">
                  {date_tz_sensitive_hour}:{date_tz_sensitive_minute}{' '}
                  {date_time_am_pm}
                </span>
              </span>
            </span>
            {date_range_flag && date_tz_sensitive_end && (
              <span className="flex flex-row space-x-2">
                <span className="text-sm">to</span>
                <span className="flex flex-col space-y-1">
                  <span className="flex flex-row items-center space-x-2">
                    <TbCalendarEvent></TbCalendarEvent>
                    <span className="text-sm">
                      {date_tz_sensitive_end_month}/{date_tz_sensitive_end_day}/
                      {date_tz_sensitive_end_year}
                    </span>
                  </span>
                  <span className="flex flex-row items-center space-x-2">
                    <TbClock></TbClock>
                    <span className="text-sm">
                      {date_tz_sensitive_end_hour}:
                      {date_tz_sensitive_end_minute} {date_time_end_am_pm}
                    </span>
                  </span>
                </span>
              </span>
            )}
          </span>
        )}
        {itemAttachmentList != null && itemAttachmentList.length > 0 && (
          <div>
            <ul>
              {[...itemAttachmentList].map((path, index) => (
                <div key={index} className="flex">
                  <li className="truncate">
                    ({index + 1}) {path.split('/')[2]}
                  </li>
                  <span
                    className="hover:bg-stone-700 rounded-xl p-1"
                    onClick={() => downloadSelectedFile(path)}
                  >
                    <TbArrowBarToDown />
                  </span>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  async function downloadSelectedFile(path: string) {
    getDownloadURL(ref(storage, path))
      .then((url) => {
        let alink = document.createElement('a');
        alink.href = url;
        alink.target = '_blank';
        alink.download = path.split('/')[2];
        alink.click();
      })
      .catch((error) => {
        console.log('error downloading file from firestore: ', error);
      });
  }
}
