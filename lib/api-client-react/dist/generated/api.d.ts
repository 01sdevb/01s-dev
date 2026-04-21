import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { AuthResponse, CreateScriptBody, FollowResponse, FollowUsersResponse, HealthStatus, LikedScriptsResponse, LikeResponse, LoginBody, MessageResponse, Notification, PlatformStats, RegisterBody, Script, ScriptListResponse, User, UserProfile, VisitorResponse, ListScriptsParams } from "./api.schemas";
import { customFetch } from "../custom-fetch";
import type { ErrorType } from "../custom-fetch";
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getRegisterUrl: () => string;
export declare const register: (body: RegisterBody, options?: RequestInit) => Promise<AuthResponse>;
export declare const getRegisterMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof register>>, TError, {
        data: RegisterBody;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof register>>, TError, {
    data: RegisterBody;
}, TContext>;
export type RegisterMutationResult = NonNullable<Awaited<ReturnType<typeof register>>>;
export type RegisterMutationBody = RegisterBody;
export type RegisterMutationError = ErrorType<unknown>;
export declare const useRegister: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof register>>, TError, {
        data: RegisterBody;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof register>>, TError, {
    data: RegisterBody;
}, TContext>;
export declare const getLoginUrl: () => string;
export declare const login: (body: LoginBody, options?: RequestInit) => Promise<AuthResponse>;
export declare const getLoginMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof login>>, TError, {
        data: LoginBody;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof login>>, TError, {
    data: LoginBody;
}, TContext>;
export type LoginMutationResult = NonNullable<Awaited<ReturnType<typeof login>>>;
export type LoginMutationBody = LoginBody;
export type LoginMutationError = ErrorType<unknown>;
export declare const useLogin: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof login>>, TError, {
        data: LoginBody;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof login>>, TError, {
    data: LoginBody;
}, TContext>;
export declare const getLogoutUrl: () => string;
export declare const logout: (options?: RequestInit) => Promise<MessageResponse>;
export declare const getLogoutMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof logout>>, TError, void, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof logout>>, TError, void, TContext>;
export type LogoutMutationResult = NonNullable<Awaited<ReturnType<typeof logout>>>;
export type LogoutMutationError = ErrorType<unknown>;
export declare const useLogout: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof logout>>, TError, void, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof logout>>, TError, void, TContext>;
export declare const getMeUrl: () => string;
export declare const getMe: (options?: RequestInit) => Promise<User>;
export declare const getGetMeQueryKey: () => readonly ["/api/auth/me"];
export declare const getGetMeQueryOptions: <TData = Awaited<ReturnType<typeof getMe>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetMeQueryResult = NonNullable<Awaited<ReturnType<typeof getMe>>>;
export type GetMeQueryError = ErrorType<unknown>;
export declare function useGetMe<TData = Awaited<ReturnType<typeof getMe>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListScriptsUrl: (params?: ListScriptsParams) => string;
export declare const listScripts: (params?: ListScriptsParams, options?: RequestInit) => Promise<ScriptListResponse>;
export declare const getListScriptsQueryKey: (params?: ListScriptsParams) => readonly ["/api/scripts", ...ListScriptsParams[]];
export declare const getListScriptsQueryOptions: <TData = Awaited<ReturnType<typeof listScripts>>, TError = ErrorType<unknown>>(params?: ListScriptsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listScripts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listScripts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListScriptsQueryResult = NonNullable<Awaited<ReturnType<typeof listScripts>>>;
export type ListScriptsQueryError = ErrorType<unknown>;
export declare function useListScripts<TData = Awaited<ReturnType<typeof listScripts>>, TError = ErrorType<unknown>>(params?: ListScriptsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listScripts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateScriptUrl: () => string;
export declare const createScript: (body: CreateScriptBody, options?: RequestInit) => Promise<Script>;
export declare const getCreateScriptMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createScript>>, TError, {
        data: CreateScriptBody;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createScript>>, TError, {
    data: CreateScriptBody;
}, TContext>;
export type CreateScriptMutationResult = NonNullable<Awaited<ReturnType<typeof createScript>>>;
export type CreateScriptMutationBody = CreateScriptBody;
export type CreateScriptMutationError = ErrorType<unknown>;
export declare const useCreateScript: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createScript>>, TError, {
        data: CreateScriptBody;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createScript>>, TError, {
    data: CreateScriptBody;
}, TContext>;
export declare const getGetTrendingScriptsUrl: () => string;
export declare const getTrendingScripts: (options?: RequestInit) => Promise<Script[]>;
export declare const getGetTrendingScriptsQueryKey: () => readonly ["/api/scripts/trending"];
export declare const getGetTrendingScriptsQueryOptions: <TData = Awaited<ReturnType<typeof getTrendingScripts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getTrendingScripts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getTrendingScripts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetTrendingScriptsQueryResult = NonNullable<Awaited<ReturnType<typeof getTrendingScripts>>>;
export type GetTrendingScriptsQueryError = ErrorType<unknown>;
export declare function useGetTrendingScripts<TData = Awaited<ReturnType<typeof getTrendingScripts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getTrendingScripts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetScriptStatsUrl: () => string;
export declare const getScriptStats: (options?: RequestInit) => Promise<PlatformStats>;
export declare const getGetScriptStatsQueryKey: () => readonly ["/api/scripts/stats"];
export declare const getGetScriptStatsQueryOptions: <TData = Awaited<ReturnType<typeof getScriptStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getScriptStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getScriptStats>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetScriptStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getScriptStats>>>;
export type GetScriptStatsQueryError = ErrorType<unknown>;
export declare function useGetScriptStats<TData = Awaited<ReturnType<typeof getScriptStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getScriptStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetScriptUrl: (id: number) => string;
export declare const getScript: (id: number, options?: RequestInit) => Promise<Script>;
export declare const getGetScriptQueryKey: (id: number) => readonly [`/api/scripts/${number}`];
export declare const getGetScriptQueryOptions: <TData = Awaited<ReturnType<typeof getScript>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getScript>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getScript>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetScriptQueryResult = NonNullable<Awaited<ReturnType<typeof getScript>>>;
export type GetScriptQueryError = ErrorType<unknown>;
export declare function useGetScript<TData = Awaited<ReturnType<typeof getScript>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getScript>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getDeleteScriptUrl: (id: number) => string;
export declare const deleteScript: (id: number, options?: RequestInit) => Promise<MessageResponse>;
export declare const getDeleteScriptMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteScript>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteScript>>, TError, {
    id: number;
}, TContext>;
export type DeleteScriptMutationResult = NonNullable<Awaited<ReturnType<typeof deleteScript>>>;
export type DeleteScriptMutationError = ErrorType<unknown>;
export declare const useDeleteScript: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteScript>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteScript>>, TError, {
    id: number;
}, TContext>;
export declare const getLikeScriptUrl: (id: number) => string;
export declare const likeScript: (id: number, options?: RequestInit) => Promise<LikeResponse>;
export declare const getLikeScriptMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof likeScript>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof likeScript>>, TError, {
    id: number;
}, TContext>;
export type LikeScriptMutationResult = NonNullable<Awaited<ReturnType<typeof likeScript>>>;
export type LikeScriptMutationError = ErrorType<unknown>;
export declare const useLikeScript: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof likeScript>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof likeScript>>, TError, {
    id: number;
}, TContext>;
export declare const getViewScriptUrl: (id: number) => string;
export declare const viewScript: (id: number, options?: RequestInit) => Promise<MessageResponse>;
export declare const getViewScriptMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof viewScript>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof viewScript>>, TError, {
    id: number;
}, TContext>;
export type ViewScriptMutationResult = NonNullable<Awaited<ReturnType<typeof viewScript>>>;
export type ViewScriptMutationError = ErrorType<unknown>;
export declare const useViewScript: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof viewScript>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof viewScript>>, TError, {
    id: number;
}, TContext>;
export declare const getGetUserProfileUrl: (username: string) => string;
export declare const getUserProfile: (username: string, options?: RequestInit) => Promise<UserProfile>;
export declare const getGetUserProfileQueryKey: (username: string) => readonly [`/api/users/${string}`];
export declare const getGetUserProfileQueryOptions: <TData = Awaited<ReturnType<typeof getUserProfile>>, TError = ErrorType<unknown>>(username: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUserProfile>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getUserProfile>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetUserProfileQueryResult = NonNullable<Awaited<ReturnType<typeof getUserProfile>>>;
export type GetUserProfileQueryError = ErrorType<unknown>;
export declare function useGetUserProfile<TData = Awaited<ReturnType<typeof getUserProfile>>, TError = ErrorType<unknown>>(username: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUserProfile>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getTrackVisitUrl: () => string;
export declare const trackVisit: (options?: RequestInit) => Promise<VisitorResponse>;
export declare const getTrackVisitMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof trackVisit>>, TError, void, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof trackVisit>>, TError, void, TContext>;
export declare const useTrackVisit: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof trackVisit>>, TError, void, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof trackVisit>>, TError, void, TContext>;
export declare const getGetNotificationsUrl: () => string;
export declare const getNotifications: (options?: RequestInit) => Promise<Notification[]>;
export declare const getGetNotificationsQueryKey: () => readonly ["/api/notifications"];
export declare const getGetNotificationsQueryOptions: <TData = Awaited<ReturnType<typeof getNotifications>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getNotifications>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getNotifications>>, TError, TData> & {
    queryKey: QueryKey;
};
export declare function useGetNotifications<TData = Awaited<ReturnType<typeof getNotifications>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getNotifications>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getMarkNotificationReadUrl: (id: number) => string;
export declare const markNotificationRead: (id: number, options?: RequestInit) => Promise<MessageResponse>;
export declare const getMarkAllNotificationsReadUrl: () => string;
export declare const markAllNotificationsRead: (options?: RequestInit) => Promise<MessageResponse>;
export declare const getFollowUserUrl: (username: string) => string;
export declare const followUser: (username: string, options?: RequestInit) => Promise<FollowResponse>;
export declare const getFollowUserMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof followUser>>, TError, {
        username: string;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof followUser>>, TError, {
    username: string;
}, TContext>;
export declare const useFollowUser: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof followUser>>, TError, {
        username: string;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof followUser>>, TError, {
    username: string;
}, TContext>;
export declare const unfollowUser: (username: string, options?: RequestInit) => Promise<FollowResponse>;
export declare const getUnfollowUserMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof unfollowUser>>, TError, {
        username: string;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof unfollowUser>>, TError, {
    username: string;
}, TContext>;
export declare const useUnfollowUser: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof unfollowUser>>, TError, {
        username: string;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof unfollowUser>>, TError, {
    username: string;
}, TContext>;
export declare const getGetUserFollowersUrl: (username: string) => string;
export declare const getUserFollowers: (username: string, options?: RequestInit) => Promise<FollowUsersResponse>;
export declare const getGetUserFollowersQueryKey: (username: string) => readonly [`/api/users/${string}/followers`];
export declare function useGetUserFollowers<TData = Awaited<ReturnType<typeof getUserFollowers>>, TError = ErrorType<unknown>>(username: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUserFollowers>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetUserFollowingUrl: (username: string) => string;
export declare const getUserFollowing: (username: string, options?: RequestInit) => Promise<FollowUsersResponse>;
export declare const getGetUserFollowingQueryKey: (username: string) => readonly [`/api/users/${string}/following`];
export declare function useGetUserFollowing<TData = Awaited<ReturnType<typeof getUserFollowing>>, TError = ErrorType<unknown>>(username: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUserFollowing>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetUserLikedScriptsUrl: (username: string) => string;
export declare const getUserLikedScripts: (username: string, options?: RequestInit) => Promise<LikedScriptsResponse>;
export declare const getGetUserLikedScriptsQueryKey: (username: string) => readonly [`/api/users/${string}/likes`];
export declare function useGetUserLikedScripts<TData = Awaited<ReturnType<typeof getUserLikedScripts>>, TError = ErrorType<unknown>>(username: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUserLikedScripts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map