import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Dialog(props) {
  const { open, onClose, closeButtonShow, outSideTouchClose } = props;

  function closeOnTouchOutSide() {
    if (outSideTouchClose) {
      onClose();
    }
  }


  if (!open) {
    return <></>;
  }
  return (
    <div className='fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex' onClick={closeOnTouchOutSide}>
      <div className='relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg'>
        <div>{props.children}</div>
        {closeButtonShow && (
          <span className='absolute top-0 right-0 p-4'>
            {""}
            <button
              onClick={() => onClose()}
              className='text-gray-600 transform hover:scale-110 text-xl font-bold focus:outline-none'>
              <FontAwesomeIcon
                size='lg'
                icon={["fas", "times"]}></FontAwesomeIcon>
            </button>
          </span>
        )}
      </div>
    </div>
  );
}
