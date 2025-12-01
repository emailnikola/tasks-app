import { Modal, Button, Group, Text, Stack } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { deleteTask } from '../../store/tasksSlice'
import { notifications } from '@mantine/notifications'
import { JSX } from 'react'

interface DeleteTaskDialogProps {
  opened: boolean
  taskId: string | null
  onClose: () => void
}

export default function DeleteTaskDialog({
  opened,
  taskId,
  onClose
}: DeleteTaskDialogProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const isDeleting = useSelector((state: RootState) => state.tasks.status === 'loading')
  const task = useSelector((state: RootState) => state.tasks.tasks.find((t) => t.id === taskId))

  const handleDelete = async (): Promise<void> => {
    if (!taskId) {
      return
    }
    try {
      await dispatch(deleteTask(taskId)).unwrap()
      notifications.show({
        title: 'Success',
        message: 'Task successfully deleted!',
        color: 'green'
      })
      onClose()
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to delete task',
        color: 'red'
      })
      onClose()
    }
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Confirm Deletion" centered>
      <Stack gap="md">
        <Text>
          Are you sure you want to delete
          {task ? ` "${task.title}"` : ' this task'}?
        </Text>

        <Group justify="flex-end" mt="md">
          <Text c="red" size="sm">
            This action cannot be undone.
          </Text>
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              void handleDelete()
            }}
            loading={isDeleting}
            disabled={!taskId}
          >
            Delete
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
