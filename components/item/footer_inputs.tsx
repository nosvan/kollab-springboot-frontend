import { Dispatch, SetStateAction } from 'react';

interface FooterInputsProps {
  setCreateNewItemMode: Dispatch<SetStateAction<boolean>>;
}

export function FooterInputs(props: FooterInputsProps) {
  const { setCreateNewItemMode } = props;
  return (
    <div className="flex flex-row py-2 items-center justify-start text-center text-sm space-x-2">
      <div
        className="bg-stone-900 border-2 border-white hover:bg-stone-800 hover:border-stone-300
              text-white rounded-xl px-2 cursor-pointer"
        onClick={() => setCreateNewItemMode(false)}
      >
        <span>Cancel</span>
      </div>
      <button
        type="submit"
        className="bg-blue-700 hover:bg-blue-600 border-2 border-blue-700 hover:border-blue-600 px-3 rounded-xl text-white"
      >
        Create
      </button>
    </div>
  );
}
