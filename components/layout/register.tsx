import { useSpring, animated } from '@react-spring/web';
import axios from 'axios';
import { ApiRoutes } from 'lib/api/api_routes';
import { UserRegister } from 'lib/types/user';
import { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserState } from 'state/redux/userSlice';
import {
  matchYupErrorStateWithCompErrorState,
  trimStringsInObjectShallow,
} from 'utils/formValidateUtils';
import * as Yup from 'yup';

interface RegisterProps {
  setSelection: Dispatch<SetStateAction<string>>;
}

export default function Register(props: RegisterProps) {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState<UserRegister>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const yupValidationSchema = Yup.object({
    first_name: Yup.string().required('first name is required'),
    last_name: Yup.string().required('last name is required'),
    email: Yup.string().email('invalid email').required('email is required'),
    password: Yup.string().required('password is required'),
    confirm_password: Yup.string()
      .required()
      .oneOf([Yup.ref('password')], 'passwords must match'),
  });

  const [yupErrors, setYupErrors] = useState({
    first_name: false,
    last_name: false,
    email: false,
    password: false,
    confirm_password: false,
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
      <div className="text-white text-center text-2xl mb-5">
        Create a <span className="text-blue-700">kollab</span> account
      </div>
      <div className="px-1">
        <form onSubmit={handleRegisterFormSubmit}>
          <div className="flex flex-col">
            <span className="flex flex-col">
              <label className="text-white px-1">first name</label>
              <input
                className="bg-stone-800 text-white rounded-xl px-2"
                type="text"
                id="first_name"
                name="first_name"
                value={formValues.first_name}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    first_name: event.target.value,
                  })
                }
                onFocus={() =>
                  setYupErrors({ ...yupErrors, first_name: false })
                }
              />
              {yupErrors.first_name && (
                <span className="px-1 text-red-500 text-sm">
                  first name is required
                </span>
              )}
            </span>
            <span className="flex flex-col">
              <label className="text-white px-1">last name</label>
              <input
                className="bg-stone-800 text-white rounded-xl px-2"
                type="text"
                id="last_name"
                name="last_name"
                value={formValues.last_name}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    last_name: event.target.value,
                  })
                }
                onFocus={() => setYupErrors({ ...yupErrors, last_name: false })}
              />
              {yupErrors.last_name && (
                <span className="px-1 text-red-500 text-sm">
                  last name is required
                </span>
              )}
            </span>
            <span className="flex flex-col">
              <label className="text-white px-1">email</label>
              <input
                className="bg-stone-800 text-white rounded-xl px-2"
                type="text"
                id="email"
                name="email"
                value={formValues.email}
                onChange={(event) =>
                  setFormValues({ ...formValues, email: event.target.value })
                }
                onFocus={() => setYupErrors({ ...yupErrors, email: false })}
              />
              {yupErrors.email && (
                <span className="px-1 text-red-500 text-sm">
                  email is required
                </span>
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
                onChange={(event) =>
                  setFormValues({ ...formValues, password: event.target.value })
                }
                onFocus={() => setYupErrors({ ...yupErrors, password: false })}
              />
              {yupErrors.password && (
                <span className="px-1 text-red-500 text-sm">
                  password is required
                </span>
              )}
            </span>
            <span className="flex flex-col">
              <label className="text-white px-1">confirm password</label>
              <input
                className="bg-stone-800 text-white rounded-xl px-2"
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={formValues.confirm_password}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    confirm_password: event.target.value,
                  })
                }
                onFocus={() =>
                  setYupErrors({ ...yupErrors, confirm_password: false })
                }
              />
              {yupErrors.confirm_password && (
                <span className="px-1 text-red-500 text-sm">
                  passwords must match
                </span>
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
                className="basis-3/5 bg-blue-700 hover:bg-blue-600 w-full rounded-xl text-white"
              >
                Create Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </animated.div>
  );

  async function handleRegisterFormSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    trimStringsInObjectShallow(formValues);
    let yupValidateResult = await yupValidationSchema
      .validate(formValues, { abortEarly: false })
      .catch((err) => {
        matchYupErrorStateWithCompErrorState(err.inner, yupErrors);
        setYupErrors({ ...yupErrors });
      });
    if (!(JSON.stringify(yupValidateResult) === JSON.stringify(formValues))) {
      return;
    }
    try {
      await axios({
        method: 'post',
        url: ApiRoutes.REGISTER,
        data: JSON.stringify(formValues),
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => {
        if (res.data.message === 'Email already exists') {
          return;
        }
        dispatch(setUserState(res.data));
      });
    } catch (error) {
      console.log(error);
    }
  }
}
