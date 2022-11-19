import React, { FC, FormEvent, Fragment, KeyboardEvent, useState } from 'react'
import { Label, Modal, Textarea } from 'flowbite-react'
import { Task } from '../App'

interface Props {
  isVisible: boolean
  onClose: () => void
  onSubmit: (task: Task) => void
}

const AddModal: FC<Props> = ({
  isVisible, onClose, onSubmit
}) => {
  const [description, setDescription] = useState('')

  const onNext = (e?: FormEvent): void => {
    if (e !== undefined) e.preventDefault()
    const task: Task = {
      description,
      id: Date.now().toString(),
      statusId: 0,
      createdAt: new Date().toJSON()
    }

    onSubmit(task)
    setDescription('')
    onClose()
  }

  const onKeyUp = ({ ctrlKey, key }: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (
      ctrlKey &&
      key === 'Enter' &&
      description.length > 0
    ) onNext()
  }

  return (
    <Modal
      show={isVisible}
      onClose={onClose}
      data-testid='add-modal'
      size='sm'
    >
      <Modal.Header>
        New task
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={onNext}>
          <div>
            <Label htmlFor='task' value='Description' />
            <Textarea
              required
              autoFocus
              id='task'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='min-h-10 max-h-14'
              onKeyUp={onKeyUp}
              helperText={description.length > 0
                ? <p className='text-xs mb-2 hidden invisible md:block md:visible'>
                    Ctrl + Enter to continue
                </p>
                : <Fragment />
              }
            />
          </div>

          <button className='bg-blue-700 w-full rounded mt-2 h-10 text-white'>
            Add
          </button>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default AddModal
