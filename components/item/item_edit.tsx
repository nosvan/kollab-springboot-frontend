import axios from 'axios';
import SelectorCheckbox from 'components/layout/ui_components/selector_checkbox';
import ToggleSwitch from 'components/layout/ui_components/toggle_switch';
import { ItemApiRoutes, ListApiRoutes, OwnApiRoutes } from 'lib/api/api_routes';
import {
  Category,
  EditItem,
  ItemEditYupValidationError,
  ItemSafe,
  ItemType,
  VisibilityLevel,
} from 'lib/types/item';
import { CheckDataItem, UsersWithPermissionForList } from 'lib/types/list';
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  dateRangeValid,
  dateToYYYYMMDD,
  getTimeCeiling,
  getTimeHourMinuteString,
} from 'utils/dateUtils';
import * as Yup from 'yup';
import {
  matchYupErrorStateWithCompErrorState,
  trimStringsInObjectShallow,
} from 'utils/formValidateUtils';
import { DateInputsEdit } from './date_inputs_edit';
import { ItemMode } from 'lib/types/ui';
import { useDispatch } from 'react-redux';
import {
  setAdditionalListItems,
  setCurrentListItem,
} from 'state/redux/listSlice';
import { setAdditionalOwnItems, setCurrentOwnItem } from 'state/redux/ownSlice';
import styles from './item_edit.module.css';
import { TbArrowBarToDown, TbPaperclip } from 'react-icons/tb';
import { uploadAttachments } from './create_item';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from 'utils/firebaseConfig';

interface ItemEditProps {
  item: ItemSafe;
  activeStatus: boolean;
  itemAttachmentsList: string[];
  setItemMode: Dispatch<SetStateAction<ItemMode>>;
  itemTypeStyling: (itemType: ItemType) => string;
}

