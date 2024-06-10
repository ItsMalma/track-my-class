import PocketBase, { RecordAuthResponse } from "pocketbase";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { User } from "../apis/User";

export const PocketBaseContext = createContext<
  | {
      client: PocketBase;
      user: User | null;
      login: (
        email: string,
        password: string,
        cb: (user: User | null) => void
      ) => void;
      logout: () => void;
    }
  | false
>(false);

export function PocketBaseProvider(props: PropsWithChildren) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [user, setUser] = useState<User | false | null>(null);
  const onAuthChange = useCallback((cb?: (user: User | null) => void) => {
    return (res: RecordAuthResponse<User>) => {
      if (res.record) {
        setUser(res.record);
        cb && cb(res.record);
      } else {
        setUser(null);
        cb && cb(null);
      }
    };
  }, []);

  const [client, setClient] = useState<PocketBase | null>(null);
  useEffect(() => {
    const pb = new PocketBase("http://127.0.0.1:8090");
    pb.autoCancellation(false);
    pb.authStore.save(cookies.token);
    try {
      if (pb.authStore.isValid) {
        setUser(false);
        pb.collection<User>("users").authRefresh().then(onAuthChange());
      }
      setClient(pb);
    } catch (err) {
      console.error(err);
    }
  }, [cookies.token, onAuthChange]);

  const login = useCallback(
    (email: string, password: string, cb: (user: User | null) => void) => {
      if (!client) return;

      client
        .collection<User>("users")
        .authWithPassword(email, password)
        .then(
          onAuthChange((user) => {
            setCookie("token", client.authStore.token);
            cb(user);
          })
        )
        .catch((err) => {
          console.error(err);
          cb(null);
        });
    },
    [client, onAuthChange, setCookie]
  );

  const logout = useCallback(() => {
    if (!client) return;

    client.authStore.clear();
    removeCookie("token");
    setUser(null);
  }, [client, removeCookie]);

  const value = useMemo(() => {
    if (!client) return false;
    if (user === false) return false;
    return { client, user, login, logout };
  }, [client, user, login, logout]);

  return (
    <PocketBaseContext.Provider value={value}>
      {props.children}
    </PocketBaseContext.Provider>
  );
}
