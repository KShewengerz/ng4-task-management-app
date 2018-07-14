export enum TaskFields {
  Table         = "task",

  Id            = "id",
  ProjectId     = "project_id",
  StatusId      = "status_id",
  Description   = "description",
  ScheduleDate  = "schedule_date",
  Ordinal       = "ordinal",
  CompletedOn   = "completed_on"
}

export enum TaskStatusFields {
  Table = "task_status",

  Id    = "id",
  Name  = "name"
}

export enum UserTaskFields {
  Table  = "user_task",

  UserId = "user_id",
  TaskId = "task_id"
}

export enum TaskSchedule {
  Today       = "0",
  Tomorrow    = "1",
  NextWeek    = "2"
}