export default function ItemEdit(props: ItemEditProps) {
  const {
    item,
    setItemMode,
    itemTypeStyling,
    activeStatus,
    itemAttachmentsList,
  } = props;
  const dispatch = useDispatch();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [visibilityControlCheck, setVisibilityControlCheck] = useState<boolean>(
    () => {
      if (item.permission_level === VisibilityLevel.PRIVATE) return true;
      else return false;
    }
  );
  const [timeControlChecked, setTimeControlChecked] = useState(() => {
    if (item.time_sensitive_flag) return true;
    else return false;
  });
  const [dateRangeControlChecked, setDateRangeControlChecked] = useState(() => {
    if (item.date_range_flag) return true;
    else return false;
  });

  const [datePart, setDatePart] = useState(() => {
    if (item.time_sensitive_flag) {
      const date = dateToYYYYMMDD(
        item.date_tz_sensitive ?? new Date(Date.now())
      );
      return date;
    } else {
      return item.date_tz_insensitive ?? dateToYYYYMMDD(new Date(Date.now()));
    }
  });
  const [timePart, setTimePart] = useState(() => {
    const time = () => {
      if (item.date_tz_sensitive) {
        return getTimeHourMinuteString(item.date_tz_sensitive);
      } else {
        return getTimeCeiling(new Date(Date.now()), 30);
      }
    };
    return time();
  });
  const [datePartEnd, setDatePartEnd] = useState(() => {
    if (item.time_sensitive_flag) {
      const date = dateToYYYYMMDD(
        item.date_tz_sensitive_end ?? new Date(Date.now())
      );
      return date;
    } else {
      return (
        item.date_tz_insensitive_end ?? dateToYYYYMMDD(new Date(Date.now()))
      );
    }
  });
  const [timePartEnd, setTimePartEnd] = useState(() => {
    const time = () => {
      if (item.date_tz_sensitive_end) {
        return getTimeHourMinuteString(item.date_tz_sensitive_end);
      } else {
        return getTimeCeiling(new Date(Date.now()), 30);
      }
    };
    return time();
  });

  const [usersWithPermissionToList, setUsersWithPermissionToList] = useState<
    UsersWithPermissionForList[]
  >([]);
  const [usersWithPermissionToListMapped, setUsersWithPermissionToListMapped] =
    useState<CheckDataItem[]>([]);
  const [itemPermissions, setItemPermissions] = useState<CheckDataItem[]>([]);

  const [editModeFormValues, setEditModeFormValues] = useState<EditItem>({
    id: item.id,
    name: item.name,
    description: item.description,
    category: item.category,
    category_id: item.category_id,
    item_type: ItemType[item.item_type as keyof typeof ItemType],
    date_tz_insensitive: item.date_tz_insensitive,
    date_tz_insensitive_end: item.date_tz_insensitive_end,
    time_sensitive_flag: item.time_sensitive_flag,
    date_tz_sensitive: item.date_tz_sensitive,
    date_tz_sensitive_end: item.date_tz_sensitive_end,
    date_range_flag: item.date_range_flag,
    permission_level:
      VisibilityLevel[item.permission_level as keyof typeof VisibilityLevel],
    item_permissions: [],
    active: activeStatus,
  });

  const [fileSelected, setFileSelected] = useState<File[] | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [filesAttached, setFilesAttached] =
    useState<string[]>(itemAttachmentsList);

  useEffect(() => {
    setEditModeFormValues((prevState) => {
      let form = prevState;
      form.active = activeStatus;
      return form;
    });
  }, [activeStatus]);

  function focus() {
    if (fileInput.current) {
      fileInput.current.click();
    }
  }

  function handleFileSelected(e: SyntheticEvent) {
    e.preventDefault();
    const target = e.currentTarget as HTMLInputElement;
    if (target.files !== null) {
      console.log(target.files);
      setFileSelected([...target.files]);
    } else {
      setFileSelected(null);
    }
  }

  useEffect(() => {
    if (fileSelected != null) {
      uploadAttachments(fileSelected, item);
    }
  }, [fileSelected, item]);

  useEffect(() => {
    const listRef = ref(storage, `item-attachments/${item.id}`);
    const attachmentNames: string[] = [];
    listAll(listRef)
      .then((res) => {
        console.log('items from firestore: ', res.items);
        res.items.forEach((itemRef) => {
          attachmentNames.push(itemRef.fullPath);
        });
        setFilesAttached(attachmentNames);
      })
      .catch((error) => {
        console.log('error getting attachments list from firestore: ', error);
      });
  }, [fileSelected, item]);

  useEffect(() => {
    async function getListUsers() {
      await axios({
        method: 'get',
        url: ListApiRoutes.LIST_USERS,
        params: {
          list_id: item.category_id,
        },
      }).then((res) => {
        setUsersWithPermissionToList(res.data);
        const resDataMapped: CheckDataItem[] = res.data.map(
          (user: UsersWithPermissionForList) => {
            return {
              user_id: user.user_id,
              isChecked: false,
            };
          }
        );
        setUsersWithPermissionToListMapped(resDataMapped);
      });
    }
    if (item.category) getListUsers();
    async function getItemPermissions() {
      await axios({
        method: 'get',
        url: ItemApiRoutes.GET_ITEM_PERMISSIONS,
        params: {
          item_id: item.id,
        },
      }).then((res) => {
        const itemPermissionsMappedIsChecked: CheckDataItem[] = res.data.map(
          (user: CheckDataItem) => {
            return {
              user_id: user.user_id,
              isChecked: true,
            };
          }
        );
        setItemPermissions(itemPermissionsMappedIsChecked);
      });
    }
    getItemPermissions();
  }, [item]);

  useEffect(() => {
    setUsersWithPermissionToListMapped((prevState) => {
      return prevState.map((user) => {
        if (itemPermissions.find((item) => item.user_id === user.user_id)) {
          return {
            user_id: user.user_id,
            isChecked: true,
          };
        }
        return user;
      });
    });
  }, [itemPermissions]);

  useEffect(() => {
    setEditModeFormValues((prevState) => {
      return {
        ...prevState,
        item_permissions: usersWithPermissionToListMapped.filter(
          (user) => user.isChecked
        ),
      };
    });
  }, [usersWithPermissionToListMapped]);

  useEffect(() => {
    if (visibilityControlCheck) {
      setEditModeFormValues((prevState) => {
        return { ...prevState, permission_level: VisibilityLevel.PRIVATE };
      });
    } else {
      setEditModeFormValues((prevState) => {
        return { ...prevState, permission_level: VisibilityLevel.PUBLIC };
      });
    }
  }, [visibilityControlCheck]);

  useEffect(() => {
    if (timeControlChecked) {
      const newDate = new Date(`${datePart}T${timePart}`);
      const newDateEnd = new Date(`${datePartEnd}T${timePartEnd}`);
      setEditModeFormValues((prevState) => {
        return {
          ...prevState,
          time_sensitive_flag: true,
          date_tz_sensitive: newDate,
          date_tz_sensitive_end: newDateEnd,
        };
      });
    } else {
      setEditModeFormValues((prevState) => {
        return {
          ...prevState,
          time_sensitive_flag: false,
          date_tz_insensitive: datePart,
          date_tz_insensitive_end: datePartEnd,
        };
      });
    }
  }, [datePart, datePartEnd, timeControlChecked, timePart, timePartEnd]);

  const yupValidationSchema = Yup.object({
    id: Yup.number().required(),
    name: Yup.string().required('name is required'),
    category: Yup.mixed<Category>().oneOf(Object.values(Category)),
    category_id: editModeFormValues.category
      ? Yup.number().required()
      : Yup.number(),
    item_type: Yup.mixed<ItemType>()
      .oneOf(Object.values(ItemType))
      .default(ItemType.ASSIGNMENT),
    permission_level: Yup.mixed<VisibilityLevel>()
      .oneOf(Object.values(VisibilityLevel))
      .default(VisibilityLevel.PUBLIC),
    description: Yup.string(),
    date_tz_sensitive: timeControlChecked ? Yup.date() : Yup.date(),
    date_tz_sensitive_end: timeControlChecked
      ? dateRangeControlChecked
        ? Yup.date()
            .min(
              Yup.ref('date_tz_sensitive'),
              'end date must be after start date'
            )
            .required('end date is required')
        : Yup.date()
      : Yup.date(),
    time_sensitive_flag: Yup.boolean().required(),
    date_range_flag: Yup.boolean().required(),
    date_tz_insensitive: timeControlChecked
      ? Yup.string()
      : Yup.string().required('date is required'),
    date_tz_insensitive_end: timeControlChecked
      ? Yup.string()
      : dateRangeControlChecked
      ? Yup.string()
          .test(
            'compare-dates-no-time',
            'end date must be after start date',
            function () {
              return dateRangeValid(
                this.parent['date_tz_insensitive'],
                this.parent['date_tz_insensitive_end']
              );
            }
          )
          .required('end date is required')
      : Yup.string(),
    last_modified_by_id: Yup.number(),
    item_permissions: Yup.array().of(
      Yup.object({
        user_id: Yup.number().required(),
        isChecked: Yup.boolean().required(),
      })
    ),
  });

  const [yupValidationError, setYupValidationError] =
    useState<ItemEditYupValidationError>({
      id: false,
      name: false,
      category: false,
      category_id: false,
      item_type: false,
      permission_level: false,
      description: false,
      date_tz_sensitive: false,
      date_tz_sensitive_end: false,
      time_tz_sensitive: false,
      time_tz_sensitive_end: false,
      time_sensitive_flag: false,
      date_range_flag: false,
      date_tz_insensitive: false,
      date_tz_insensitive_end: false,
      last_modified_by_id: false,
    });

  return (
    <div className="flex flex-col space-y-1 mx-1 pl-1">
      <span className="flex flex-row items-center">
        <input
          className={`flex-wrap text-white bg-stone-800 hover:bg-stone-700 w-full font-bold p-1 rounded-xl`}
          value={editModeFormValues.name}
          onFocus={() =>
            setYupValidationError({ ...yupValidationError, name: false })
          }
          onChange={(event) =>
            setEditModeFormValues({
              ...editModeFormValues,
              name: event.target.value,
            })
          }
        />
      </span>
      {yupValidationError.name && (
        <span className={`${styles['field-error-styling']}`}>required</span>
      )}
      <div className="flex flex-row flex-wrap items-center">
        {Object.keys(ItemType).map((key) => (
          <span
            key={key}
            className={`${
              editModeFormValues.item_type ==
              ItemType[key as keyof typeof ItemType]
                ? `text-black ${itemTypeStyling(editModeFormValues.item_type)}`
                : 'bg-stone-800 hover:bg-stone-700 text-white'
            }
            )} text-xs px-2 py-1 cursor-pointer my-0.5 mr-0.5 rounded-xl`}
            onClick={() =>
              setEditModeFormValues({
                ...editModeFormValues,
                item_type: ItemType[key as keyof typeof ItemType],
              })
            }
          >
            {key}
          </span>
        ))}
        {yupValidationError.item_type && (
          <span className={`${styles['field-error-styling']}`}>required</span>
        )}
      </div>
      <div className="flex flex-col">
        <label className="w-full text-white px-1">info</label>
        <textarea
          ref={textAreaRef}
          className="text-white bg-stone-800 hover:bg-stone-700 px-2 rounded-xl"
          value={editModeFormValues.description}
          onChange={(event) =>
            setEditModeFormValues({
              ...editModeFormValues,
              description: event.target.value,
            })
          }
        />
      </div>
      {item.category && (
        <div className="flex flex-col space-y-1">
          <span className="flex flex-row items-center space-x-1">
            <label className="text-white px-1">control visibility</label>
            <ToggleSwitch
              isChecked={visibilityControlCheck}
              setIsChecked={setVisibilityControlCheck}
            ></ToggleSwitch>
          </span>
          {visibilityControlCheck && (
            <SelectorCheckbox
              data={usersWithPermissionToList}
              selected={usersWithPermissionToListMapped}
              setSelected={setUsersWithPermissionToListMapped}
            ></SelectorCheckbox>
          )}
        </div>
      )}
      <div className="flex flex-col space-y-1">
        <span className="flex flex-col space-y-1">
          <span className="flex flex-row space-x-1 ">
            <label className="text-white px-1">time</label>
            <ToggleSwitch
              isChecked={timeControlChecked}
              setIsChecked={setTimeControlChecked}
            ></ToggleSwitch>
          </span>
        </span>
        <span>
          <DateInputsEdit
            formValues={editModeFormValues}
            setFormValues={setEditModeFormValues}
            yupValidationError={yupValidationError}
            setYupValidationError={setYupValidationError}
            timeControlChecked={timeControlChecked}
            dateRangeControlChecked={dateRangeControlChecked}
            datePart={datePart}
            setDatePart={setDatePart}
            datePartEnd={datePartEnd}
            setDatePartEnd={setDatePartEnd}
            timePart={timePart}
            setTimePart={setTimePart}
            timePartEnd={timePartEnd}
            setTimePartEnd={setTimePartEnd}
          ></DateInputsEdit>
        </span>
      </div>
      <div>
        <input
          type="file"
          id="file"
          accept=".jpg,.jpeg,.png,.pdf,.json,.txt"
          className="hidden"
          multiple
          ref={fileInput}
          onChange={(e) => handleFileSelected(e)}
        ></input>
        <div className="flex">
          <span className="hover:bg-stone-700 rounded-xl p-1">
            <label onClick={() => focus()}>
              <TbPaperclip />
            </label>
          </span>
        </div>
      </div>
      {filesAttached != null && filesAttached.length > 0 && (
        <div>
          <ul>
            {[...filesAttached].map((path, index) => (
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
      <div className="flex flex-row justify-start text-center text-sm space-x-2">
        <div
          className="bg-stone-900 border-2 border-white hover:bg-stone-800 hover:border-stone-300
              text-white rounded-xl px-2 cursor-pointer"
          onClick={() => setItemMode(ItemMode.VIEW)}
        >
          Cancel
        </div>
        <button
          onClick={handleCreateItemFormSubmit}
          className="bg-blue-700 hover:bg-blue-600 border-2 border-blue-700 hover:border-blue-600 px-3 rounded-xl text-white"
        >
          Save
        </button>
      </div>
    </div>
  );

  async function handleCreateItemFormSubmit() {
    trimStringsInObjectShallow(editModeFormValues);
    let yupValidateResult = await yupValidationSchema
      .validate(editModeFormValues, { abortEarly: false })
      .catch((err) => {
        console.log(err.errors);
        matchYupErrorStateWithCompErrorState(err.inner, yupValidationError);
        setYupValidationError({ ...yupValidationError });
      });
    if (!yupValidateResult) return;
    await editItemApi(editModeFormValues);
  }

  async function editItemApi(formValues: EditItem) {
    if (item.category) {
      try {
        await axios({
          method: 'POST',
          url: ListApiRoutes.EDIT_ITEM,
          data: JSON.stringify(formValues),
          headers: { 'Content-Type': 'application/json' },
        }).then((res) => {
          if (res.data.length > 0 && res.data[0].category === Category.LIST) {
            dispatch(setAdditionalListItems(res.data));
            dispatch(setCurrentListItem(res.data[0]));
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios({
          method: 'POST',
          url: OwnApiRoutes.EDIT_ITEM,
          data: JSON.stringify(formValues),
          headers: { 'Content-Type': 'application/json' },
        }).then((res) => {
          if (res.data.length > 0) {
            dispatch(setAdditionalOwnItems(res.data));
            dispatch(setCurrentOwnItem(res.data[0]));
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
    setItemMode(ItemMode.VIEW);
  }

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
