import { ItemSafe, ItemType } from 'lib/types/item';
import { Dispatch, SetStateAction } from 'react';
import { TbArrowBarToDown, TbCalendarEvent, TbClock } from 'react-icons/tb';
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
  const dateTzInsensitive = item.dateTzInsensitive ?? undefined;
  const dateTzInsensitiveEnd = item.dateTzInsensitiveEnd ?? undefined;
  const dateTzSensitive = item.dateTzSensitive
    ? new Date(item.dateTzSensitive)
    : undefined;
  const dateTzSensitiveEnd = item.dateTzSensitiveEnd
    ? new Date(item.dateTzSensitiveEnd)
    : undefined;
  const dateTzSensitiveMonth = dateTzSensitive
    ? dateTzSensitive.getMonth() + 1
    : undefined;
  const dateTzSensitiveDay = dateTzSensitive
    ? dateTzSensitive.getDate()
    : undefined;
  const dateTzSensitiveYear = dateTzSensitive
    ? dateTzSensitive.getFullYear()
    : undefined;
  const dateTzSensitiveHour = dateTzSensitive
    ? dateTzSensitive.getHours() % 12 || 12
    : undefined;
  const dateTzSensitiveMinute = dateTzSensitive
    ? dateTzSensitive.getMinutes() < 10
      ? `0${dateTzSensitive.getMinutes()}`
      : dateTzSensitive.getMinutes()
    : undefined;
  const dateTzSensitiveEndMonth = dateTzSensitiveEnd
    ? dateTzSensitiveEnd.getMonth() + 1
    : undefined;
  const dateTzSensitiveEndDay = dateTzSensitiveEnd
    ? dateTzSensitiveEnd.getDate()
    : undefined;
  const dateTzSensitiveEndYear = dateTzSensitiveEnd
    ? dateTzSensitiveEnd.getFullYear()
    : undefined;
  const dateTzSensitiveEndHour = dateTzSensitiveEnd
    ? dateTzSensitiveEnd.getHours() % 12 || 12
    : undefined;
  const dateTzSensitiveEndMinute = dateTzSensitiveEnd
    ? dateTzSensitiveEnd.getMinutes() < 10
      ? `0${dateTzSensitiveEnd.getMinutes()}`
      : dateTzSensitiveEnd.getMinutes()
    : undefined;
  const dateTimeAmPm = dateTzSensitive
    ? dateTzSensitive.getHours() < 12
      ? 'AM'
      : 'PM'
    : undefined;
  const dateTimeEndAmPm = dateTzSensitiveEnd
    ? dateTzSensitiveEnd.getHours() < 12
      ? 'AM'
      : 'PM'
    : undefined;
  const dateRangeFlag = item.dateRangeFlag;
  return (
    <div>
      <div className="flex flex-col mx-1 pl-1">
        <div className="flex flex-row items-center font-bold">
          <span className="text-lg mx-1">{item.name}</span>
        </div>
        <div className="flex flex-row py-1 items-center">
          <span
            className={`${`text-black ${itemTypeStyling(item.itemType)}`}
                )} text-xs px-2 py-1 cursor-pointer rounded-xl`}
          >
            {ItemType[item.itemType as keyof typeof ItemType]}
          </span>
        </div>
        <div className="flex flex-row items-center">
          <span className="text-sm mx-1 whitespace-pre-wrap">
            {item.description}
          </span>
        </div>
        {dateTzInsensitive && (
          <span className="flex flex-row items-center space-x-2">
            <TbCalendarEvent></TbCalendarEvent>
            <span className="text-sm">
              {dateStringYYYYMMDDtoMMDDYYYYwithSlashes(dateTzInsensitive)}
            </span>
            {dateRangeFlag && dateTzInsensitiveEnd && (
              <span className="flex flex-row space-x-2">
                <span className="text-sm">to</span>
                <span className="text-sm">
                  {dateStringYYYYMMDDtoMMDDYYYYwithSlashes(
                    dateTzInsensitiveEnd
                  )}
                </span>
              </span>
            )}
          </span>
        )}
        {dateTzSensitive && (
          <span className="flex flex-row space-x-2 items-center">
            <span className="flex flex-col space-y-1">
              <span className="flex flex-row items-center space-x-2">
                <TbCalendarEvent></TbCalendarEvent>
                <span className="text-sm">
                  {dateTzSensitiveMonth}/{dateTzSensitiveDay}/
                  {dateTzSensitiveYear}
                </span>
              </span>
              <span className="flex flex-row items-center space-x-2">
                <TbClock></TbClock>
                <span className="text-sm">
                  {dateTzSensitiveHour}:{dateTzSensitiveMinute} {dateTimeAmPm}
                </span>
              </span>
            </span>
            {dateRangeFlag && dateTzSensitiveEnd && (
              <span className="flex flex-row space-x-2">
                <span className="text-sm">to</span>
                <span className="flex flex-col space-y-1">
                  <span className="flex flex-row items-center space-x-2">
                    <TbCalendarEvent></TbCalendarEvent>
                    <span className="text-sm">
                      {dateTzSensitiveEndMonth}/{dateTzSensitiveEndDay}/
                      {dateTzSensitiveEndYear}
                    </span>
                  </span>
                  <span className="flex flex-row items-center space-x-2">
                    <TbClock></TbClock>
                    <span className="text-sm">
                      {dateTzSensitiveEndHour}:{dateTzSensitiveEndMinute}{' '}
                      {dateTimeEndAmPm}
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
