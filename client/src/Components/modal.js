import React, { forwardRef, useImperativeHandle, useState } from 'react'
import ConfirmDialog from './ConfirmDialog';


let resolve;

const Modal = forwardRef((props, ref) => {
  const { onClose, closeOnBlur } = props;
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState(undefined)


  const closeOnTouchOutSide = () => {
    if (closeOnBlur) {
      onClose && onClose();
      setOpen(false)
    }
  }

  // const onEscapeKey = (e) => {
  //   console.log(e.key)
  //   if (e.key === "Escape") {
  //     closeOnTouchOutSide()
  //   }
  // }

  // useEffect(() => {
  //   if (!closeOnBlur) return
  //   document.body.addEventListener("keypress", onEscapeKey, false);

  //   return () => {
  //     document.body.removeEventListener("keypress", onEscapeKey, false);
  //   };
  // }, [props]);



  useImperativeHandle(ref, () => ({

    show: () => {
      setOpen(true);
    },
    hide: () => {
      onClose && onClose();
      resolve && resolve(false)
      content && setContent(undefined);
      setOpen(false)
    },
    set: (c, res = undefined) => {
      resolve = res
      setContent(c)
      ref.current.show()
    },
    confirm: (opts) => {
      let promise = new Promise(res => { resolve = res })
      setContent(
        <ConfirmDialog
          confirm={() => {
            resolve(true)
            ref.current.hide()
          }}
          cancel={() => {
            resolve(false)
            ref.current.hide()
          }}
          options={opts}>
        </ConfirmDialog>
      )
      ref.current.show()
      return promise
    },


  }));

  if (!open) {
    return <></>;
  }
  return (
    <div className='fixed inset-0 z-30 overflow-auto bg-black bg-opacity-50 inline-grid place-content-center' onClick={closeOnTouchOutSide}>
      <span className='m-auto max-h-screen overflow-y-auto no-scrollbar' onClick={(e) => e.stopPropagation()}>
        {content || props.children}
      </span>
    </div>
  );
})

export default Modal;
