import { UID } from 'agora-rtc-react'
import { RtmClient, RtmEvents } from 'agora-rtm-react'
import { createContext } from 'react'

export type rtmCallbacks = {
  channel?: Partial<RtmEvents.RtmChannelEvents>
  client?: Partial<RtmEvents.RtmClientEvents>
}

export enum rtmStatus {
  // Initialisation failed
  initFailed,
  // Login has not been attempted
  offline,
  // RTM is initialising, process is not yet complete
  initialising,
  // Currently attempting to log in
  loggingIn,
  // RTM has logged in
  loggedIn,
  // RTM is logged in, and connected to the current channel
  connected,
  // RTM Login Failed
  loginFailed
}

export type messageType = 'UserData' | 'MuteRequest'

export type messageObject = userData | muteRequest

export enum clientRoleRaw {
  broadcaster,
  audience
}

export enum mutingDevice {
  camera,
  microphone
}

export type muteRequest = {
  messageType: 'MuteRequest'
  rtcId: UID
  mute: boolean
  device: mutingDevice
  isForceful: boolean
}

export type userData = {
  messageType: 'UserData'
  rtmId: string
  rtcId: UID
  username?: string
  role: clientRoleRaw
  uikit: {
    platform: string
    framework: string
    version: string
  }
  agora: {
    rtm: string
    rtc: string
  }
}

export enum popUpStateEnum {
  closed,
  microphone,
  camera
}

interface rtmContext {
  // messageStore: any
  /**
   * rtm connection status
   */
  rtmStatus: rtmStatus
  /**
   * send message to the channel
   */
  sendChannelMessage: (msg: string) => void
  /**
   * send message to a user
   */
  sendPeerMessage: (msg: string, uid: string) => void
  /**
   * RTM Client instance
   */
  rtmClient: RtmClient
  /**
   * map with userdata for each rtc uid in the channel
   */
  userDataMap: Object
  /**
   * map with rtm uid for each rtc uid in the channel
   */
  uidMap: Object
  /**
   * Send a mute request
   */
  sendMuteRequest: (device: mutingDevice, rtcId: UID) => void
  /**
   * RTM usernames
   */
  usernames: {}
  /**
   * state to display pop up on remote mute request
   */
  popUpState: popUpStateEnum
  /**
   * set state to hide pop up
   */
  setPopUpState: React.Dispatch<React.SetStateAction<popUpStateEnum>>
}

const RtmContext = createContext(null as unknown as rtmContext)

export default RtmContext