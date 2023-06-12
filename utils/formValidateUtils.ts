export function matchYupErrorStateWithCompErrorState(
  objectToBeIteratedThrough: any,
  objectHoldingErrorStateThatIsReturned: any
) {
  if (objectToBeIteratedThrough) {
    Object.keys(objectHoldingErrorStateThatIsReturned).forEach(
      (key: string) => {
        objectHoldingErrorStateThatIsReturned[
          key as keyof typeof objectHoldingErrorStateThatIsReturned
        ] = false;
      }
    );
    objectToBeIteratedThrough.forEach((element: any) => {
      objectHoldingErrorStateThatIsReturned[
        element.path as keyof typeof objectHoldingErrorStateThatIsReturned
      ] = true;
    });
  }
  return objectHoldingErrorStateThatIsReturned;
}

export function trimStringsInObjectShallow(object: any) {
  if (object) {
    Object.keys(object).forEach((key: string) => {
      if (typeof object[key] === 'string') {
        object[key] = object[key].trim();
      }
    });
  }
}
