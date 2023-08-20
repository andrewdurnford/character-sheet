import { Dialog } from "@headlessui/react"
import React from "react"

type ModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

// TODO: scroll inside modal body
export function Modal({ open, onClose, children }: ModalProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center sm:p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto h-full w-full overflow-y-auto bg-white p-8 sm:max-w-lg sm:rounded">
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
