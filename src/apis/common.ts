import { useIsFirstRender } from "@mantine/hooks";
import PocketBase, { RecordFullListOptions, RecordOptions } from "pocketbase";
import { useCallback, useEffect, useState } from "react";
import { ApiErrors, wrapCatch } from "./error";

export function getListCollection<T>(
  pbClient: PocketBase,
  collection: string,
  cb: (res: T[] | ApiErrors) => void,
  options?: RecordFullListOptions
) {
  pbClient
    .collection<T>(collection)
    .getFullList(options)
    .then(cb)
    .catch(wrapCatch(cb));
}

export function useListCollection<T>(
  pbClient: PocketBase,
  collection: string,
  options?: RecordFullListOptions
): T[] {
  const [lists, setLists] = useState<T[]>([]);

  const fetch = useCallback(() => {
    pbClient.collection<T>(collection).getFullList(options).then(setLists);
  }, [collection, options, pbClient]);

  const isFirstRender = useIsFirstRender();
  useEffect(() => {
    if (isFirstRender) fetch();
  }, [fetch, isFirstRender]);

  useEffect(() => {
    pbClient.collection<T>(collection).subscribe("*", fetch);
    return () => {
      pbClient.collection<T>(collection).unsubscribe("*");
    };
  }, [collection, fetch, pbClient]);

  return lists;
}

export function useSingleCollection<T>(
  pbClient: PocketBase,
  collection: string,
  id: string,
  options?: RecordOptions
): T | false | null {
  const [item, setItem] = useState<T | false | null>(false);

  const fetch = useCallback(() => {
    pbClient.collection<T>(collection).getOne(id, options).then(setItem);
  }, [collection, id, options, pbClient]);

  const isFirstRender = useIsFirstRender();
  useEffect(() => {
    if (isFirstRender) fetch();
  }, [fetch, isFirstRender]);

  useEffect(() => {
    pbClient.collection<T>(collection).subscribe(id, fetch);
    return () => {
      pbClient.collection<T>(collection).unsubscribe(id);
    };
  }, [collection, fetch, id, pbClient]);

  return item;
}

export function deleteCollectionItem(
  pbClient: PocketBase,
  collection: string,
  id: string,
  cb: (error: ApiErrors | null) => void
) {
  pbClient
    .collection(collection)
    .delete(id)
    .then(() => cb(null))
    .catch(cb);
}
