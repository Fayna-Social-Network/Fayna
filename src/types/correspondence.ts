import { IMessage } from './message';

export interface ICorrespondence{
    contact: string,
    messages: {
        correspondences: Array<IMessage>
    }
}