export enum Task {
  Table         = "task",

  Id            = "id",
  ProjectId     = "project_id",
  StatusId      = "status_id",
  Description   = "description",
  ScheduleDate  = "schedule_date"
}

export enum TaskSchedule {
  Today       = "0",
  Tomorrow    = "1",
  NextWeek    = "2"
}