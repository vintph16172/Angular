import { Moment } from 'moment';
export interface ProjectType {
    id?: number | null,
    name: string,
    image: string ,
    createAt: string | Moment,
    categoriesProjectId: number,
    short_desc: string,
    desc: string,
    categoriesProject?: {id: number, name: string}
}