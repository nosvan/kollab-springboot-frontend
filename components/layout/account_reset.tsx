import { animated, useSpring } from '@react-spring/web';
import axios from 'axios';
import { ApiRoutes } from 'lib/api/api_routes';
import { Dispatch, SetStateAction, useState } from 'react';
import * as Yup from 'yup';
import { matchYupErrorStateWithCompErrorState } from 'utils/formValidateUtils';
import { UserReset } from 'lib/types/user';

interface AccountResetProps {
  setSelection: Dispatch<SetStateAction<string>>;
}

export default function AccountReset(props: AccountResetProps) {
  const { setSelection } = props;

  const yupValidationSchema = Yup.object().shape({
    email: Yup.string().email('invalid email').required('email required'),
    confirm_email: Yup.string()
      .required()
      .oneOf([Yup.ref('email')], 'emails must match'),
  });

  const [yupErrors, setYupErrors] = useState({
    email: false,
    confirm_email: false,
  });

  const [formValues, setFormValues] = useState({
    email: '',
    confirm_email: '',
  });

  const modalSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 250 },
  });

  return (
    <animated.div
      style={modalSpring}
      className="flex flex-col bg-stone-900 rounded-xl pt-4"
    >
      <div className="text-white text-center text-2xl mb-4">
        Login <span className="text-blue-700">kollab</span> with email
      </div>
      <div className="px-1">
        <form onSubmit={handlePasswordReset}>
          <div className="flex flex-col">
            <span className="flex flex-col">
              <label className="text-white pl-1">email to send link</label>
              <input
                className="text-white bg-stone-800 rounded-xl px-2"
                type="text"
                value={formValues.email}
                onChange={(event) => {
                  setFormValues({
                    ...formValues,
                    email: event.target.value,
                  });
                }}
                onFocus={() => setYupErrors({ ...yupErrors, email: false })}
              />
              {yupErrors.email && (
                <span className="px-1 text-red-500 text-sm">
                  email is required
                </span>
              )}
            </span>
            <span className="flex flex-col">
              <label className="text-white pl-1">confirm email</label>
              <input
                className="text-white bg-stone-800 rounded-xl px-2"
                type="text"
                value={formValues.confirm_email}
                onChange={(event) => {
                  setFormValues({
                    ...formValues,
                    confirm_email: event.target.value,
                  });
                }}
                onFocus={() => {
                  setYupErrors({
                    ...yupErrors,
                    confirm_email: false,
                  });
                }}
              />
              {yupErrors.confirm_email && (
                <span className="px-1 text-red-500 text-sm">
                  emails must match
                </span>
              )}
            </span>
            <div className="flex flex-row py-5 text-center space-x-1">
              <div
                onClick={() => setSelection('')}
                className="basis-2/5 bg-stone-800 border-2 border-white 
            hover:bg-stone-700 text-white rounded-xl px-1 cursor-pointer"
              >
                <span>{'back'}</span>
              </div>
              <button
                type="submit"
                className="basis-3/5 bg-blue-700 hover:bg-blue-600 
            w-full rounded-xl text-white"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </animated.div>
  );

  async function handlePasswordReset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let yupValidateResult = await yupValidationSchema
      .validate(formValues, { abortEarly: false })
      .catch((err) => {
        matchYupErrorStateWithCompErrorState(err.inner, yupErrors);
        setYupErrors({ ...yupErrors });
      });
    if (!(JSON.stringify(yupValidateResult) === JSON.stringify(formValues))) {
      return;
    }
    callAccountResetApi({
      ...formValues,
      locationOrigin: window.location.origin,
    });
  }

  async function callAccountResetApi(formValues: UserReset) {
    try {
      await axios({
        method: 'post',
        url: ApiRoutes.RESET,
        data: JSON.stringify(formValues),
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => {
        switch (res.data.message.toLowerCase()) {
          case 'email sent':
            alert('email sent');
            setSelection('');
            return;
          case 'email not sent':
            alert('email error, try again');
            return;
          default:
            alert('error');
            return;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
