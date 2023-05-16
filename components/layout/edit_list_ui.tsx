import axios, { AxiosError } from 'axios';
import { ListApiRoutes } from 'lib/api/api_routes';
import { UserSliceState } from 'lib/types/user';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'state/redux/store';
import { matchYupErrorStateWithCompErrorState } from 'utils/formValidateUtils';
import * as Yup from 'yup';

type passcodeFormValues = {
  userId: number;
  listId: number;
  oldPasscode: string;
  passcode: string;
  confirmPasscode: string;
};

export default function EditList(props: { listId: number }) {
  const userState: UserSliceState = useSelector(
    (state: RootState) => state.user_store
  );
  const [passCodeMode, setNewPasscodeMode] = useState<boolean>(false);
  const initialPasscodeFormValues: passcodeFormValues = {
    userId: userState.user.id,
    listId: props.listId,
    oldPasscode: '',
    passcode: '',
    confirmPasscode: '',
  };
  const [passcodeFormValues, setPasscodeFormValues] =
    useState<passcodeFormValues>(initialPasscodeFormValues);
  const intitialPasscodeYupErrors = {
    oldPasscode: false,
    passcode: false,
    confirmPasscode: false,
  };
  const [passcodeYupErrors, setPasscodeYupErrors] = useState(
    intitialPasscodeYupErrors
  );
  const passcodeYupValidationSchema = Yup.object({
    oldPasscode: Yup.string().required('Old passcode is required'),
    passcode: Yup.string().required('Passcode is required'),
    confirmPasscode: Yup.string()
      .required()
      .oneOf([Yup.ref('passcode')], 'passcodes must match'),
  });

  const [invalidCurrentPasscode, setInvalidCurrentPasscode] =
    useState<boolean>(false);

  return (
    <div className="flex flex-col space-y-1 mx-1 pl-1">
      <div className="bg-stone-900 p-1 rounded-xl">
        <div className="p-1 text-2xl">List Settings</div>
        <div className="flex">
          {!passCodeMode && (
            <div
              onClick={() => setNewPasscodeMode(true)}
              className="bg-stone-800 hover:bg-stone-700 p-1 rounded-xl cursor-pointer"
            >
              Change Passcode
            </div>
          )}
          {passCodeMode && (
            <div>
              <form onSubmit={changePasscode}>
                <div className="flex flex-col space-y-1">
                  <div>
                    <label className="mr-1">current passcode</label>
                    <input
                      type="password"
                      className="rounded-lg bg-stone-800 hover:bg-stone-700"
                      onChange={(event) =>
                        setPasscodeFormValues({
                          ...passcodeFormValues,
                          oldPasscode: event.target.value,
                        })
                      }
                      onFocus={() => {
                        setPasscodeYupErrors({
                          ...passcodeYupErrors,
                          oldPasscode: false,
                        });
                        setInvalidCurrentPasscode(false);
                      }}
                    ></input>
                    {passcodeYupErrors.oldPasscode && (
                      <div className="text-red-500 text-sm">
                        current passcode is required
                      </div>
                    )}
                    {invalidCurrentPasscode && (
                      <div className="text-red-500 text-sm">
                        current passcode is incorrect
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="mr-1">passcode</label>
                    <input
                      type="password"
                      className="rounded-lg bg-stone-800 hover:bg-stone-700"
                      onChange={(event) =>
                        setPasscodeFormValues({
                          ...passcodeFormValues,
                          passcode: event.target.value,
                        })
                      }
                      onFocus={() => {
                        setPasscodeYupErrors({
                          ...passcodeYupErrors,
                          passcode: false,
                        });
                      }}
                    ></input>
                    {passcodeYupErrors.passcode && (
                      <div className="text-red-500 text-sm">
                        passcode is required
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="mr-1">confirm passcode</label>
                    <input
                      type="password"
                      className="rounded-lg bg-stone-800 hover:bg-stone-700"
                      onChange={(event) =>
                        setPasscodeFormValues({
                          ...passcodeFormValues,
                          confirmPasscode: event.target.value,
                        })
                      }
                      onFocus={() => {
                        setPasscodeYupErrors({
                          ...passcodeYupErrors,
                          confirmPasscode: false,
                        });
                      }}
                    ></input>
                    {passcodeYupErrors.confirmPasscode && (
                      <div className="text-red-500 text-sm">
                        passcodes must match
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row space-x-1">
                    <div className="bg-stone-800 hover:bg-stone-700 rounded-lg p-1">
                      <button type="submit">Submit</button>
                    </div>
                    <div
                      className="bg-stone-800 hover:bg-stone-700 rounded-lg p-1 cursor-pointer"
                      onClick={cancelPasscodeSubmit}
                    >
                      <span>Cancel</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  function cancelPasscodeSubmit() {
    setPasscodeYupErrors(intitialPasscodeYupErrors);
    setPasscodeFormValues(initialPasscodeFormValues);
    setNewPasscodeMode(false);
    setInvalidCurrentPasscode(false);
  }

  async function changePasscode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let yupValidateResult = await passcodeYupValidationSchema
      .validate(passcodeFormValues, { abortEarly: false })
      .catch((err) => {
        matchYupErrorStateWithCompErrorState(err.inner, passcodeYupErrors);
        setPasscodeYupErrors({ ...passcodeYupErrors });
      });
    if (
      !(
        JSON.stringify(yupValidateResult) === JSON.stringify(passcodeFormValues)
      )
    ) {
      return;
    }
    try {
      await axios({
        method: 'post',
        url: ListApiRoutes.EDIT_PASSCODE,
        data: JSON.stringify(passcodeFormValues),
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => {
        cancelPasscodeSubmit();
      });
    } catch (error: any) {
      if (error.response.status === 404) {
        setInvalidCurrentPasscode(true);
      } else {
        console.log(error);
      }
    }
  }
}
