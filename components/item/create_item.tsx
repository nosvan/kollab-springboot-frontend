import axios from 'axios';
import {
  VisibilityLevel,
  Category,
  CreateItem,
  ItemType,
  ItemYupValidationError,
  ItemSafe,
} from 'lib/types/item';
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAdditionalListItems } from 'state/redux/listSlice';
import { RootState } from 'state/redux/store';
import 'react-datepicker/dist/react-datepicker.css';
import { setAdditionalOwnItems } from 'state/redux/ownSlice';
import ToggleSwitch from 'components/layout/ui_components/toggle_switch';
import { UserSliceState } from 'lib/types/user';
import styles from './create_item.module.css';
import * as Yup from 'yup';
import {
  matchYupErrorStateWithCompErrorState,
  trimStringsInObjectShallow,
} from 'utils/formValidateUtils';
import { dateRangeValid, dateToYYYYMMDD } from 'utils/dateUtils';
import { FooterInputs } from './footer_inputs';
import { getTimeCeiling } from 'utils/dateUtils';
import { DateInputs } from './date_inputs';
import { ListApiRoutes, OwnApiRoutes } from 'lib/api/api_routes';
import SelectorCheckbox from 'components/layout/ui_components/selector_checkbox';
import { CheckDataItem, UsersWithPermissionForList } from 'lib/types/list';
import { TbPaperclip, TbX } from 'react-icons/tb';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'utils/firebaseConfig';
import { SpringItemApiRoutes } from 'lib/api/spring_api_routes';

interface NewItemProps {
  selectedDate?: Date;
  itemCategory?: Category;
  setCreateNewItemMode: Dispatch<SetStateAction<boolean>>;
}

