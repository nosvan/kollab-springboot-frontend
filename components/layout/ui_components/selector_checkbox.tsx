import { CheckDataItem, UsersWithPermissionForList } from 'lib/types/list';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'state/redux/store';

interface SelectorCheckboxProps {
  data: UsersWithPermissionForList[];
  selected: CheckDataItem[];
  setSelected: Dispatch<SetStateAction<CheckDataItem[]>>;
}

export default function SelectorCheckbox(props: SelectorCheckboxProps) {
  const { data, selected, setSelected } = props;
  const userStore = useSelector((state: RootState) => state.user_store);
  return (
    <div className={`w-full h-fit p-1`}>
      <div className="flex flex-row items-center">
        {data.map((item: UsersWithPermissionForList) => (
          <div
            className="flex flex-row items-center space-x-1 bg-stone-800 cursor-pointer mr-1 px-1 rounded-xl"
            key={item.user_id}
          >
            <input
              type="checkbox"
              className="checkbox checkbox-xs"
              checked={
                selected.find(
                  (userCheckedOrNot) =>
                    userCheckedOrNot.user_id === item.user_id
                )?.isChecked
                  ? true
                  : false
              }
              id={item.user_id.toString()}
              onChange={() => {
                setSelected([
                  ...selected.map((checkItem) => {
                    if (checkItem.user_id === item.user_id) {
                      return {
                        ...checkItem,
                        isChecked: !checkItem.isChecked,
                      };
                    }
                    return checkItem;
                  }),
                ]);
              }}
            />
            <label htmlFor={item.user_id.toString()}>
              {userStore.user.id === item.user_id
                ? 'self'
                : `${item.first_name} ${item.last_name}`}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
