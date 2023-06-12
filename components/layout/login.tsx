import { useSpring, animated } from '@react-spring/web';
import axios from 'axios';
import { SpringApiRoutes } from 'lib/api/spring_api_routes';
import { TabName } from 'lib/types/ui';
import { UserCredentials } from 'lib/types/user';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentTab, setUserState } from 'state/redux/userSlice';
import {
  matchYupErrorStateWithCompErrorState,
  trimStringsInObjectShallow,
} from 'utils/formValidateUtils';
import * as Yup from 'yup';

interface LoginProps {
  setSelection: Dispatch<SetStateAction<string>>;
}

export default function Login(props: LoginProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const yupValidationSchema = Yup.object({
    email: Yup.string().email('invalid email').required('email is required'),
    password: Yup.string().required('password is required'),
  });

  const [formValues, setFormValues] = useState<UserCredentials>({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });

  const modalSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 250 },
  });
  return (
    <animated.div
      style={modalSpring}
      className="flex flex-col bg-stone-900 rounded-xl"
    >
      <div className="text-white text-center text-2xl mb-5">
        Log in to <span className="text-blue-700">kollab</span>
      </div>
      <div className="px-1">
        <form onSubmit={handleLogin}>
          <div className="flex flex-col">
            <span className="flex flex-col">
              <label className="text-white px-1">email</label>
              <input
                className="bg-stone-800 text-white rounded-xl px-2"
                type="text"
                id="email"
                name="email"
                value={formValues.email}
                onChange={(event) => {
                  setFormValues({ ...formValues, email: event.target.value });
                }}
                onFocus={() => {
                  setFormErrors({ ...formErrors, email: false });
                }}
              />
              {formErrors.email && (
                <div className="px-1 text-red-500 text-sm">
                  email is required and must be a valid email
                </div>
              )}
            </span>
            <span className="flex flex-col">
              <label className="text-white px-1">password</label>
              <input
                className="bg-stone-800 text-white rounded-xl px-2"
                type="password"
                id="password"
                name="password"
                value={formValues.password}
                onChange={(event) => {
                  setFormValues({
                    ...formValues,
                    password: event.target.value,
                  });
                }}
                onFocus={() => {
                  setFormErrors({ ...formErrors, password: false });
                }}
              />
              {formErrors.password && (
                <div className="px-1 text-red-500 text-sm">
                  password is required
                </div>
              )}
            </span>
            <div className="flex flex-row py-5 text-center space-x-1">
              <div
                onClick={() => props.setSelection('')}
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
                Log in
              </button>
            </div>
          </div>
        </form>
      </div>
    </animated.div>
  );

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    trimStringsInObjectShallow(formValues);
    let yupValidateResult = await yupValidationSchema
      .validate(formValues, { abortEarly: false })
      .catch((err) => {
        matchYupErrorStateWithCompErrorState(err.inner, formErrors);
        setFormErrors({ ...formErrors });
      });
    if (!(JSON.stringify(yupValidateResult) === JSON.stringify(formValues))) {
      return;
    }

    try {
      await axios({
        method: 'post',
        url: SpringApiRoutes.LOGIN,
        data: JSON.stringify(formValues),
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }).then((res) => {
        console.log(res.data);
        dispatch(
          setUserState({
            ...res.data,
            isLoggedIn: true,
            currentTab: TabName.HOME,
          })
        );
        dispatch(setCurrentTab(TabName.HOME));
        router.push('/');
      });
    } catch (error) {
      console.log(error);
    }
  }
}
