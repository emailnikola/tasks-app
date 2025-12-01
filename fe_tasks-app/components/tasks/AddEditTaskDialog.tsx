import { Button, Modal, Select, TextInput, Group, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { JSX, useEffect } from 'react'
import { createTask, updateTask } from '../../store/tasksSlice'
import { TaskStatus } from '../../types/tasksTypes'
import { notifications } from '@mantine/notifications'

interface TaskFormValues {
  title: string
  description: string
  status: TaskStatus
}

interface AddEditTaskDialogProps {
  opened: boolean
  onClose: () => void
  taskId: string | null
}

export default function AddEditTaskDialog({
  opened,
  onClose,
  taskId
}: AddEditTaskDialogProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const tasks = useSelector((state: RootState) => state.tasks.tasks)
  const isEditing = !!taskId
  const taskToEdit = taskId ? tasks.find((t) => t.id === taskId) : null
  const isFetching = useSelector((state: RootState) => state.tasks.status === 'loading')

  const form = useForm<TaskFormValues>({
    initialValues: {
      title: '',
      description: '',
      status: 'TODO'
    },
    validate: {
      title: (value) => (value.length < 3 ? 'Title must be at least 3 characters' : null),
      description: (value) =>
        value.length < 10 ? 'Description must be at least 10 characters' : null
    }
  })

  useEffect(() => {
    if (opened && isEditing && taskToEdit) {
      form.setValues({
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status as TaskStatus
      })
    } else if (opened && !isEditing) {
      form.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, isEditing, taskToEdit])

  const handleSubmit = async (values: TaskFormValues): Promise<void> => {
    if (isFetching) {
      return
    }
    if (isEditing && taskId) {
      await dispatch(
        updateTask({
          id: taskId,
          title: values.title,
          description: values.description,
          status: values.status
        })
      )
      notifications.show({
        title: 'Success',
        message: 'Task successfully updated!',
        color: 'green'
      })
    } else {
      await dispatch(
        createTask({
          title: values.title,
          description: values.description,
          status: values.status
        })
      )
      notifications.show({
        title: 'Success',
        message: 'Task successfully created!',
        color: 'green'
      })
    }
    onClose()
    form.reset()
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEditing ? `Edit Task: ${taskToEdit?.title ?? taskId}` : 'Create New Task'}
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Title"
            placeholder="e.g., Finish Redux Refactoring"
            withAsterisk
            {...form.getInputProps('title')}
          />
          <TextInput
            label="Description"
            placeholder="Describe the task details..."
            withAsterisk
            {...form.getInputProps('description')}
          />
          {isEditing && (
            <Select
              label="Current Status"
              data={['TODO', 'IN_PROGRESS', 'DONE']}
              {...form.getInputProps('status')}
            />
          )}
          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={onClose} disabled={isFetching}>
              Cancel
            </Button>
            <Button type="submit" loading={isFetching}>
              {isEditing ? 'Save Changes' : 'Create Task'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}