export async function uploadAttachments(files: File[], item: ItemSafe) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!(file instanceof File)) continue;
    const storageRef = ref(storage, `item-attachments/${item.id}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot: {
        bytesTransferred: number;
        totalBytes: number;
        state: any;
      }) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error: any) => {
        console.log('error uploading attachment\n', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  }
}

export default function NewItem(props: NewItemProps) {
  const { selectedDate, itemCategory, setCreateNewItemMode } = props;
  const dispatch = useDispatch();

  const listState = useSelector((state: RootState) => state.list_store.list);

  const userState: UserSliceState = useSelector(
    (state: RootState) => state.user_store
  );

  const [visibilityControlCheck, setVisibilityControlCheck] = useState(false);
  const [timeControlChecked, setTimeControlChecked] = useState(false);
  const [dateRangeControlChecked, setDateRangeControlChecked] = useState(false);
  const [selectedDateForNewItemFormattedYYYYMMDD] = useState(() =>
    dateToYYYYMMDD(selectedDate ?? new Date())
  );

  const [datePart, setDatePart] = useState(
    selectedDateForNewItemFormattedYYYYMMDD
  );
  const [timePart, setTimePart] = useState(() =>
    getTimeCeiling(new Date(), 30)
  );
  const [datePartEnd, setDatePartEnd] = useState(
    selectedDateForNewItemFormattedYYYYMMDD
  );
  const [timePartEnd, setTimePartEnd] = useState(() =>
    getTimeCeiling(new Date(), 30, 30)
  );

  const [selectedDateForNewItem] = useState(() => {
    if (selectedDate) {
      return selectedDate;
    }
    return new Date();
  });

  const initialFormState: CreateItem = {
    name: '',
    category: itemCategory ?? undefined,
    categoryId: itemCategory ? getCategoryId() : undefined,
    description: undefined,
    itemType: ItemType.GENERAL,
    dateTzSensitive: selectedDateForNewItem,
    dateTzSensitiveEnd: selectedDateForNewItem,
    timeSensitiveFlag: timeControlChecked,
    dateRangeFlag: dateRangeControlChecked,
    dateTzInsensitive: selectedDateForNewItemFormattedYYYYMMDD,
    dateTzInsensitiveEnd: selectedDateForNewItemFormattedYYYYMMDD,
    lastModifiedBy: userState.user.id,
    permissionLevel: itemCategory
      ? VisibilityLevel.PUBLIC
      : VisibilityLevel.PRIVATE,
    itemPermissions: undefined,
  };

  const [formValues, setFormValues] = useState<CreateItem>(initialFormState);
  const [usersWithPermission, setUsersWithPermission] = useState<
    UsersWithPermissionForList[]
  >([]);
  const [usersWithPermissionMapped, setUsersWithPermissionMapped] = useState<
    CheckDataItem[]
  >([]);

  const [fileSelected, setFileSelected] = useState<File[] | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  function handleFileSelected(e: SyntheticEvent) {
    e.preventDefault();
    const target = e.currentTarget as HTMLInputElement;
    if (target.files !== null) {
      setFileSelected([...target.files]);
    } else {
      setFileSelected(null);
    }
  }

  function removeFileFromSelected(fileArgument: File) {
    if (fileSelected == null) return;
    const alteredFileSelected = fileSelected.filter(
      (file) => file.name !== fileArgument.name
    );
    setFileSelected([...alteredFileSelected]);
  }

  function focus() {
    if (fileInput.current) {
      fileInput.current.click();
    }
  }

  useEffect(() => {
    if (fileSelected) console.log('fileSelected altered ', fileSelected);
  }, [fileSelected]);

  useEffect(() => {
    if (timeControlChecked) {
      const newDate = new Date(`${datePart}T${timePart}`);
      const newDateEnd = new Date(`${datePartEnd}T${timePartEnd}`);
      setFormValues((prevState) => {
        return {
          ...prevState,
          timeSensitiveFlag: true,
          dateTzSensitive: newDate,
          dateTzSensitiveEnd: newDateEnd,
        };
      });
    } else {
      setFormValues((prevState) => {
        return {
          ...prevState,
          timeSensitiveFlag: false,
          dateTzInsensitive: datePart,
          dateTzInsensitiveEnd: datePartEnd,
        };
      });
    }
  }, [datePart, datePartEnd, timeControlChecked, timePart, timePartEnd]);

  useEffect(() => {
    setFormValues((prevState) => {
      return {
        ...prevState,
        dateRangeFlag: dateRangeControlChecked,
      };
    });
  }, [dateRangeControlChecked]);

  useEffect(() => {
    if (!visibilityControlCheck) {
      setFormValues((prevState) => {
        return {
          ...prevState,
          permissionLevel: VisibilityLevel.PUBLIC,
        };
      });
    }
    async function getListUsers() {
      await axios({
        method: 'get',
        url: ListApiRoutes.LIST_USERS,
        params: {
          list_id: listState.id,
        },
      }).then((res) => {
        setUsersWithPermission(res.data);
        const mappedResData = res.data.map(
          (user: UsersWithPermissionForList) => {
            return {
              userId: user.userId,
              isChecked: false,
            };
          }
        );
        setUsersWithPermissionMapped(mappedResData);
      });
    }
    if (visibilityControlCheck) {
      setFormValues((prevState) => {
        return {
          ...prevState,
          permissionLevel: VisibilityLevel.PRIVATE,
          item_permissions: [],
        };
      });
      getListUsers();
    }
  }, [listState.id, visibilityControlCheck]);

  useEffect(() => {
    if (visibilityControlCheck) {
      setFormValues((prevState) => {
        return {
          ...prevState,
          item_permissions: usersWithPermissionMapped.filter(
            (f) => f.isChecked
          ),
        };
      });
    } else {
      setFormValues((prevState) => {
        return {
          ...prevState,
          item_permissions: undefined,
        };
      });
    }
  }, [usersWithPermissionMapped, visibilityControlCheck]);

  useEffect(() => {
    if (!visibilityControlCheck) {
      setUsersWithPermissionMapped([]);
    }
  }, [visibilityControlCheck]);

  const yupValidationSchema = Yup.object({
    name: Yup.string().required('name is required'),
    category: Yup.mixed<Category>().oneOf(Object.values(Category)),
    categoryId: formValues.category ? Yup.number().required() : Yup.number(),
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
  });

  const [yupValidationError, setYupValidationError] =
    useState<ItemYupValidationError>({
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
    <div>
      <form onSubmit={handleCreateItemFormSubmit}>
        <div className="flex flex-col text-sm space-y-2 p-2 bg-stone-900 border-b-2 rounded-xl border-blue-700">
          <div className="py-1 text-3xl">
            Create {formValues.dateRangeFlag ? 'an Event' : 'a Task'}
          </div>
          <span className="flex flex-row items-center space-x-1">
            <span
              onClick={() => setDateRangeControlChecked(false)}
              className={`py-1 px-2 text-lg rounded-xl ${
                !dateRangeControlChecked ? 'bg-red-600' : 'bg-stone-800'
              } hover:bg-red-600 cursor-pointer`}
            >
              Task
            </span>
            <span
              onClick={() => setDateRangeControlChecked(true)}
              className={`py-1 px-2 text-lg rounded-xl ${
                dateRangeControlChecked ? 'bg-blue-600' : 'bg-stone-800'
              } hover:bg-blue-600 cursor-pointer`}
            >
              Event
            </span>
          </span>
          <div>
            <span className="px-1">type</span>
            <span className="flex flex-row flex-wrap items-center">
              {Object.keys(ItemType).map((key) => (
                <span
                  key={key}
                  className={`${
                    formValues.itemType ==
                    ItemType[key as keyof typeof ItemType]
                      ? `text-black ${itemTypeStyling(formValues.itemType)}`
                      : 'bg-stone-800 hover:bg-stone-700 text-white'
                  }
                  )} text-sm p-1 my-0.5 mr-0.5 cursor-pointer rounded-xl`}
                  onClick={() =>
                    setFormValues({
                      ...formValues,
                      itemType: ItemType[key as keyof typeof ItemType],
                    })
                  }
                >
                  {key}
                </span>
              ))}
            </span>
          </div>
          <div className="flex flex-col">
            <label className="text-white px-1">title</label>
            <input
              className="text-white bg-stone-800 hover:bg-stone-700 p-1 rounded-xl"
              onFocus={() =>
                setYupValidationError({ ...yupValidationError, name: false })
              }
              onChange={(event) =>
                setFormValues({
                  ...formValues,
                  name: event.target.value,
                })
              }
            />
            {yupValidationError.name && (
              <span className={`${styles['field-error-styling']}`}>
                required
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-white px-1">info</label>
            <textarea
              className="text-white resize-y bg-stone-800 hover:bg-stone-700 px-1 rounded-xl"
              onChange={(event) =>
                setFormValues({
                  ...formValues,
                  description: event.target.value,
                })
              }
            />
          </div>
          {itemCategory && (
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
                  data={usersWithPermission}
                  selected={usersWithPermissionMapped}
                  setSelected={setUsersWithPermissionMapped}
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
              <DateInputs
                formValues={formValues}
                setFormValues={setFormValues}
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
              ></DateInputs>
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
              <span
                className="hover:bg-stone-700 rounded-xl p-1"
                onClick={() => focus()}
              >
                <TbPaperclip />
              </span>
            </div>
            {fileSelected != null && Object.keys(fileSelected).length > 0 && (
              <ul>
                {[...fileSelected].map((file, index) => (
                  <div key={index} className="flex">
                    <li className="truncate">
                      ({index + 1}) {file.name}
                    </li>
                    <span
                      className="hover:bg-stone-700 rounded-xl p-1"
                      onClick={() => removeFileFromSelected(file)}
                    >
                      <TbX />
                    </span>
                  </div>
                ))}
              </ul>
            )}
          </div>
          <FooterInputs
            setCreateNewItemMode={setCreateNewItemMode}
          ></FooterInputs>
        </div>
      </form>
    </div>
  );

  function getCategoryId() {
    switch (itemCategory) {
      case Category.LIST:
        return listState.id;
    }
  }

  async function handleCreateItemFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    trimStringsInObjectShallow(formValues);
    let yupValidateResult = await yupValidationSchema
      .validate(formValues, { abortEarly: false })
      .catch((err) => {
        console.log(err.errors);
        matchYupErrorStateWithCompErrorState(err.inner, yupValidationError);
        setYupValidationError({ ...yupValidationError });
      });
    if (!yupValidateResult) return;
    await callCreateNewItemApi(formValues);
  }

  async function callCreateNewItemApi(formValues: CreateItem) {
    if (itemCategory) {
      try {
        await axios({
          method: 'post',
          url: SpringItemApiRoutes.ITEM_CREATE,
          data: JSON.stringify(formValues),
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }).then(async (res) => {
          if (
            res.status === 200 &&
            res.data.length > 0 &&
            res.data[0].category
          ) {
            if (res.data[0].category === Category.LIST) {
              dispatch(setAdditionalListItems(res.data));
              if (fileSelected) {
                console.log('uploading attachment');
                await uploadAttachments(fileSelected, res.data[0]);
              }
            }
          }
        });
        setFormValues(initialFormState);
        setCreateNewItemMode(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios({
          method: 'post',
          url: SpringItemApiRoutes.ITEM_CREATE,
          data: JSON.stringify(formValues),
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }).then(async (res) => {
          if (res.status === 200) {
            dispatch(setAdditionalOwnItems(res.data));
            if (fileSelected) {
              console.log('uploading attachment');
              await uploadAttachments(fileSelected, res.data[0]);
            }
          }
        });
        setFormValues(initialFormState);
        setCreateNewItemMode(false);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function itemTypeStyling(itemType: string) {
    switch (itemType) {
      case 'ASSIGNMENT':
        return 'bg-emerald-500';
      case 'NOTE':
        return 'bg-cyan-500';
      case 'PROJECT':
        return 'bg-purple-500';
      case 'REMINDER':
        return 'bg-indigo-500';
      case 'MEETING':
        return 'bg-rose-500';
      case 'TEST':
        return 'bg-blue-500';
      default:
        return 'bg-stone-100';
    }
  }
}
