import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface WaitlistEntry {
    email: string;
    companyName: string;
}
export interface backendInterface {
    getAllEntries(): Promise<Array<WaitlistEntry>>;
    getWaitlistCount(): Promise<bigint>;
    joinWaitlist(email: string, companyName: string): Promise<void>;
}
