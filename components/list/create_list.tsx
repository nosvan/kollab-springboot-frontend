import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import { setCurrentList, setLists } from 'state/redux/listSlice';
import * as Yup from 'yup';
import {
  matchYupErrorStateWithCompErrorState,
  trimStringsInObjectShallow,
} from 'utils/formValidateUtils';
import { ListJoinClient, ListRegister } from 'lib/types/list';
import { ListApiRoutes } from 'lib/api/api_routes';

interface NewListProps {
  setCreateNewTypeMode: Dispatch<SetStateAction<boolean>>;
}

export default function NewList(props: NewListProps) {
  const { setCreateNewTypeMode } = props;
  const dispatch = useDispatch();
  const [selection, setSelection] = useState('create_list');

  const initialJoinFormValuesState: ListJoinClient = {
    list_id: '',
    passcode: '',
    confirm_passcode: '',
  };
  const [joinFormValues, setJoinFormValues] = useState<ListJoinClient>(
    initialJoinFormValuesState
  );

  const [joinYupErrors, setJoinYupErrors] = useState({
    list_id: false,
    passcode: false,
    confirm_passcode: false,
  });

  const joinYupValidationSchema = Yup.object({
    list_id: Yup.string()
      .min(1, 'List ID must be above 0')
      .required('List ID is required'),
    passcode: Yup.string().required('Passcode is required'),
    confirm_passcode: Yup.string()
      .required()
      .oneOf([Yup.ref('passcode')], 'passcodes must match'),
  });

  const initialCreateFormValuesState: ListRegister = {
    name: '',
    description: '',
    passcode: '',
    confirm_passcode: '',
  };

  const [createFormValues, setCreateFormValues] = useState<ListRegister>(
    initialCreateFormValuesState
  );

  const [createYupErrors, setCreateYupErrors] = useState({
    name: false,
    description: false,
    passcode: false,
    confirm_passcode: false,
  });

  const createYupValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    passcode: Yup.string().required('Passcode is required'),
    confirm_passcode: Yup.string()
      .required()
      .oneOf([Yup.ref('passcode')], 'passcodes must match'),
  });

  return (
    <>
      {selection === 'join_list' && (
        <div className="px-2 bg-stone-900 border-b-2 rounded-xl border-blue-700">
          <div className="px-1 py-2">
            <div className="text-3xl">Join a List</div>
            <div
              onClick={() => setSelection('create_list')}
              className="text-sm hover:underline cursor-pointer"
            >
              creating a new list? click here
            </div>
          </div>
          <form onSubmit={handleJoinListFormSubmit}>
            <div className="flex flex-col text-sm space-y-1">
              <span className="flex flex-col">
                <label className="text-white px-1">list id</label>
                <input
                  className="text-white bg-stone-800 p-1 rounded-lg"
                  type="number"
                  id="list_id"
                  name="list_id"
                  value={joinFormValues.list_id}
                  onChange={(event) => {
                    setJoinFormValues({
                      ...joinFormValues,
                      list_id: event.target.value,
                    });
                  }}
                  onFocus={() => {
                    setJoinYupErrors({
                      ...joinYupErrors,
                      list_id: false,
                    });
                  }}
                />
                {joinYupErrors.list_id && (
                  <div className="px-1 text-red-500 text-sm">
                    list id must be above 0 and is required
                  </div>
                )}
              </span>
              <span className="flex flex-col">
                <label className="text-white px-1">passcode</label>
                <input
                  className="text-white bg-stone-800 p-1 rounded-lg"
                  type="password"
                  id="passcode"
                  name="passcode"
                  value={joinFormValues.passcode}
                  onChange={(event) => {
                    setJoinFormValues({
                      ...joinFormValues,
                      passcode: event.target.value,
                    });
                  }}
                  onFocus={() => {
                    setJoinYupErrors({
                      ...joinYupErrors,
                      passcode: false,
                    });
                  }}
                />
                {joinYupErrors.passcode && (
                  <div className="px-1 text-red-500 text-sm">
                    passcode is required
                  </div>
                )}
              </span>
              <span className="flex flex-col">
                <label className="text-white px-1">confirm passcode</label>
                <input
                  className="text-white bg-stone-800 p-1 rounded-lg"
                  type="password"
                  id="confirm_passcode"
                  name="confirm_passcode"
                  value={joinFormValues.confirm_passcode}
                  onChange={(event) => {
                    setJoinFormValues({
                      ...joinFormValues,
                      confirm_passcode: event.target.value,
                    });
                  }}
                  onFocus={() => {
                    setJoinYupErrors({
                      ...joinYupErrors,
                      confirm_passcode: false,
                    });
                  }}
                />
                {joinYupErrors.confirm_passcode && (
                  <div className="px-1 text-red-500 text-sm">
                    passcodes must match
                  </div>
                )}
              </span>
              <div className="flex flex-row py-5 justify-start text-center text-sm space-x-2">
                <div
                  className="bg-stone-900 border-2 border-white hover:bg-stone-800 hover:border-stone-300 text-white rounded-lg px-2 cursor-pointer"
                  onClick={() => setCreateNewTypeMode(false)}
                >
                  <span>Cancel</span>
                </div>
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-600 border-2 border-blue-700 hover:border-blue-600 px-3 rounded-lg text-white"
                >
                  Join
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {selection === 'create_list' && (
        <div className="px-2 bg-stone-900 border-b-2 rounded-xl border-blue-700">
          <div className="px-1 py-5">
            <div className="text-3xl">Create a New List</div>
            <div
              onClick={() => setSelection('join_list')}
              className="text-sm hover:underline cursor-pointer"
            >
              joining a list? click here
            </div>
          </div>
          <form onSubmit={handleCreateListFormSubmit}>
            <div className="flex flex-col text-sm space-y-1">
              <span className="flex flex-col">
                <label className="text-white px-1">name</label>
                <input
                  className="text-white bg-stone-800 p-1 rounded-lg"
                  type="text"
                  id="list_name"
                  name="list_name"
                  value={createFormValues.name}
                  onChange={(event) => {
                    setCreateFormValues({
                      ...createFormValues,
                      name: event.target.value,
                    });
                  }}
                  onFocus={() => {
                    setCreateYupErrors({
                      ...createYupErrors,
                      name: false,
                    });
                  }}
                />
                {createYupErrors.name && (
                  <div className="px-1 text-red-500 text-sm">
                    name is required
                  </div>
                )}
              </span>
              <span className="flex flex-col">
                <label className="text-white px-1">passcode</label>
                <input
                  className="text-white bg-stone-800 p-1 rounded-lg"
                  type="password"
                  id="passcode"
                  name="passcode"
                  value={createFormValues.passcode}
                  onChange={(event) => {
                    setCreateFormValues({
                      ...createFormValues,
                      passcode: event.target.value,
                    });
                  }}
                  onFocus={() => {
                    setCreateYupErrors({
                      ...createYupErrors,
                      passcode: false,
                    });
                  }}
                />
                {createYupErrors.passcode && (
                  <div className="px-1 text-red-500 text-sm">
                    passcode is required
                  </div>
                )}
              </span>
              <span className="flex flex-col">
                <label className="text-white px-1">confirm passcode</label>
                <input
                  className="text-white bg-stone-800 p-1 rounded-lg"
                  type="password"
                  id="confirm_passcode"
                  name="confirm_passcode"
                  value={createFormValues.confirm_passcode}
                  onChange={(event) => {
                    setCreateFormValues({
                      ...createFormValues,
                      confirm_passcode: event.target.value,
                    });
                  }}
                  onFocus={() => {
                    setCreateYupErrors({
                      ...createYupErrors,
                      confirm_passcode: false,
                    });
                  }}
                />
                {createYupErrors.confirm_passcode && (
                  <div className="px-1 text-red-500 text-sm">
                    passcodes must match
                  </div>
                )}
              </span>
              <span className="flex flex-col">
                <label className="text-white px-1">description</label>
                <textarea
                  className="text-white bg-stone-800 px-1 rounded-lg"
                  id="description"
                  name="description"
                  value={createFormValues.description}
                  onChange={(event) => {
                    setCreateFormValues({
                      ...createFormValues,
                      description: event.target.value,
                    });
                  }}
                  onFocus={() => {
                    setCreateYupErrors({
                      ...createYupErrors,
                      description: false,
                    });
                  }}
                />
                {createYupErrors.description && (
                  <div className="px-1 text-red-500 text-sm">
                    description is required
                  </div>
                )}
              </span>
              <div className="flex flex-row py-5 justify-start text-center text-sm space-x-2">
                <div
                  className="bg-black border-2 border-white hover:bg-gray-800 hover:border-gray-300 text-white rounded-lg px-2 cursor-pointer"
                  onClick={() => setCreateNewTypeMode(false)}
                >
                  <span>Cancel</span>
                </div>
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-600 border-2 border-blue-700 hover:border-blue-600 px-3 rounded-lg text-white"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );

  async function handleJoinListFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    trimStringsInObjectShallow(joinFormValues);
    let yupValidateResult = await joinYupValidationSchema
      .validate(joinFormValues, { abortEarly: false })
      .catch((err) => {
        matchYupErrorStateWithCompErrorState(err.inner, joinYupErrors);
        setJoinYupErrors({ ...joinYupErrors });
      });
    if (
      !(JSON.stringify(yupValidateResult) === JSON.stringify(joinFormValues))
    ) {
      return;
    }
    try {
      await axios({
        method: 'post',
        url: ListApiRoutes.JOIN_LIST,
        data: JSON.stringify(joinFormValues),
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => {
        setJoinFormValues(initialJoinFormValuesState);
        setCreateNewTypeMode(false);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCreateListFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    trimStringsInObjectShallow(createFormValues);
    let yupValidateResult = await createYupValidationSchema
      .validate(createFormValues, { abortEarly: false })
      .catch((err) => {
        matchYupErrorStateWithCompErrorState(err.inner, createYupErrors);
        setCreateYupErrors({ ...createYupErrors });
      });
    if (
      !(JSON.stringify(yupValidateResult) === JSON.stringify(createFormValues))
    ) {
      return;
    }
    try {
      await axios({
        method: 'post',
        url: ListApiRoutes.NEW_LIST,
        data: JSON.stringify(createFormValues),
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => {
        dispatch(setCurrentList(res.data));
      });
      await axios({
        method: 'get',
        url: ListApiRoutes.GET_LISTS,
      }).then((res) => {
        dispatch(setLists(res.data));
      });
      setCreateFormValues(initialCreateFormValuesState);
      setCreateNewTypeMode(false);
    } catch (error) {
      console.log(error);
    }
  }
}
