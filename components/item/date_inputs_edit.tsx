import {
  EditItem,
  ItemEditYupValidationError,
  ItemYupValidationError,
} from 'lib/types/item';
import { Dispatch, SetStateAction } from 'react';
import styles from './date_inputs_edit.module.css';

interface DateFormProps {
  formValues: EditItem;
  setFormValues: Dispatch<SetStateAction<EditItem>>;
  yupValidationError: ItemYupValidationError;
  setYupValidationError: Dispatch<SetStateAction<ItemEditYupValidationError>>;
  timeControlChecked: boolean;
  dateRangeControlChecked: boolean;
  datePart: string;
  setDatePart: Dispatch<SetStateAction<string>>;
  timePart: string;
  setTimePart: Dispatch<SetStateAction<string>>;
  datePartEnd: string;
  setDatePartEnd: Dispatch<SetStateAction<string>>;
  timePartEnd: string;
  setTimePartEnd: Dispatch<SetStateAction<string>>;
}

export function DateInputsEdit(props: DateFormProps) {
  const {
    yupValidationError,
    setYupValidationError,
    timeControlChecked,
    dateRangeControlChecked,
    datePart,
    setDatePart,
    timePart,
    setTimePart,
    datePartEnd,
    setDatePartEnd,
    timePartEnd,
    setTimePartEnd,
  } = props;

  return (
    <div>
      {!timeControlChecked && (
        <span className="flex flex-row space-x-1">
          <span className="flex flex-col">
            <input
              className="text-white bg-stone-800 hover:bg-stone-700 p-1 rounded-xl"
              type="date"
              value={datePart}
              onFocus={() =>
                setYupValidationError((prevValue) => {
                  return {
                    ...prevValue,
                    date_tz_insensitive: false,
                  };
                })
              }
              onChange={(event) => {
                setDatePart(event.target.value);
              }}
            />
            {yupValidationError.date_tz_insensitive && (
              <span className={`${styles['field-error-styling']}`}>
                invalid
              </span>
            )}
          </span>
          {dateRangeControlChecked && (
            <span className="flex flex-col">
              <input
                className="text-white bg-stone-800 hover:bg-stone-700 p-1 rounded-xl"
                type="date"
                value={datePartEnd}
                onFocus={() =>
                  setYupValidationError((prevValue) => {
                    return {
                      ...prevValue,
                      date_tz_insensitive_end: false,
                    };
                  })
                }
                onChange={(event) => {
                  setDatePartEnd(event.target.value);
                }}
              />
              {yupValidationError.date_tz_insensitive_end && (
                <span className={`${styles['field-error-styling']}`}>
                  invalid
                </span>
              )}
            </span>
          )}
        </span>
      )}
      {timeControlChecked && (
        <span className="flex flex-col space-y-1">
          <span className="flex flex-row space-x-1">
            <span>
              <input
                className="text-white bg-stone-800 hover:bg-stone-700 p-1 rounded-xl"
                type="date"
                value={datePart}
                onFocus={() =>
                  setYupValidationError((prevValue) => {
                    return {
                      ...prevValue,
                      date_tz_sensitive: false,
                    };
                  })
                }
                onChange={(event) => {
                  setDatePart(event.target.value);
                }}
              />
            </span>
            <span>
              <input
                className="text-white bg-stone-800 hover:bg-stone-700 p-1 rounded-xl"
                type="time"
                value={timePart}
                onFocus={() =>
                  setYupValidationError((prevValue) => {
                    return {
                      ...prevValue,
                      date_tz_sensitive: false,
                    };
                  })
                }
                onChange={(event) => {
                  setTimePart(event.target.value);
                }}
              />
            </span>
          </span>
          <span className="flex flex-row">
            {yupValidationError.date_tz_sensitive && (
              <span className={`${styles['field-error-styling']}`}>
                invalid
              </span>
            )}
          </span>
          {dateRangeControlChecked && (
            <span className="flex flex-col space-y-1">
              <span className="flex flex-row space-x-1">
                <input
                  className="text-white bg-stone-800 hover:bg-stone-700 p-1 rounded-xl"
                  type="date"
                  value={datePartEnd}
                  onFocus={() =>
                    setYupValidationError((prevValue) => {
                      return {
                        ...prevValue,
                        date_tz_sensitive_end: false,
                      };
                    })
                  }
                  onChange={(event) => {
                    setDatePartEnd(event.target.value);
                  }}
                />
                <input
                  className="text-white bg-stone-800 hover:bg-stone-700 p-1 rounded-xl"
                  type="time"
                  value={timePartEnd}
                  onFocus={() =>
                    setYupValidationError((prevValue) => {
                      return {
                        ...prevValue,
                        date_tz_sensitive_end: false,
                      };
                    })
                  }
                  onChange={(event) => {
                    setTimePartEnd(event.target.value);
                  }}
                />
              </span>
              <span className="flex flex-row">
                {yupValidationError.date_tz_sensitive_end && (
                  <span className={`${styles['field-error-styling']}`}>
                    invalid
                  </span>
                )}
              </span>
            </span>
          )}
        </span>
      )}
    </div>
  );
}
