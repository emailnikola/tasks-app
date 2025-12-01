import { JSX, useState } from 'react'
import { Group } from '@mantine/core'
import TasksTable from '../components/tasks/TasksTable'
import AddEditTaskDialog from '../components/tasks/AddEditTaskDialog'
import DeleteTaskDialog from '../components/tasks/DeleteTaskDialog'

export default function TasksPage(): JSX.Element {
  const [addEditDialogOpen, setAddEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null)

  const handleOpenAddDialog = (): void => {
    setEditingTaskId(null)
    setAddEditDialogOpen(true)
  }
  const handleOpenEditDialog = (taskId: string): void => {
    setEditingTaskId(taskId)
    setAddEditDialogOpen(true)
  }
  const handleCloseAddEditDialog = (): void => {
    setEditingTaskId(null)
    setAddEditDialogOpen(false)
  }
  const handleOpenDeleteDialog = (taskId: string): void => {
    setDeletingTaskId(taskId)
    setDeleteDialogOpen(true)
  }
  const handleCloseDeleteDialog = (): void => {
    setDeletingTaskId(null)
    setDeleteDialogOpen(false)
  }

  return (
    <Group mt={50} justify="center">
      <TasksTable
        onAddTask={handleOpenAddDialog}
        onEditTask={handleOpenEditDialog}
        onDeleteTask={handleOpenDeleteDialog}
      />
      <AddEditTaskDialog
        opened={addEditDialogOpen}
        taskId={editingTaskId}
        onClose={handleCloseAddEditDialog}
      />
      <DeleteTaskDialog
        opened={deleteDialogOpen}
        taskId={deletingTaskId}
        onClose={handleCloseDeleteDialog}
      />
    </Group>
  )
}
