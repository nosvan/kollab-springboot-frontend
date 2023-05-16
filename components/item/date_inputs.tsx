import { CreateItem, ItemYupValidationError } from 'lib/types/item';
import { Dispatch, SetStateAction } from 'react';
import styles from './date_inputs.module.css';

interface DateFormProps {
  formValues: CreateItem;
  setFormValues: Dispatch<SetStateAction<CreateItem>>;
  yupValidationError: ItemYupValidationError;
  setYupValidationError: Dispatch<SetStateAction<ItemYupValidationError>>;
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

export function DateInputs(props: DateFormProps) {
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
                    dateTzInsensitive: false,
                  };
                })
              }
              onChange={(event) => {
                setDatePart(event.target.value);
              }}
            />
            {yupValidationError.dateTzInsensitive && (
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
                      dateTzInsensitiveEnd: false,
                    };
                  })
                }
                onChange={(event) => {
                  setDatePartEnd(event.target.value);
                }}
              />
              {yupValidationError.dateTzInsensitiveEnd && (
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
                      dateTzSensitive: false,
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
                      dateTzSensitive: false,
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
            {yupValidationError.dateTzSensitive && (
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
                        dateTzSensitiveEnd: false,
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
                        dateTzSensitiveEnd: false,
                      };
                    })
                  }
                  onChange={(event) => {
                    setTimePartEnd(event.target.value);
                  }}
                />
              </span>
              <span className="flex flex-row">
                {yupValidationError.dateTzSensitiveEnd && (
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
