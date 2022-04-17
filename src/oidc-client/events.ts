import {User} from 'oidc-client'

export default function OidcEvents(client : any) {

  client.events.addAccessTokenExpiring(function() {

    console.log('access token expiring')
  })

  client.events.addAccessTokenExpired(function() {

    console.log('access token expired')
  })

  client.events.addSilentRenewError(function(err: Error) {

    console.error('silent renew error', err)
  })

  client.events.addUserLoaded(function(user: User) {
    localStorage.setItem('token', user.access_token)
  })

  client.events.addUserUnloaded(function() {

    console.log('user unloaded')
  })

  client.events.addUserSignedOut(function() {

    console.log('user signed out')
  })

  client.events.addUserSessionChanged(function() {

    console.log('user session changed')
  })
}
