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
import {
  SpringItemApiRoutes,
  SpringListApiRoutes,
} from 'lib/api/spring_api_routes';

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
      if (item.permissionLevel === VisibilityLevel.PRIVATE) return true;
      else return false;
    }
  );
  const [timeControlChecked, setTimeControlChecked] = useState(() => {
    if (item.timeSensitiveFlag) return true;
    else return false;
  });
  const [dateRangeControlChecked, setDateRangeControlChecked] = useState(() => {
    if (item.dateRangeFlag) return true;
    else return false;
  });

  const [datePart, setDatePart] = useState(() => {
    if (item.timeSensitiveFlag) {
      const date = dateToYYYYMMDD(item.dateTzSensitive ?? new Date(Date.now()));
      return date;
    } else {
      return item.dateTzInsensitive ?? dateToYYYYMMDD(new Date(Date.now()));
    }
  });
  const [timePart, setTimePart] = useState(() => {
    const time = () => {
      if (item.dateTzSensitive) {
        return getTimeHourMinuteString(item.dateTzSensitive);
      } else {
        return getTimeCeiling(new Date(Date.now()), 30);
      }
    };
    return time();
  });
  const [datePartEnd, setDatePartEnd] = useState(() => {
    if (item.timeSensitiveFlag) {
      const date = dateToYYYYMMDD(
        item.dateTzSensitiveEnd ?? new Date(Date.now())
      );
      return date;
    } else {
      return item.dateTzInsensitiveEnd ?? dateToYYYYMMDD(new Date(Date.now()));
    }
  });
  const [timePartEnd, setTimePartEnd] = useState(() => {
    const time = () => {
      if (item.dateTzSensitiveEnd) {
        return getTimeHourMinuteString(item.dateTzSensitiveEnd);
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
    categoryId: item.categoryId,
    itemType: ItemType[item.itemType as keyof typeof ItemType],
    dateTzInsensitive: item.dateTzInsensitive,
    dateTzInsensitiveEnd: item.dateTzInsensitiveEnd,
    timeSensitiveFlag: item.timeSensitiveFlag,
    dateTzSensitive: item.dateTzSensitive,
    dateTzSensitiveEnd: item.dateTzSensitiveEnd,
    dateRangeFlag: item.dateRangeFlag,
    permissionLevel:
      VisibilityLevel[item.permissionLevel as keyof typeof VisibilityLevel],
    itemPermissions: [],
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
        url: SpringListApiRoutes.LIST_GET_USERS,
        params: {
          listId: item.categoryId,
        },
        withCredentials: true,
      }).then((res) => {
        setUsersWithPermissionToList(res.data);
        const resDataMapped: CheckDataItem[] = res.data.map(
          (user: UsersWithPermissionForList) => {
            return {
              userId: user.id,
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
        url: SpringItemApiRoutes.ITEM_GET_PERMISSIONS,
        params: {
          itemId: item.id,
        },
        withCredentials: true,
      }).then((res) => {
        const itemPermissionsMappedIsChecked: CheckDataItem[] = res.data.map(
          (user: CheckDataItem) => {
            return {
              userId: user.userId,
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
        if (itemPermissions.find((item) => item.userId === user.userId)) {
          return {
            userId: user.userId,
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
        itemPermissions: usersWithPermissionToListMapped.filter(
          (user) => user.isChecked
        ),
      };
    });
  }, [usersWithPermissionToListMapped]);

  useEffect(() => {
    if (visibilityControlCheck) {
      setEditModeFormValues((prevState) => {
        return { ...prevState, permissionLevel: VisibilityLevel.PRIVATE };
      });
    } else {
      setEditModeFormValues((prevState) => {
        return { ...prevState, permissionLevel: VisibilityLevel.PUBLIC };
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
          timeSensitiveFlag: true,
          dateTzSensitive: newDate,
          dateTzSensitiveEnd: newDateEnd,
        };
      });
    } else {
      setEditModeFormValues((prevState) => {
        return {
          ...prevState,
          timeSensitiveFlag: false,
          dateTzInsensitive: datePart,
          dateTzInsensitiveEnd: datePartEnd,
        };
      });
    }
  }, [datePart, datePartEnd, timeControlChecked, timePart, timePartEnd]);

  const yupValidationSchema = Yup.object({
    id: Yup.number().required(),
    name: Yup.string().required('name is required'),
    category: Yup.mixed<Category>().oneOf(Object.values(Category)),
    categoryId: editModeFormValues.category
      ? Yup.number().required()
      : Yup.number(),
    itemType: Yup.mixed<ItemType>()
      .oneOf(Object.values(ItemType))
      .default(ItemType.ASSIGNMENT),
    permissionLevel: Yup.mixed<VisibilityLevel>()
      .oneOf(Object.values(VisibilityLevel))
      .default(VisibilityLevel.PUBLIC),
    description: Yup.string(),
    dateTzSensitive: timeControlChecked ? Yup.date() : Yup.date(),
    dateTzSensitiveEnd: timeControlChecked
      ? dateRangeControlChecked
        ? Yup.date()
            .min(
              Yup.ref('dateTzSensitive'),
              'end date must be after start date'
            )
            .required('end date is required')
        : Yup.date()
      : Yup.date(),
    timeSensitiveFlag: Yup.boolean().required(),
    dateRangeFlag: Yup.boolean().required(),
    dateTzInsensitive: timeControlChecked
      ? Yup.string()
      : Yup.string().required('date is required'),
    dateTzInsensitiveEnd: timeControlChecked
      ? Yup.string()
      : dateRangeControlChecked
      ? Yup.string()
          .test(
            'compare-dates-no-time',
            'end date must be after start date',
            function () {
              return dateRangeValid(
                this.parent['dateTzInsensitive'],
                this.parent['dateTzInsensitiveEnd']
              );
            }
          )
          .required('end date is required')
      : Yup.string(),
    lastModifiedById: Yup.number(),
    itemPermissions: Yup.array().of(
      Yup.object({
        userId: Yup.number().required(),
        isChecked: Yup.boolean().required(),
      })
    ),
  });

  const [yupValidationError, setYupValidationError] =
    useState<ItemEditYupValidationError>({
      id: false,
      name: false,
      category: false,
      categoryId: false,
      itemType: false,
      permissionLevel: false,
      description: false,
      dateTzSensitive: false,
      dateTzSensitiveEnd: false,
      timeTzSensitive: false,
      timeTzSensitiveEnd: false,
      timeSensitiveFlag: false,
      dateRangeFlag: false,
      dateTzInsensitive: false,
      dateTzInsensitiveEnd: false,
      lastModifiedById: false,
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
              editModeFormValues.itemType ==
              ItemType[key as keyof typeof ItemType]
                ? `text-black ${itemTypeStyling(editModeFormValues.itemType)}`
                : 'bg-stone-800 hover:bg-stone-700 text-white'
            }
            )} text-xs px-2 py-1 cursor-pointer my-0.5 mr-0.5 rounded-xl`}
            onClick={() =>
              setEditModeFormValues({
                ...editModeFormValues,
                itemType: ItemType[key as keyof typeof ItemType],
              })
            }
          >
            {key}
          </span>
        ))}
        {yupValidationError.itemType && (
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
