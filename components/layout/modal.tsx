import { useSpring, animated } from '@react-spring/web';
import { ReactNode, useEffect } from 'react';
import { TbX } from 'react-icons/tb';
import styles from './modal.module.css';

interface ModalPopupProps {
  children: ReactNode;
  modalId: string;
  modalOpen: any;
}

function ModalPopup(props: ModalPopupProps) {
  useEffect(() => {
    window.addEventListener('click', handleModalClick);

    return () => {
      window.removeEventListener('click', handleModalClick);
    };
  }, []);
  const modalSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 250 },
  });
  return (
    <animated.div
      style={modalSpring}
      id={props.modalId}
      className={`fixed z-20 bg-black inset-0 bg-opacity-20 backdrop-blur-lg`}
    >
      <div
        id="outer-container"
        className="flex justify-center items-center h-full"
      >
        <div
          id="inner-container"
          className={`flex flex-col basis-5/6 md:basis-2/3 lg:basis-1/3 space-y-2 bg-black text-white p-2 rounded-2xl ${styles.modalchildren}`}
        >
          <div className="flex justify-end">
            <TbX
              onClick={() => props.modalOpen(false)}
              className="hover:bg-stone-700 rounded-2xl cursor-pointer"
            ></TbX>
          </div>
          <div>{props.children}</div>
        </div>
      </div>
    </animated.div>
  );

  function handleModalClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.id === 'outer-container') {
      props.modalOpen(false);
    }
  }
}

export default ModalPopup;
