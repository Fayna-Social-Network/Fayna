export { default as InitNotificationSignals } from './NotifySignals'
export { default as InitChannelsSignals } from './channelsSignals'
export { default as InitChatSignals } from './chatSignals'
export { default as InitUsersSignals } from './userSignals'
export { default as InitGroupsSignals } from './groupsSignals'


export function signalrRegisterUserOnline(nickname: string, signalR: any){
    signalR.invoke('RegisterUserOnline', nickname)
    signalR.on('regOk', () => {
        signalR.invoke('SuccessRegistration', nickname)
   })
}