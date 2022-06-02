export interface IProjects{
    id:number,
    title:string,
    start_date: Date,
    end_date: Date,
    description:string,
    created_at: Date,
    modify_at: Date,
    status: boolean,
    department_id: number,
    user_id: number,
    reason: string,
  }
  