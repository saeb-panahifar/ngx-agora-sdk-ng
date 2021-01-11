import { Observable } from "rxjs";
import { ConnectionState, IRemoteUser, NetworkQuality, UserState } from "../types";
import { IJoinChannel, IAudioTrack, IMediaTrack, IVideoTrack } from "./interfaces";

export interface INgxAgoraSdkNgService {

    join(channelName: string, token: string, uid?: string): IJoinChannel<IMediaTrack>;
    joinVideo(channelName: string, token: string, uid?: string): IJoinChannel<IVideoTrack>;
    joinAudio(channelName: string, token: string, uid?: string): IJoinChannel<IAudioTrack>;

    leave(): Promise<any>;

    getCameras(): Promise<MediaDeviceInfo[]>;
    getMicrophones(): Promise<MediaDeviceInfo[]>;
    getDevices(): Promise<MediaDeviceInfo[]>;

    onRemoteUsersStatusChange(): Observable<UserState>;
    onRemoteUserJoined(): Observable<IRemoteUser>;
    onRemoteUserLeft(): Observable<{ user: IRemoteUser, reason: string }>;
    onRemoteVolumeIndicator(): Observable<Array<{ level: number, uid: number | string }>>;

    onLocalNetworkQualityChange(): Observable<NetworkQuality>;
    onLocalUserJoined(): Observable<IRemoteUser>;
    onLocalUserLeft(): Observable<{ user: IRemoteUser, reason: string }>;
}
