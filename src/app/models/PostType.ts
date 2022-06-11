import { Moment } from 'moment';
export interface PostType {
    id?: number,
    title: string,
    image: string,
    createAt: string | Moment,
    categoryPostId: number,
    short_desc: string,
    desc: string
}