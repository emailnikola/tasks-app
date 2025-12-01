export interface TasksTableProps {
  onAddTask: () => void
  onEditTask: (taskId: string) => void
  onDeleteTask: (taskId: string) => void
}
